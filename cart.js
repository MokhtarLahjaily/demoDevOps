// Fonction pour afficher le panier
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummaryContainer = document.getElementById('cart-summary');
    
    if (!cartItemsContainer || !cartSummaryContainer) return;
    
    const cart = getCart();
    
    if (cart.length === 0) {
        // Panier vide
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Votre panier est vide</h3>
                <p>Parcourez notre boutique et découvrez nos produits de qualité.</p>
                <a href="index.html" class="btn">Continuer les achats</a>
            </div>
        `;
        cartSummaryContainer.innerHTML = '';
        return;
    }
    
    // Panier avec des articles
    let tableHtml = `
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Produit</th>
                    <th>Prix</th>
                    <th>Quantité</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
    `;
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const product = products.find(p => p.id == item.id);
        if (!product) return;
        
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        tableHtml += `
            <tr>
                <td data-label="Produit">
                    <div class="cart-product">
                        <img src="${product.image}" alt="${product.name}">
                        <div>
                            <div class="cart-product-title">${product.name}</div>
                            <div class="cart-product-category">${product.category}</div>
                        </div>
                    </div>
                </td>
                <td data-label="Prix">${product.price.toFixed(2)} €</td>
                <td data-label="Quantité">
                    <div class="cart-quantity">
                        <button onclick="decrementCartItem(${product.id})">-</button>
                        <input type="number" value="${item.quantity}" min="1" onchange="updateCartItemQuantity(${product.id}, this.value)">
                        <button onclick="incrementCartItem(${product.id})">+</button>
                    </div>
                </td>
                <td data-label="Total">${itemTotal.toFixed(2)} €</td>
                <td>
                    <i class="fas fa-trash cart-remove" onclick="removeCartItem(${product.id})"></i>
                </td>
            </tr>
        `;
    });
    
    tableHtml += `
            </tbody>
        </table>
    `;
    
    cartItemsContainer.innerHTML = tableHtml;
    
    // Calcul des taxes et du total
    const shipping = subtotal > 100 ? 0 : 9.99;
    const taxes = subtotal * 0.2; // TVA à 20%
    const total = subtotal + shipping + taxes;
    
    // Affichage du résumé du panier
    cartSummaryContainer.innerHTML = `
        <div class="cart-summary">
            <h3>Résumé de la commande</h3>
            <div class="cart-summary-item">
                <span>Sous-total</span>
                <span>${subtotal.toFixed(2)} €</span>
            </div>
            <div class="cart-summary-item">
                <span>Frais de livraison</span>
                <span>${shipping.toFixed(2)} €</span>
            </div>
            <div class="cart-summary-item">
                <span>Taxes</span>
                <span>${taxes.toFixed(2)} €</span>
            </div>
            <div class="cart-summary-item total">
                <span>Total</span>
                <span>${total.toFixed(2)} €</span>
            </div>
            <button class="btn btn-primary btn-block" onclick="window.location.href='checkout.html'">Procéder au paiement</button>
        </div>
        <div class="cart-actions">
            <a href="index.html" class="btn">Continuer les achats</a>
            <button class="btn btn-danger" onclick="clearCart()">Vider le panier</button>
        </div>
    `;
}

// Fonction pour incrémenter la quantité d'un article du panier
function incrementCartItem(productId) {
    const cart = getCart();
    const item = cart.find(item => item.id == productId);
    
    if (item) {
        item.quantity++;
        saveCart(cart);
        displayCart();
    }
}

// Fonction pour décrémenter la quantité d'un article du panier
function decrementCartItem(productId) {
    const cart = getCart();
    const item = cart.find(item => item.id == productId);
    
    if (item && item.quantity > 1) {
        item.quantity--;
        saveCart(cart);
        displayCart();
    }
}

// Fonction pour mettre à jour la quantité d'un article du panier
function updateCartItemQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id == productId);
    
    if (item) {
        item.quantity = parseInt(quantity);
        saveCart(cart);
        displayCart();
    }
}

// Fonction pour supprimer un article du panier
function removeCartItem(productId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id != productId);
    
    saveCart(updatedCart);
    displayCart();
}

// Fonction pour vider le panier
function clearCart() {
    if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
        saveCart([]);
        displayCart();
    }
}