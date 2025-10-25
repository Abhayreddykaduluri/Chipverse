// Main application logic
class TechCompareApp {
    constructor() {
        this.api = apiService;
        this.compareList = JSON.parse(localStorage.getItem('techcompare_compare')) || [];
        this.currentTheme = localStorage.getItem('techcompare_theme') || 'light-mode';
        this.isLoading = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTheme();
        this.setupScrollEffects();
        this.loadAllProducts();
        this.updateCompareUI();
    }

    setupEventListeners() {
        // Compare events
        document.getElementById('clearCompare')?.addEventListener('click', () => {
            this.clearCompareList();
        });

        // Theme toggle
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Modal events
        document.getElementById('openContributeModal')?.addEventListener('click', () => {
            this.openModal('contributeModal');
        });

        document.getElementById('closeContributeModal')?.addEventListener('click', () => {
            this.closeModal('contributeModal');
        });

        document.getElementById('openImportModal')?.addEventListener('click', () => {
            this.openModal('importModal');
        });

        document.getElementById('closeImportModal')?.addEventListener('click', () => {
            this.closeModal('importModal');
        });

        // Form events
        document.getElementById('productForm')?.addEventListener('submit', (e) => {
            this.handleProductSubmit(e);
        });

        // Image upload
        document.getElementById('imageUpload')?.addEventListener('click', () => {
            document.getElementById('productImage').click();
        });

        document.getElementById('productImage')?.addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });

        // Import data
        document.getElementById('importData')?.addEventListener('click', () => {
            this.handleImportData();
        });

        // Close modals when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Navigation smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href !== '#' && !link.classList.contains('no-scroll')) {
                    e.preventDefault();
                    this.scrollToSection(href);
                }
            });
        });

        // Scroll to top
        document.getElementById('scrollToTop')?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    setupScrollEffects() {
        // Scroll to top button visibility
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollToTop = document.getElementById('scrollToTop');
            
            if (scrollToTop) {
                if (scrollTop > 300) {
                    scrollToTop.classList.add('visible');
                } else {
                    scrollToTop.classList.remove('visible');
                }
            }

            // Update active navigation
            this.updateActiveNavigation();
        });
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let currentSection = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }

    scrollToSection(sectionId) {
        const element = document.querySelector(sectionId);
        if (element) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = element.offsetTop - headerHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }

    async loadAllProducts() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoadingState();

        try {
            const allProducts = await this.api.getProducts({}, 1, 1000);
            this.renderProductsByCategory(allProducts.products);
            this.renderFeaturedProducts(allProducts.products);
            this.updateCategoryStats(allProducts.products);
            this.updateQuickAccessStats(allProducts.products);
        } catch (error) {
            console.error('Error loading products:', error);
            this.showError('Failed to load products. Please try again.');
        } finally {
            this.isLoading = false;
            this.hideLoadingState();
        }
    }

    showLoadingState() {
        const containers = [
            'desktopProducts', 'laptopProducts', 'mobileProducts',
            'microcontrollerProducts', 'devBoardProducts', 'iotProducts',
            'featuredProducts'
        ];
        
        containers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = `
                    <div class="loading-state" style="grid-column: 1 / -1;">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Loading products...</p>
                    </div>
                `;
            }
        });
    }

    hideLoadingState() {
        // Loading states are replaced when products render
    }

    renderProductsByCategory(products) {
        const categories = {
            'Desktop CPU': 'desktopProducts',
            'Laptop CPU': 'laptopProducts',
            'Mobile CPU': 'mobileProducts',
            'Microcontroller': 'microcontrollerProducts',
            'Dev Board': 'devBoardProducts',
            'IoT Device': 'iotProducts'
        };

        Object.entries(categories).forEach(([category, elementId]) => {
            const categoryProducts = products.filter(p => p.category === category).slice(0, 6);
            const container = document.getElementById(elementId);
            
            if (container) {
                if (categoryProducts.length === 0) {
                    container.innerHTML = `
                        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                            <i class="fas fa-microchip" style="font-size: 3rem; color: var(--text-tertiary); margin-bottom: 1rem;"></i>
                            <h3>No ${category.toLowerCase()} found</h3>
                            <p>Check back later or contribute new products</p>
                        </div>
                    `;
                } else {
                    container.innerHTML = categoryProducts.map(product => {
                        const isInCompare = this.compareList.some(item => item.id === product.id);
                        
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
                                                onclick="app.toggleCompare(${product.id})">
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
                }
            }
        });
    }

    renderFeaturedProducts(products) {
        const featuredContainer = document.getElementById('featuredProducts');
        if (!featuredContainer) return;

        // Get 6 random featured products
        const featured = [...products]
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);

        if (featured.length === 0) {
            featuredContainer.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <i class="fas fa-microchip" style="font-size: 3rem; color: var(--text-tertiary); margin-bottom: 1rem;"></i>
                    <h3>No featured products</h3>
                    <p>Check back later for featured products</p>
                </div>
            `;
            return;
        }

        featuredContainer.innerHTML = featured.map(product => {
            const isInCompare = this.compareList.some(item => item.id === product.id);
            
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
                                    onclick="app.toggleCompare(${product.id})">
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
    }

    updateCategoryStats(products) {
        const totalProducts = products.length;
        const recentProducts = products.filter(p => {
            const releaseDate = new Date(p.release_date);
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
            return releaseDate > sixMonthsAgo;
        }).length;

        document.getElementById('totalProducts').textContent = totalProducts;
        document.getElementById('recentProducts').textContent = recentProducts;
        document.getElementById('compareStats').textContent = this.compareList.length;
    }

    updateQuickAccessStats(products) {
        const categories = {
            'Desktop CPU': 'quickDesktop',
            'Laptop CPU': 'quickLaptop',
            'Mobile CPU': 'quickMobile',
            'Microcontroller': 'quickMicrocontroller',
            'Dev Board': 'quickDevBoard',
            'IoT Device': 'quickIoT'
        };

        Object.entries(categories).forEach(([category, elementId]) => {
            const count = products.filter(p => p.category === category).length;
            const element = document.getElementById(elementId);
            if (element) {
                element.textContent = count;
            }
        });
    }

    toggleCompare(productId) {
        const product = this.api.products.find(p => p.id === productId);
        if (!product) return;

        const index = this.compareList.findIndex(p => p.id === productId);
        
        if (index > -1) {
            // Remove from compare
            this.compareList.splice(index, 1);
            this.showNotification('Product removed from comparison', 'info');
        } else {
            // Add to compare (max 4)
            if (this.compareList.length < 4) {
                this.compareList.push(product);
                this.showNotification('Product added to comparison', 'success');
            } else {
                this.showNotification('You can compare up to 4 products at a time', 'warning');
                return;
            }
        }
        
        this.saveCompareList();
        this.updateCompareUI();
        this.loadAllProducts();
    }

    clearCompareList() {
        if (this.compareList.length === 0) return;
        
        this.compareList = [];
        this.saveCompareList();
        this.updateCompareUI();
        this.loadAllProducts();
        this.showNotification('Comparison cleared', 'info');
    }

    updateCompareUI() {
        const compareCount = document.getElementById('compareCount');
        const compareText = document.getElementById('compareText');
        const compareGrid = document.getElementById('compareGrid');

        if (compareCount) {
            compareCount.textContent = this.compareList.length;
        }

        if (compareText) {
            compareText.textContent = `${this.compareList.length}/4 selected`;
        }

        if (compareGrid) {
            if (this.compareList.length === 0) {
                compareGrid.innerHTML = `
                    <div class="empty-compare">
                        <div class="empty-icon">
                            <i class="fas fa-balance-scale"></i>
                        </div>
                        <h4>No Processors Selected</h4>
                        <p>Add processors from any category to start comparing</p>
                        <a href="#categories" class="btn btn-outline">
                            <i class="fas fa-plus"></i>
                            Add Processors
                        </a>
                    </div>
                `;
                return;
            }

            compareGrid.innerHTML = this.compareList.map(product => `
                <div class="compare-item slide-in">
                    <div class="compare-item-header">
                        <div class="compare-item-image">
                            <img src="${product.images[0]}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400'">
                        </div>
                        <div>
                            <div class="compare-item-name">${product.name}</div>
                            <div style="color: var(--text-tertiary); font-size: 0.875rem;">${product.vendor}</div>
                        </div>
                        <button class="btn btn-sm btn-outline" onclick="app.toggleCompare(${product.id})" style="margin-left: auto;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="compare-specs">
                        <div class="compare-spec">
                            <span class="compare-spec-name">Cores</span>
                            <span class="compare-spec-value">${product.cores}</span>
                        </div>
                        <div class="compare-spec">
                            <span class="compare-spec-name">Clock</span>
                            <span class="compare-spec-value">${product.clock} GHz</span>
                        </div>
                        <div class="compare-spec">
                            <span class="compare-spec-name">TDP</span>
                            <span class="compare-spec-value">${product.TDP}W</span>
                        </div>
                        <div class="compare-spec">
                            <span class="compare-spec-name">Process</span>
                            <span class="compare-spec-value">${product.process_node_nm} nm</span>
                        </div>
                        <div class="compare-spec">
                            <span class="compare-spec-name">Price</span>
                            <span class="compare-spec-value">${product.price_MSRP ? `$${product.price_MSRP}` : 'N/A'}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    saveCompareList() {
        localStorage.setItem('techcompare_compare', JSON.stringify(this.compareList));
    }

    toggleTheme() {
        if (this.currentTheme === 'light-mode') {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
            this.currentTheme = 'dark-mode';
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            document.getElementById('themeToggle').innerHTML = '<i class="fas fa-moon"></i>';
            this.currentTheme = 'light-mode';
        }
        
        localStorage.setItem('techcompare_theme', this.currentTheme);
    }

    loadTheme() {
        document.body.classList.add(this.currentTheme);
        
        if (this.currentTheme === 'dark-mode') {
            document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.getElementById('themeToggle').innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    openModal(modalId) {
        document.getElementById(modalId)?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal(modalId) {
        document.getElementById(modalId)?.classList.remove('active');
        document.body.style.overflow = '';
    }

    async handleProductSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const productData = {
            name: document.getElementById('productName').value,
            vendor: document.getElementById('productVendor').value,
            category: document.getElementById('productCategory').value,
            release_date: document.getElementById('productReleaseDate').value,
            architecture: document.getElementById('productArchitecture').value,
            cores: parseInt(document.getElementById('productCores').value) || 0,
            clock: parseFloat(document.getElementById('productClock').value) || 0,
            TDP: parseInt(document.getElementById('productTDP').value) || 0,
            process_node_nm: parseInt(document.getElementById('productProcess').value) || 0,
            price_MSRP: parseInt(document.getElementById('productPrice').value) || 0,
            status: document.getElementById('productStatus').value,
            sources: document.getElementById('productSource').value ? [document.getElementById('productSource').value] : [],
            images: ['https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400'],
            specs: {},
            description: ''
        };

        try {
            await this.api.addProduct(productData);
            this.showNotification('Product added successfully!', 'success');
            this.closeModal('contributeModal');
            e.target.reset();
            document.getElementById('imagePreview')?.classList.remove('show');
            
            // Reload products to show the new one
            this.loadAllProducts();
        } catch (error) {
            console.error('Error adding product:', error);
            this.showNotification('Failed to add product. Please try again.', 'error');
        }
    }

    handleImageUpload(e) {
        const file = e.target.files[0];
        const imagePreview = document.getElementById('imagePreview');
        
        if (file && imagePreview) {
            if (file.size > 5 * 1024 * 1024) {
                this.showNotification('File size must be less than 5MB', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(event) {
                imagePreview.src = event.target.result;
                imagePreview.classList.add('show');
            };
            reader.readAsDataURL(file);
        }
    }

    handleImportData() {
        this.showNotification('Import functionality would be implemented in a full application', 'info');
        this.closeModal('importModal');
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(notification => {
            notification.remove();
        });

        // Create notification element
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

        // Add styles if not already added
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

        // Auto remove after 5 seconds
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

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TechCompareApp();
});