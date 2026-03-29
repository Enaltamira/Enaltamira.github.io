const stores = [
    { 
        id: 1, 
        name: "Queso & Crochet", // Evoca lo artesanal y suave
        products: [
            { name: "Palito Tradicional", price: 2500, desc: "Masa crujiente y corazón de queso fundido.", weight: "80g", img: "img/palito1.jpg" },
            { name: "Duo Tropical", price: 3500, desc: "El equilibrio perfecto entre dulce guayaba y queso.", weight: "100g", img: "img/palito2.jpg" },
            { name: "Palito Premium", price: 3500, desc: "Doble porción de queso para los más exigentes.", weight: "110g", img: "img/palito3.jpg" }
        ]
    },
    { 
        id: 2, 
        name: "La Estación de la Papa", // Evoca un lugar de llegada y saciedad
        products: [
            { name: "Papas de la Casa", price: 6000, desc: "Porción dorada con toque de sal marina.", weight: "150g", img: "img/papas.jpg" },
            { name: "Salchi-Explosión", price: 10000, desc: "Papas crocantes con salchicha seleccionada.", weight: "250g", img: "img/salchi_p.jpg" },
            { name: "Combo Amigos", price: 15000, desc: "Salchipapa completa con gaseosa helada.", weight: "300g + 250ml", img: "img/combo.jpg" }
        ]
    },
    { 
        id: 3, 
        name: "Tentación Cremosa", // Apela directamente al instinto del dulce
        products: [
            { name: "Cheesecake de Limón", price: 2500, desc: "Refrescante y ácido en base crocante.", weight: "90g", img: "img/limon_p.jpg" },
            { name: "Cheesecake de Limón Familiar", price: 5000, desc: "Doble placer para compartir o repetir.", weight: "180g", img: "img/limon_g.jpg" },
            { name: "Cheesecake de Oreo", price: 2500, desc: "Cremoso con trozos reales de galleta.", weight: "90g", img: "img/oreo_p.jpg" },
            { name: "Cheesecake de Oreo Familiar", price: 5000, desc: "El favorito de todos en versión grande.", weight: "180g", img: "img/oreo_g.jpg" },
            { name: "Cheesecake de Mango", price: 2500, desc: "Dulzura tropical de mango maduro.", weight: "90g", img: "img/mango_p.jpg" },
            { name: "Cheesecake de Mango Familiar", price: 5000, desc: "Explosión frutal en cada bocado.", weight: "180g", img: "img/mango_g.jpg" }
        ]
    },
    { 
        id: 4, 
        name: "El Horno de la Abuela", // Evoca nostalgia y confianza
        products: [
            { name: "Ponqué de Banano", price: 12000, desc: "Esponjoso y natural, como hecho en casa.", weight: "450g", img: "img/banano.jpg" },
            { name: "Choco-Banano Silk", price: 14000, desc: "Nuestra base de banano con vetas de chocolate.", weight: "470g", img: "img/banano_choco.jpg" },
            { name: "Vainilla & Arándanos", price: 14000, desc: "Suave vainilla con frutos del bosque reales.", weight: "450g", img: "img/arandanos.jpg" },
            { name: "Ponqué de Maíz Real", price: 11000, desc: "Tradición dorada con el sabor del campo.", weight: "430g", img: "img/maiz.jpg" }
        ]
    },
    { 
        id: 5, 
        name: "Nubes de Azúcar", // Evoca ligereza y suavidad
        products: [
            { name: "Cupcake Vainilla Dream", price: 5000, desc: "Masa de vainilla con frosting de seda.", weight: "120g", img: "img/cup_v.jpg" },
            { name: "Cupcake Choco-Chispas", price: 5000, desc: "Cargado de chispas que se funden al comer.", weight: "120g", img: "img/cup_c.jpg" },
            { name: "Cupcake Banano Gold", price: 5000, desc: "Dulzura natural en formato individual.", weight: "120g", img: "img/cup_b.jpg" }
        ]
    },
    { 
        id: 6, 
        name: "S.O.S Confección", // Indica solución rápida a un problema
        products: [
            { name: "Ajuste Bota (Estándar)", price: 20000, desc: "Recorte original con acabado de fábrica.", weight: "Entrega 24h", img: "img/costura1.jpg" },
            { name: "Ajuste Bota (Express)", price: 30000, desc: "Prioridad máxima. Listo para usar hoy.", weight: "Entrega 1h", img: "img/costura2.jpg" }
        ]
    }
];



let cart = [];

// Contenedores del HTML
const listaComer = document.getElementById('listos-comer');
const listaPedido = document.getElementById('bajo-pedido');
const listaServicios = document.getElementById('servicios-list');

stores.forEach(store => {
    const btn = document.createElement('div');
    btn.className = 'store-tab';
    btn.innerText = store.name;
    btn.onclick = () => loadProducts(store.id);

    // Lógica de clasificación
    if (store.name === "S.O.S Confección") {
        listaServicios.appendChild(btn);
    } 
    else if (store.name === "Tentación Cremosa" || store.name === "El Horno de la Abuela") {
        listaPedido.appendChild(btn);
    } 
    else {
        // Queso & Crochet, La Estación de la Papa, Nubes de Azúcar
        listaComer.appendChild(btn);
    }
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
                <p style="font-size: 0.85rem; color: #555; margin: 5px 0;">${p.desc}</p>
                <p style="font-size: 0.75rem; color: #888;">Peso: ${p.weight}</p>
                
                <p><b>$${p.price.toLocaleString()}</b></p>
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
    let resumenTexto = ""; // Variable para el texto del correo

    itemsDiv.innerHTML = '';

    cart.forEach(item => {
        itemsDiv.innerHTML += `<p>${item.name} - $${item.price.toLocaleString()}</p>`;
        total += item.price;
        resumenTexto += `${item.name} ($${item.price}), `;
    });

    document.getElementById('cart-total').innerText = total.toLocaleString();
    // Enviamos un texto claro a Formspree
    document.getElementById('hidden-cart-data').value = `Total: $${total} | Productos: ${resumenTexto}`;
}

function toggleCart() {

    const modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

// Llenar select de Torres (30 a 60)
const torreSelect = document.getElementById('torre-select');
for (let i = 30; i <= 60; i++) {
    let opt = document.createElement('option');
    opt.value = "Torre " + i;
    opt.innerHTML = "Torre " + i;
    torreSelect.appendChild(opt);
}

// Llenar select de Apartamentos (101-104, 201-204... hasta 504)
const aptoSelect = document.getElementById('apto-select');
for (let piso = 1; piso <= 5; piso++) {
    for (let num = 1; num <= 4; num++) {
        let apto = piso + "0" + num;
        let opt = document.createElement('option');
        opt.value = apto;
        opt.innerHTML = apto;
        aptoSelect.appendChild(opt);
    }
}

// Función para el mensaje de "Pedido Agendado"
function confirmarPedido() {
    // Esto muestra una alerta nativa antes de que Formspree envíe el formulario
    alert("¡Genial! Tu pedido se ha agendado correctamente. Revisa tu Nequi para el pago.");
}
