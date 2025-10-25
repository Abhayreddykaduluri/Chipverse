// Category page functionality
class CategoryPageApp {
    constructor() {
        this.api = apiService;
        this.currentCategory = this.getCategoryFromURL();
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.filters = {
            vendor: '',
            architecture: '',
            status: '',
            minCores: '',
            minClock: '',
            search: ''
        };
        this.sortBy = 'name';
        this.products = [];
        this.filteredProducts = [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTheme();
        this.loadProducts();
        this.updateCompareUI();
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Filter events
        document.getElementById('vendorFilter')?.addEventListener('change', (e) => {
            this.filters.vendor = e.target.value;
            this.applyFilters();
        });

        document.getElementById('architectureFilter')?.addEventListener('change', (e) => {
            this.filters.architecture = e.target.value;
            this.applyFilters();
        });

        document.getElementById('statusFilter')?.addEventListener('change', (e) => {
            this.filters.status = e.target.value;
            this.applyFilters();
        });

        document.getElementById('coresFilter')?.addEventListener('change', (e) => {
            this.filters.minCores = e.target.value;
            this.applyFilters();
        });

        document.getElementById('clockFilter')?.addEventListener('change', (e) => {
            this.filters.minClock = e.target.value;
            this.applyFilters();
        });

        document.getElementById('searchFilter')?.addEventListener('input', (e) => {
            this.filters.search = e.target.value;
            this.applyFilters();
        });

        // Sort events
        document.getElementById('sortSelect')?.addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.applyFilters();
        });

        // Clear filters
        document.getElementById('clearFilters')?.addEventListener('click', () => {
            this.clearFilters();
        });

        document.getElementById('resetFilters')?.addEventListener('click', () => {
            this.clearFilters();
        });

        // Scroll to top
        document.getElementById('scrollToTop')?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Scroll effects
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    getCategoryFromURL() {
        const path = window.location.pathname;
        if (path.includes('desktop-processors')) return 'Desktop CPU';
        if (path.includes('laptop-processors')) return 'Laptop CPU';
        if (path.includes('mobile-processors')) return 'Mobile CPU';
        if (path.includes('microcontrollers')) return 'Microcontroller';
        if (path.includes('dev-boards')) return 'Dev Board';
        if (path.includes('iot-devices')) return 'IoT Device';
        return 'Desktop CPU';
    }

    async loadProducts() {
        const loadingState = document.getElementById('loadingState');
        const productsGrid = document.getElementById('productsGrid');
        
        if (loadingState) loadingState.classList.remove('hidden');
        if (productsGrid) productsGrid.classList.add('hidden');

        try {
            // Get all products for this category
            const response = await this.api.getProducts({ category: this.currentCategory }, 1, 1000);
            this.products = response.products;
            this.filteredProducts = [...this.products];
            
            this.updateCategoryStats();
            this.applyFilters();
        } catch (error) {
            console.error('Error loading products:', error);
            this.showError('Failed to load products. Please try again.');
        } finally {
            if (loadingState) loadingState.classList.add('hidden');
            if (productsGrid) productsGrid.classList.remove('hidden');
        }
    }

    applyFilters() {
        let filtered = [...this.products];

        // Apply filters
        if (this.filters.vendor) {
            filtered = filtered.filter(p => p.vendor === this.filters.vendor);
        }

        if (this.filters.architecture) {
            filtered = filtered.filter(p => p.architecture === this.filters.architecture);
        }

        if (this.filters.status) {
            filtered = filtered.filter(p => p.status === this.filters.status);
        }

        if (this.filters.minCores) {
            filtered = filtered.filter(p => p.cores >= parseInt(this.filters.minCores));
        }

        if (this.filters.minClock) {
            filtered = filtered.filter(p => p.clock >= parseFloat(this.filters.minClock));
        }

        if (this.filters.search) {
            const searchTerm = this.filters.search.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchTerm) ||
                p.vendor.toLowerCase().includes(searchTerm) ||
                p.architecture.toLowerCase().includes(searchTerm) ||
                (p.description && p.description.toLowerCase().includes(searchTerm))
            );
        }

        // Apply sorting
        filtered = this.sortProducts(filtered);

        this.filteredProducts = filtered;
        this.currentPage = 1;
        this.renderProducts();
        this.updateProductsCount();
    }

    sortProducts(products) {
        const sorted = [...products];
        
        switch (this.sortBy) {
            case 'name':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'name_desc':
                return sorted.sort((a, b) => b.name.localeCompare(a.name));
            case 'cores':
                return sorted.sort((a, b) => a.cores - b.cores);
            case 'cores_desc':
                return sorted.sort((a, b) => b.cores - a.cores);
            case 'clock':
                return sorted.sort((a, b) => a.clock - b.clock);
            case 'clock_desc':
                return sorted.sort((a, b) => b.clock - a.clock);
            case 'price':
                return sorted.sort((a, b) => (a.price_MSRP || 0) - (b.price_MSRP || 0));
            case 'price_desc':
                return sorted.sort((a, b) => (b.price_MSRP || 0) - (a.price_MSRP || 0));
            case 'release':
                return sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            case 'release_old':
                return sorted.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
            default:
                return sorted;
        }
    }

    renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        const noProducts = document.getElementById('noProducts');
        const pagination = document.getElementById('pagination');

        if (!productsGrid) return;

        // Show/hide no products state
        if (this.filteredProducts.length === 0) {
            productsGrid.classList.add('hidden');
            if (noProducts) noProducts.classList.remove('hidden');
            if (pagination) pagination.innerHTML = '';
            return;
        }

        if (noProducts) noProducts.classList.add('hidden');
        productsGrid.classList.remove('hidden');

        // Calculate pagination
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
        const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);

        // Render products
        productsGrid.innerHTML = paginatedProducts.map(product => {
            const isInCompare = this.isInCompareList(product.id);
            
            return `
                <div class="product-card fade-in">
                    <div class="product-image">
                        <img src="${product.images[0]}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400'">
                        <div class="product-badge">${product.status}</div>
                    </div>
                    <div class="product-content">
                        <div class="product-vendor">${product.vendor}</div>
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-specs">
                            <div class="spec-item">
                                <i class="fas fa-microchip"></i>
                                <span>${product.cores} cores</span>
                            </div>
                            <div class="spec-item">
                                <i class="fas fa-tachometer-alt"></i>
                                <span>${product.clock} GHz</span>
                            </div>
                            <div class="spec-item">
                                <i class="fas fa-bolt"></i>
                                <span>${product.TDP}W TDP</span>
                            </div>
                        </div>
                        <div class="product-price">${product.price_MSRP ? `$${product.price_MSRP}` : 'Price N/A'}</div>
                        <div class="product-actions">
                            <button class="btn btn-sm ${isInCompare ? 'btn-primary' : 'btn-outline'}" 
                                    onclick="categoryPageApp.toggleCompare(${product.id})">
                                <i class="fas ${isInCompare ? 'fa-check' : 'fa-plus'}"></i>
                                ${isInCompare ? 'Added' : 'Compare'}
                            </button>
                            <a href="product-detail.html?id=${product.id}" class="btn btn-sm btn-secondary">
                                <i class="fas fa-info-circle"></i>
                                Details
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Render pagination
        this.renderPagination(totalPages);
    }

    renderPagination(totalPages) {
        const pagination = document.getElementById('pagination');
        if (!pagination || totalPages <= 1) {
            if (pagination) pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';

        // Previous button
        paginationHTML += `
            <button class="pagination-btn" ${this.currentPage === 1 ? 'disabled' : ''} 
                    onclick="categoryPageApp.goToPage(${this.currentPage - 1})">
                <i class="fas fa-chevron-left"></i>
            </button>
        `;

        // Page numbers
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" 
                        onclick="categoryPageApp.goToPage(${i})">
                    ${i}
                </button>
            `;
        }

        // Next button
        paginationHTML += `
            <button class="pagination-btn" ${this.currentPage === totalPages ? 'disabled' : ''} 
                    onclick="categoryPageApp.goToPage(${this.currentPage + 1})">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;

        // Page info
        paginationHTML += `
            <div class="pagination-info">
                Page ${this.currentPage} of ${totalPages}
            </div>
        `;

        pagination.innerHTML = paginationHTML;
    }

    goToPage(page) {
        if (page < 1 || page > Math.ceil(this.filteredProducts.length / this.itemsPerPage)) return;
        
        this.currentPage = page;
        this.renderProducts();
        
        // Scroll to top of products
        const productsSection = document.querySelector('.products-section');
        if (productsSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = productsSection.offsetTop - headerHeight - 20;
            window.scrollTo({ top: elementPosition, behavior: 'smooth' });
        }
    }

    updateProductsCount() {
        const productsCount = document.getElementById('productsCount');
        if (productsCount) {
            const total = this.filteredProducts.length;
            const showing = Math.min(this.itemsPerPage, total);
            productsCount.textContent = `Showing ${showing} of ${total} products`;
        }
    }

    updateCategoryStats() {
        const total = this.products.length;
        const recent = this.products.filter(p => {
            const releaseDate = new Date(p.release_date);
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
            return releaseDate > sixMonthsAgo;
        }).length;

        document.getElementById('categoryTotal').textContent = total;
        document.getElementById('categoryRecent').textContent = recent;
    }

    clearFilters() {
        // Reset filter values
        this.filters = {
            vendor: '',
            architecture: '',
            status: '',
            minCores: '',
            minClock: '',
            search: ''
        };

        // Reset form elements
        document.getElementById('vendorFilter').value = '';
        document.getElementById('architectureFilter').value = '';
        document.getElementById('statusFilter').value = '';
        document.getElementById('coresFilter').value = '';
        document.getElementById('clockFilter').value = '';
        document.getElementById('searchFilter').value = '';
        document.getElementById('sortSelect').value = 'name';

        this.sortBy = 'name';
        this.applyFilters();
    }

    toggleCompare(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const compareList = JSON.parse(localStorage.getItem('techcompare_compare')) || [];
        const index = compareList.findIndex(p => p.id === productId);
        
        if (index > -1) {
            // Remove from compare
            compareList.splice(index, 1);
            this.showNotification('Product removed from comparison', 'info');
        } else {
            // Add to compare (max 4)
            if (compareList.length < 4) {
                compareList.push(product);
                this.showNotification('Product added to comparison', 'success');
            } else {
                this.showNotification('You can compare up to 4 products at a time', 'warning');
                return;
            }
        }
        
        localStorage.setItem('techcompare_compare', JSON.stringify(compareList));
        this.updateCompareUI();
        this.renderProducts();
    }

    isInCompareList(productId) {
        const compareList = JSON.parse(localStorage.getItem('techcompare_compare')) || [];
        return compareList.some(item => item.id === productId);
    }

    updateCompareUI() {
        const compareList = JSON.parse(localStorage.getItem('techcompare_compare')) || [];
        const compareCount = document.getElementById('compareCount');
        if (compareCount) {
            compareCount.textContent = compareList.length;
        }
    }

    toggleTheme() {
        const currentTheme = localStorage.getItem('techcompare_theme') || 'light-mode';
        let newTheme = currentTheme === 'light-mode' ? 'dark-mode' : 'light-mode';
        
        document.body.classList.remove(currentTheme);
        document.body.classList.add(newTheme);
        
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.innerHTML = newTheme === 'dark-mode' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
        
        localStorage.setItem('techcompare_theme', newTheme);
    }

    loadTheme() {
        const currentTheme = localStorage.getItem('techcompare_theme') || 'light-mode';
        document.body.classList.add(currentTheme);
        
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.innerHTML = currentTheme === 'dark-mode' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollToTop = document.getElementById('scrollToTop');
        
        if (scrollToTop) {
            if (scrollTop > 300) {
                scrollToTop.classList.add('visible');
            } else {
                scrollToTop.classList.remove('visible');
            }
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 2rem;
                    background: var(--bg-primary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius);
                    padding: 1rem 1.5rem;
                    box-shadow: var(--shadow-xl);
                    z-index: 2001;
                    max-width: 400px;
                    animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border-left: 4px solid var(--primary);
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .notification-success {
                    border-left-color: var(--secondary);
                }
                .notification-error {
                    border-left-color: #ef4444;
                }
                .notification-warning {
                    border-left-color: var(--accent);
                }
                .notification-info {
                    border-left-color: var(--primary);
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    flex: 1;
                }
                .notification-content i {
                    font-size: 1.25rem;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--text-tertiary);
                    cursor: pointer;
                    padding: 0.25rem;
                    border-radius: var(--radius);
                    transition: var(--transition);
                }
                .notification-close:hover {
                    color: var(--text-primary);
                    background: var(--bg-tertiary);
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) reverse';
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    showError(message) {
        this.showNotification(message, 'error');
    }
}

// Initialize category page app
let categoryPageApp;
document.addEventListener('DOMContentLoaded', () => {
    categoryPageApp = new CategoryPageApp();
});