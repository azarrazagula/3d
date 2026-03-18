// --- Data ---
const AVAILABLE_MEALS = [
    {
        id: 'm1',
        name: 'Sushi Roll Platter',
        description: 'Finest fish and veggies rolled to perfection.',
        price: 22.99,
        image: '/Users/ansaribrahim/.gemini/antigravity/brain/d454f3c1-94af-4593-b873-4d7317acdbbd/sushi_platter_1773832965311.png'
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty with authentic crispy crust.',
        price: 16.50,
        image: '/Users/ansaribrahim/.gemini/antigravity/brain/d454f3c1-94af-4593-b873-4d7317acdbbd/schnitzel_1773832981631.png'
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty, and extremely juicy.',
        price: 12.99,
        image: '/Users/ansaribrahim/.gemini/antigravity/brain/d454f3c1-94af-4593-b873-4d7317acdbbd/bbq_burger_1773833020946.png'
    },
    {
        id: 'm4',
        name: 'Green Salad Bowl',
        description: 'Healthy and green... and actually tastes good.',
        price: 18.99,
        image: '/Users/ansaribrahim/.gemini/antigravity/brain/d454f3c1-94af-4593-b873-4d7317acdbbd/salad_bowl_1773833243925.png'
    },
];

// --- State ---
let cart = [];

// --- DOM Elements ---
const mealsListEl = document.getElementById('meals-list');
const cartBtn = document.getElementById('cart-btn');
const cartBadge = document.getElementById('cart-badge');

const backdrop = document.getElementById('backdrop');
const cartModal = document.getElementById('cart-modal');
const successModal = document.getElementById('success-modal');

const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPriceEl = document.getElementById('cart-total-price');

const closeCartBtn = document.getElementById('close-cart-btn');
const orderBtn = document.getElementById('order-btn');
const cartActionsId = document.getElementById('cart-actions');

const checkoutForm = document.getElementById('checkout-form');
const formCancelBtn = document.getElementById('form-cancel-btn');
const closeSuccessBtn = document.getElementById('close-success-btn');

// --- Initialization ---
function init() {
    renderMeals();
    setupEventListeners();
}

function renderMeals() {
    mealsListEl.innerHTML = '';
    AVAILABLE_MEALS.forEach((meal) => {
        const li = document.createElement('li');
        li.className = 'meal-item';
        
        li.innerHTML = `
            <div class="meal-image"><img src="${meal.image}" alt="${meal.name}" /></div>
            <div class="meal-content">
                <h3>${meal.name}</h3>
                <div class="meal-desc">${meal.description}</div>
                <div class="meal-bottom">
                    <div class="meal-price">$${meal.price.toFixed(2)}</div>
                    <div class="meal-form">
                        <div class="meal-input">
                            <label for="amount_${meal.id}">Qty:</label>
                            <input type="number" id="amount_${meal.id}" min="1" max="5" step="1" value="1" />
                        </div>
                        <button class="btn" onclick="addToCartHandler('${meal.id}')">+ Add</button>
                    </div>
                </div>
            </div>
        `;
        mealsListEl.appendChild(li);
    });
}

function setupEventListeners() {
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    backdrop.addEventListener('click', closeAllModals);
    
    orderBtn.addEventListener('click', showCheckoutForm);
    formCancelBtn.addEventListener('click', hideCheckoutForm);
    
    checkoutForm.addEventListener('submit', submitOrderHandler);
    closeSuccessBtn.addEventListener('click', () => {
        closeAllModals();
        resetCart();
    });
}

// --- Cart Logic ---
window.addToCartHandler = function(mealId) {
    const meal = AVAILABLE_MEALS.find(m => m.id === mealId);
    const amountInput = document.getElementById(`amount_${mealId}`);
    const amount = Number(amountInput.value);
    
    if (amount < 1 || amount > 5) return;
    
    addItemToCart({
        id: meal.id,
        name: meal.name,
        price: meal.price,
        amount: amount
    });
    
    bumpCartIcon();
};

function addItemToCart(item) {
    const existingIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingIndex > -1) {
        const existingItem = cart[existingIndex];
        const updatedItem = {
            ...existingItem,
            amount: existingItem.amount + item.amount
        };
        cart = [...cart];
        cart[existingIndex] = updatedItem;
    } else {
        cart = cart.concat(item);
    }
    
    updateCartUI();
}

window.removeCartItem = function(id) {
    const existingIndex = cart.findIndex(item => item.id === id);
    const existingItem = cart[existingIndex];
    if(existingItem.amount === 1) {
        cart = cart.filter(item => item.id !== id);
    } else {
        const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
        cart = [...cart];
        cart[existingIndex] = updatedItem;
    }
    updateCartUI();
};

window.addCartItem = function(id) {
    const existingIndex = cart.findIndex(item => item.id === id);
    const existingItem = cart[existingIndex];
    const updatedItem = { ...existingItem, amount: existingItem.amount + 1 };
    cart = [...cart];
    cart[existingIndex] = updatedItem;
    
    updateCartUI();
};

function updateCartUI() {
    // Update Badge
    const totalItems = cart.reduce((curNumber, item) => curNumber + item.amount, 0);
    cartBadge.textContent = totalItems;
    
    // Update active cart modal content if open
    renderCartItems();
    
    // Update Total
    const totalAmount = cart.reduce((curNum, item) => curNum + (item.price * item.amount), 0);
    cartTotalPriceEl.textContent = `$${totalAmount.toFixed(2)}`;
    
    // Disable/enable order button based on cart content
    const hasItems = cart.length > 0;
    orderBtn.disabled = !hasItems;
}

function bumpCartIcon() {
    cartBadge.classList.add('bump');
    setTimeout(() => {
        cartBadge.classList.remove('bump');
    }, 300);
}

// --- Cart Modal Logic ---
function openCart() {
    backdrop.classList.add('visible');
    cartModal.classList.add('visible');
    cartModal.classList.remove('hidden');
    renderCartItems();
    updateCartUI();
}

function closeCart() {
    backdrop.classList.remove('visible');
    cartModal.classList.remove('visible');
    // small timeout for transition
    setTimeout(() => {
        hideCheckoutForm();
    }, 300);
}

function closeAllModals() {
    backdrop.classList.remove('visible');
    cartModal.classList.remove('visible');
    successModal.classList.add('hidden');
    setTimeout(() => {
        hideCheckoutForm();
        cartModal.classList.remove('hidden'); // Reset to default
    }, 300);
}

function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; padding: 1rem; color: #6b7280;">Your cart is empty.</p>';
        return;
    }
    
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-summary">
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                    <span class="cart-item-amount">x ${item.amount}</span>
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="btn-action" onclick="removeCartItem('${item.id}')">−</button>
                <button class="btn-action" onclick="addCartItem('${item.id}')">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(div);
    });
}

// --- Checkout Form Logic ---
function showCheckoutForm() {
    checkoutForm.classList.remove('hidden');
    cartActionsId.classList.add('hidden');
}

function hideCheckoutForm() {
    checkoutForm.classList.add('hidden');
    cartActionsId.classList.remove('hidden');
}

function submitOrderHandler(event) {
    event.preventDefault();
    
    // Validate inputs (html5 required handles mostly)
    const nameStr = document.getElementById('name').value.trim();
    if(nameStr.length === 0) return;
    
    // Show Success Modal
    cartModal.classList.remove('visible');
    setTimeout(() => {
        cartModal.classList.add('hidden');
        successModal.classList.remove('hidden');
        successModal.classList.add('visible');
    }, 300);
}

function resetCart() {
    cart = [];
    updateCartUI();
    checkoutForm.reset();
    hideCheckoutForm();
}

// --- Start ---
init();
