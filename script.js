const stores = [
    { id: 1, name: "Tienda 1", products: [
        { name: "Producto A", price: 5000, img: "img/producto1.jpg" },
        { name: "Producto B", price: 12000, img: "img/producto2.jpg" }
    ]},
    // Repetir para las 10 tiendas...
];

let cart = [];

// Cargar pestañas de tiendas
const storeList = document.getElementById('store-list');
stores.forEach(store => {
    const btn = document.createElement('div');
    btn.className = 'store-tab';
    btn.innerText = store.name;
    btn.onclick = () => loadProducts(store.id);
    storeList.appendChild(btn);
});

function loadProducts(storeId) {
    const store = stores.find(s => s.id === storeId);
    const grid = document.getElementById('products-grid');
    document.getElementById('store-name').innerText = store.name;
    grid.innerHTML = '';

    store.products.forEach(p => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${p.img}">
                <h4>${p.name}</h4>
                <p>$${p.price}</p>
                <button class="btn-green" onclick="addToCart('${p.name}', ${p.price})">Añadir al carrito</button>
            </div>
        `;
    });
}

function addToCart(name, price) {
    cart.push({name, price});
    updateCart();
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
    const itemsDiv = document.getElementById('cart-items');
    let total = 0;
    itemsDiv.innerHTML = '';
    
    cart.forEach(item => {
        itemsDiv.innerHTML += `<p>${item.name} - $${item.price}</p>`;
        total += item.price;
    });
    
    document.getElementById('cart-total').innerText = total;
    document.getElementById('hidden-cart-data').value = JSON.stringify(cart);
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}
