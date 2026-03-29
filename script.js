const stores = [
    { id: 1, name: "Tienda 1", products: [
        { name: "Producto A", price: 5000, img: "img/producto1.jpg" },
        { name: "Producto B", price: 12000, img: "img/producto2.jpg" }
    ]},
    // Repetir para las 10 tiendas...
    { id: 11, name: "Legumbres El Campo", products: [
        { name: "Cebolla Cabezona 1lb", price: 2500, img: "img/cebolla.jpg" },
        { name: "Tomate Chonto 1lb", price: 3000, img: "img/tomate.jpg" },
        { name: "Papa Nevada 1lb", price: 2800, img: "img/papa.jpg" }
    ]},
    { id: 12, name: "Droguería Vecina", products: [
        { name: "Alcohol Antiséptico", price: 4500, img: "img/alcohol.jpg" },
        { name: "Paquete de Tapabocas", price: 8000, img: "img/tapabocas.jpg" },
        { name: "Crema Dental", price: 6500, img: "img/crema.jpg" }
    ]},
    { id: 13, name: "Mundo Mascotas", products: [
        { name: "Snack para Perro", price: 7000, img: "img/snack_perro.jpg" },
        { name: "Arena para Gato 5kg", price: 15000, img: "img/arena.jpg" },
        { name: "Juguete Mordedor", price: 12000, img: "img/juguete.jpg" }
    ]},
    { id: 14, name: "Ferretería & Hogar", products: [
        { name: "Bombillo LED 9W", price: 9000, img: "img/bombillo.jpg" },
        { name: "Cinta de Enmascarar", price: 4000, img: "img/cinta.jpg" },
        { name: "Pilas AA x4", price: 11000, img: "img/pilas.jpg" }
    ]},
    { id: 15, name: "Variedades & Regalos", products: [
        { name: "Papel Regalo", price: 1500, img: "img/papel.jpg" },
        { name: "Tarjeta de Cumpleaños", price: 3500, img: "img/tarjeta.jpg" },
        { name: "Bolsa de Regalo Mediana", price: 4500, img: "img/bolsa.jpg" }
    ]}
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
