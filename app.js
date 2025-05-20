// Fonction pour afficher un message de chargement
function showLoading() {
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        productsGrid.innerHTML = '<div class="loading">Chargement des produits...</div>';
    }
}

// Fonction pour afficher un message d'erreur
function showError(message) {
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        productsGrid.innerHTML = `<div class="error">${message}</div>`;
    }
}

// Fonction pour afficher les produits
function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    if (!productsToDisplay || productsToDisplay.length === 0) {
        showError('Aucun produit trouvé');
        return;
    }
    
    productsGrid.innerHTML = '';

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}" onerror="handleImageError(this)">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${product.price.toFixed(2)} €</div>
                <button class="btn" onclick="addToCart(${product.id})">Ajouter au panier</button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Fonction pour filtrer les produits par catégorie
function filterProducts(category) {
    try {
        showLoading();
        let filteredProducts = category ? products.filter(product => product.category === category) : products;
        displayProducts(filteredProducts);
    } catch (error) {
        showError('Une erreur est survenue lors du filtrage des produits');
        console.error('Erreur de filtrage:', error);
    }
}

// Fonction pour trier les produits
function sortProducts(sortOption) {
    try {
        showLoading();
        let sortedProducts = [...products];
        
        switch (sortOption) {
            case 'price-asc':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // Ne rien faire, garder l'ordre d'origine
                break;
        }
        
        displayProducts(sortedProducts);
    } catch (error) {
        showError('Une erreur est survenue lors du tri des produits');
        console.error('Erreur de tri:', error);
    }
}

// Fonction pour afficher le détail d'un produit
function displayProductDetail(productId) {
    try {
        const product = products.find(p => p.id == productId);
        if (!product) {
            showError('Produit non trouvé');
            return;
        }
        
        const container = document.getElementById('product-detail-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="product-detail-container">
                <div class="product-detail-img">
                    <img src="${product.image}" alt="${product.name}" onerror="handleImageError(this)">
                </div>
                <div class="product-detail-info">
                    <div class="product-detail-category">${product.category}</div>
                    <h1 class="product-detail-title">${product.name}</h1>
                    <div class="product-detail-price">${product.price.toFixed(2)} €</div>
                    <p class="product-detail-description">${product.description}</p>
                    <div class="quantity-selector">
                        <button onclick="decrementQuantity()">-</button>
                        <input type="number" id="quantity" value="1" min="1">
                        <button onclick="incrementQuantity()">+</button>
                    </div>
                    <div class="product-detail-actions">
                        <button class="btn btn-primary" onclick="addToCartWithQuantity(${product.id})">Ajouter au panier</button>
                        <button class="btn btn-secondary" onclick="buyNow(${product.id})">Acheter maintenant</button>
                    </div>
                </div>
            </div>
        `;
        
        // Mettre à jour le titre de la page
        document.title = `${product.name} - ShopFacile`;
    } catch (error) {
        showError('Une erreur est survenue lors de l\'affichage du produit');
        console.error('Erreur d\'affichage du produit:', error);
    }
}

// Fonction pour afficher les produits similaires
function displayRelatedProducts(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) return;
    
    const relatedProducts = products
        .filter(p => p.category === product.category && p.id != productId)
        .slice(0, 4);
    
    const container = document.getElementById('related-products-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    relatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${product.price.toFixed(2)} €</div>
                <a href="product.html?id=${product.id}" class="btn">Voir le produit</a>
            </div>
        `;
        
        container.appendChild(productCard);
    });
}

// Fonctions pour gérer la quantité
function incrementQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    }
}

function decrementQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput && parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

// Fonctions pour gérer le panier
function getCart() {
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Erreur lors de la récupération du panier:', error);
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    } catch (error) {
        console.error('Erreur lors de la sauvegarde du panier:', error);
        alert('Une erreur est survenue lors de la mise à jour du panier');
    }
}

function addToCart(productId) {
    try {
        const cart = getCart();
        const existingItem = cart.find(item => item.id == productId);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: productId,
                quantity: 1
            });
        }
        
        saveCart(cart);
        alert('Produit ajouté au panier !');
    } catch (error) {
        console.error('Erreur lors de l\'ajout au panier:', error);
        alert('Une erreur est survenue lors de l\'ajout au panier');
    }
}

function addToCartWithQuantity(productId) {
    const quantityInput = document.getElementById('quantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    
    const cart = getCart();
    const existingItem = cart.find(item => item.id == productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            quantity: quantity
        });
    }
    
    saveCart(cart);
    alert('Produit ajouté au panier !');
}

function buyNow(productId) {
    const quantityInput = document.getElementById('quantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    
    const cart = getCart();
    const existingItem = cart.find(item => item.id == productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            quantity: quantity
        });
    }
    
    saveCart(cart);
    window.location.href = 'checkout.html';
}

function updateCartCount() {
    const cartItems = getCart();
    const cartCount = document.getElementById('cart-count');
    
    if (cartCount) {
        const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalQuantity;
    }
}