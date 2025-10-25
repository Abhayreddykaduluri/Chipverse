// Product detail page logic
class ProductDetailApp {
    constructor() {
        this.api = apiService;
        this.productId = this.getProductIdFromURL();
        this.compareList = JSON.parse(localStorage.getItem('techcompare_compare')) || [];
        this.currentTheme = localStorage.getItem('techcompare_theme') || 'light-mode';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTheme();
        this.loadProductDetails();
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Add to compare
        document.getElementById('addToCompare')?.addEventListener('click', () => {
            this.addToCompare();
        });

        // View source
        document.getElementById('viewSource')?.addEventListener('click', () => {
            this.viewSource();
        });
    }

    getProductIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    async loadProductDetails() {
        const loadingState = document.getElementById('loadingState');
        const productDetail = document.getElementById('productDetail');
        const errorState = document.getElementById('errorState');

        if (!this.productId) {
            this.showError();
            return;
        }

        try {
            const product = await this.api.getProduct(this.productId);
            if (product) {
                this.renderProductDetails(product);
                await this.loadRelatedProducts(product);
                
                if (loadingState) loadingState.classList.add('hidden');
                if (productDetail) productDetail.classList.remove('hidden');
            } else {
                this.showError();
            }
        } catch (error) {
            console.error('Error loading product details:', error);
            this.showError();
        }
    }

    renderProductDetails(product) {
        // Update breadcrumb
        document.getElementById('productCategoryBreadcrumb').textContent = product.category;

        // Update product header
        document.getElementById('detailProductImage').src = product.images[0];
        document.getElementById('detailProductImage').alt = product.name;
        document.getElementById('detailProductBadge').textContent = product.status;
        document.getElementById('detailVendor').textContent = product.vendor;
        document.getElementById('detailProductName').textContent = product.name;
        document.getElementById('detailPrice').textContent = product.price_MSRP ? `$${product.price_MSRP}` : 'Price N/A';
        document.getElementById('detailReleaseDate').textContent = new Date(product.release_date).toLocaleDateString();
        document.getElementById('detailArchitecture').textContent = product.architecture;
        document.getElementById('detailStatus').textContent = product.status;

        // Update specifications
        document.getElementById('specCores').textContent = product.cores + (product.threads ? ` (${product.threads} threads)` : '');
        document.getElementById('specClock').textContent = `${product.clock} GHz${product.boost_clock ? ` (up to ${product.boost_clock} GHz)` : ''}`;
        document.getElementById('specTDP').textContent = `${product.TDP}W`;
        document.getElementById('specProcess').textContent = `${product.process_node_nm} nm`;
        document.getElementById('specMemory').textContent = product.memory_support || 'N/A';
        document.getElementById('specGPU').textContent = product.GPU || 'N/A';
        document.getElementById('specNPU').textContent = product.NPU || 'N/A';
        document.getElementById('specCache').textContent = product.specs?.cache || 'N/A';

        // Update benchmarks if available
        const benchmarksSection = document.getElementById('benchmarksSection');
        if (product.benchmarks && Object.keys(product.benchmarks).length > 0) {
            benchmarksSection.classList.remove('hidden');
            this.renderBenchmarks(product.benchmarks);
        } else {
            benchmarksSection.classList.add('hidden');
        }

        // Update add to compare button state
        const isInCompare = this.compareList.some(item => item.id === product.id);
        const addToCompareBtn = document.getElementById('addToCompare');
        if (addToCompareBtn) {
            if (isInCompare) {
                addToCompareBtn.innerHTML = '<i class="fas fa-check"></i> Added to Compare';
                addToCompareBtn.disabled = true;
            } else if (this.compareList.length >= 4) {
                addToCompareBtn.innerHTML = '<i class="fas fa-ban"></i> Compare Full';
                addToCompareBtn.disabled = true;
            }
        }

        // Update compare count
        document.getElementById('compareCount').textContent = this.compareList.length;

        // Generate JSON-LD schema
        this.generateJsonLdSchema(product);
    }

    renderBenchmarks(benchmarks) {
        // Normalize benchmark scores for visualization (0-100 scale)
        const maxSingleCore = 2500;
        const maxMultiCore = 50000;

        if (benchmarks.single_core) {
            const singleCorePercent = (benchmarks.single_core / maxSingleCore) * 100;
            document.getElementById('benchmarkSingleCore').style.width = `${Math.min(singleCorePercent, 100)}%`;
            document.getElementById('benchmarkSingleCoreValue').textContent = benchmarks.single_core;
        }

        if (benchmarks.multi_core) {
            const multiCorePercent = (benchmarks.multi_core / maxMultiCore) * 100;
            document.getElementById('benchmarkMultiCore').style.width = `${Math.min(multiCorePercent, 100)}%`;
            document.getElementById('benchmarkMultiCoreValue').textContent = benchmarks.multi_core;
        }
    }

    async loadRelatedProducts(product) {
        const relatedProductsGrid = document.getElementById('relatedProductsGrid');
        if (!relatedProductsGrid) return;

        try {
            const relatedProducts = await this.api.getRelatedProducts(product, 4);
            
            if (relatedProducts.length > 0) {
                relatedProductsGrid.innerHTML = relatedProducts.map(relatedProduct => {
                    const isInCompare = this.compareList.some(item => item.id === relatedProduct.id);
                    
                    return `
                        <div class="product-card">
                            <div class="product-image">
                                <img src="${relatedProduct.images[0]}" alt="${relatedProduct.name}" onerror="this.src='https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400'">
                                <div class="product-badge">${relatedProduct.status}</div>
                            </div>
                            <div class="product-content">
                                <div class="product-vendor">${relatedProduct.vendor}</div>
                                <h3 class="product-name">${relatedProduct.name}</h3>
                                <div class="product-specs">
                                    <div class="spec-item">
                                        <i class="fas fa-microchip"></i>
                                        <span>${relatedProduct.cores} cores</span>
                                    </div>
                                    <div class="spec-item">
                                        <i class="fas fa-tachometer-alt"></i>
                                        <span>${relatedProduct.clock} GHz</span>
                                    </div>
                                </div>
                                <div class="product-price">${relatedProduct.price_MSRP ? `$${relatedProduct.price_MSRP}` : 'Price N/A'}</div>
                                <div class="product-actions">
                                    <button class="btn btn-sm ${isInCompare ? 'btn-primary' : 'btn-outline'}" 
                                            onclick="productDetailApp.toggleCompare(${relatedProduct.id})">
                                        <i class="fas ${isInCompare ? 'fa-check' : 'fa-plus'}"></i>
                                        ${isInCompare ? 'Added' : 'Compare'}
                                    </button>
                                    <a href="product-detail.html?id=${relatedProduct.id}" class="btn btn-sm btn-secondary">
                                        <i class="fas fa-info-circle"></i>
                                        Details
                                    </a>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');
            } else {
                relatedProductsGrid.innerHTML = `
                    <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                        <p>No related products found</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error loading related products:', error);
            relatedProductsGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                    <p>Error loading related products</p>
                </div>
            `;
        }
    }

    addToCompare() {
        if (!this.productId) return;

        const product = this.api.products.find(p => p.id === parseInt(this.productId));
        if (!product) return;

        if (this.compareList.length >= 4) {
            this.showNotification('You can compare up to 4 products at a time.', 'warning');
            return;
        }

        if (this.compareList.some(item => item.id === product.id)) {
            this.showNotification('Product is already in comparison.', 'info');
            return;
        }

        this.compareList.push(product);
        this.saveCompareList();
        this.updateCompareUI();
        this.renderProductDetails(product); // Re-render to update button state

        this.showNotification('Product added to comparison!', 'success');
    }

    toggleCompare(productId) {
        const product = this.api.products.find(p => p.id === productId);
        if (!product) return;

        const index = this.compareList.findIndex(p => p.id === productId);
        
        if (index > -1) {
            this.compareList.splice(index, 1);
        } else {
            if (this.compareList.length < 4) {
                this.compareList.push(product);
            } else {
                this.showNotification('You can compare up to 4 products at a time.', 'warning');
                return;
            }
        }
        
        this.saveCompareList();
        this.updateCompareUI();
        this.loadProductDetails(); // Reload to update UI
    }

    updateCompareUI() {
        const compareCount = document.getElementById('compareCount');
        if (compareCount) {
            compareCount.textContent = this.compareList.length;
        }
    }

    saveCompareList() {
        localStorage.setItem('techcompare_compare', JSON.stringify(this.compareList));
    }

    viewSource() {
        const product = this.api.products.find(p => p.id === parseInt(this.productId));
        if (product && product.sources && product.sources.length > 0) {
            window.open(product.sources[0], '_blank');
        } else {
            this.showNotification('No source URL available for this product.', 'info');
        }
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

    showError() {
        const loadingState = document.getElementById('loadingState');
        const errorState = document.getElementById('errorState');

        if (loadingState) loadingState.classList.add('hidden');
        if (errorState) errorState.classList.remove('hidden');
    }

    generateJsonLdSchema(product) {
        const schema = {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "description": product.description || `${product.vendor} ${product.name} ${product.category}`,
            "brand": {
                "@type": "Brand",
                "name": product.vendor
            },
            "releaseDate": product.release_date,
            "category": product.category
        };

        if (product.price_MSRP) {
            schema.offers = {
                "@type": "Offer",
                "price": product.price_MSRP,
                "priceCurrency": "USD",
                "availability": product.status === "Released" ? "https://schema.org/InStock" : "https://schema.org/PreOrder"
            };
        }

        // Add additional properties
        const additionalProperties = [];
        
        if (product.architecture) {
            additionalProperties.push({
                "@type": "PropertyValue",
                "name": "Architecture",
                "value": product.architecture
            });
        }

        if (product.cores) {
            additionalProperties.push({
                "@type": "PropertyValue",
                "name": "Cores",
                "value": product.cores.toString()
            });
        }

        if (product.clock) {
            additionalProperties.push({
                "@type": "PropertyValue",
                "name": "Clock Speed",
                "value": `${product.clock} GHz`
            });
        }

        if (additionalProperties.length > 0) {
            schema.additionalProperty = additionalProperties;
        }

        // Remove existing schema
        const existingSchema = document.querySelector('script[type="application/ld+json"]');
        if (existingSchema) {
            existingSchema.remove();
        }

        // Add new schema
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    showNotification(message, type = 'info') {
        // Reuse the notification system from main app
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
                    top: 20px;
                    right: 20px;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius);
                    padding: 1rem;
                    box-shadow: var(--shadow-lg);
                    z-index: 1001;
                    max-width: 400px;
                    animation: slideInRight 0.3s ease-out;
                }
                .notification-success {
                    border-left: 4px solid var(--secondary);
                }
                .notification-error {
                    border-left: 4px solid #ef4444;
                }
                .notification-warning {
                    border-left: 4px solid #f59e0b;
                }
                .notification-info {
                    border-left: 4px solid var(--primary);
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--text-tertiary);
                    cursor: pointer;
                    position: absolute;
                    top: 0.5rem;
                    right: 0.5rem;
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
                notification.remove();
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
}

// Initialize product detail app
let productDetailApp;
document.addEventListener('DOMContentLoaded', () => {
    productDetailApp = new ProductDetailApp();
});