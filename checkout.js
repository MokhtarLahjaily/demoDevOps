// Fonction pour afficher les articles du checkout
function displayCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const checkoutSummaryContainer = document.getElementById('checkout-summary');
    
    if (!checkoutItemsContainer || !checkoutSummaryContainer) return;
    
    const cart = getCart();
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    let itemsHtml = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const product = products.find(p => p.id == item.id);
        if (!product) return;
        
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        itemsHtml += `
            <div class="checkout-item">
                <div class="checkout-item-img">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="checkout-item-info">
                    <div class="checkout-item-title">${product.name}</div>
                    <div class="checkout-item-price">${product.price.toFixed(2)} €</div>
                    <div class="checkout-item-quantity">Quantité: ${item.quantity}</div>
                </div>
            </div>
        `;
    });
    
    checkoutItemsContainer.innerHTML = itemsHtml;
    
    // Calcul des taxes et du total
    const shipping = subtotal > 100 ? 0 : 9.99;
    const taxes = subtotal * 0.2; // TVA à 20%
    const total = subtotal + shipping + taxes;
    
    // Affichage du résumé de la commande
    checkoutSummaryContainer.innerHTML = `
        <div class="checkout-summary-item">
            <span>Sous-total</span>
            <span>${subtotal.toFixed(2)} €</span>
        </div>
        <div class="checkout-summary-item">
            <span>Frais de livraison</span>
            <span>${shipping.toFixed(2)} €</span>
        </div>
        <div class="checkout-summary-item">
            <span>Taxes</span>
            <span>${taxes.toFixed(2)} €</span>
        </div>
        <div class="checkout-summary-item total">
            <span>Total</span>
            <span>${total.toFixed(2)} €</span>
        </div>
    `;
    
    // Gestion du formulaire de paiement
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processOrder();
        });
    }
}

// Fonction pour traiter la commande
function processOrder() {
    // Simuler le traitement de la commande
    setTimeout(() => {
        // Générer un numéro de commande aléatoire
        const orderNumber = 'ORD-' + Math.floor(Math.random() * 1000000);
        document.getElementById('order-number').textContent = orderNumber;
        
        // Afficher la modal de succès
        const modal = document.getElementById('success-modal');
        modal.style.display = 'block';
        
        // Fermer la modal au clic sur le x
        const closeBtn = document.getElementsByClassName('close')[0];
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        };
        
        // Fermer la modal au clic en dehors de la modal
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
        
        // Vider le panier
        saveCart([]);
        updateCartCount();
    }, 2000);
}