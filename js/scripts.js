
// Dados dos produtos
const products = [
    {
        id: 1,
        name: "Fueltech Ft300 + Chicote",
        price: 2400.00,
        image: "image/Fueltech Ft300 + Chicote.jpg"
    },
    {
        id: 2,
        name: "Fueltech Ft450 + Chicote",
        price: 4700.00,
        image: "image/Fueltech Ft450 + Chicote.webp"
    },
    {
        id: 3,
        name: "Fueltech Ft600 + Chicote",
        price: 12000.00,
        image: "image/Fueltech Ft600 + Chicote.webp"
    },
    {
        id: 4,
        name: "Fueltech Ft700 + Chicote",
        price: 24000.00,
        image: "image/Fueltech Ft700 + Chicote.webp"
    },
    {
        id: 5,
        name: "kit turbo gm 1.0 1.4 8v",
        price: 2500.00,
        image: "image/kit_turbo_gm_1_0_1_4_8v_.webp"
    },
    {
        id: 6,
        name: "kit turbo motor ap",
        price: 3000.00,
        image: "image/kit_turbo_motor_ap.webp"
    },
    {
        id: 7,
        name: "kit turbo  gm opala 6 cilindros carburado",
        price: 4000.00,
        image: "image/kit_turbo_padaria_gm_opala_6_cilindros_carburado_2e_turbina_50_zr_turbo.webp"
    },
    {
        id: 8,
        name: "Embreagem Multidisco Carbono Vw Ap 1.8",
        price: 2900.00,
        image: "image/Embreagem Multidisco Centrifuga Carbono Vw Ap 1.8.jpg"
    },
    {
        id: 9,
        name: "EMBREAGEM MULTIDISCO GM 1.8 2.0 2.2 2.4 1000CV",
        price: 3000.00,
        image: "image/EMBREAGEM MULTIDISCO EXTREME GM 1.8 2.0 2.2 2.4 1000CV.png"
    },
    {
        id: 10,
        name: "Embreagem Multidisco  Opala 4-6cil 1200CV",
        price: 4500.00,
        image: "image/Embreagem Multidisco Xtreme Opala 4 e 6cil Mista Ajustável 1200CV.jpg"
    },
    {
        id: 11,
        name: "Kit Aspirado Ap Injetado",
        price: 2500.00,
        image: "image/Kit Aspirado Ap Injetado.jpg"
    },
    {
        id: 12,
        name: "Kit de Admissão GM Opala Vertical 6cc",
        price: 3000.00,
        image: "image/Kit de Admissão GM Opala Vertical 6cc.webp"
    },
];

// Estado do carrinho
let cart = [];

// Elementos DOM
const productsGrid = document.getElementById('products-grid');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const elementoPontuacao = document.getElementById('pontuacao-fidelidade');

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
});

// Renderizar produtos
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Adicionar event listeners aos botões
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Adicionar produto ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Verificar se o produto já está no carrinho
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} adicionado ao carrinho!`);
}

// Remover produto do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Atualizar carrinho
function updateCart() {
    // Atualizar contador
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Atualizar lista de itens
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Seu carrinho está vazio</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
                <button class="cart-item-remove" data-id="${item.id}">Remover</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Atualizar total
    cartTotal.textContent = total.toFixed(2);
    
    // Adicionar event listeners aos botões de remover
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Mostrar notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        transition: transform 0.3s, opacity 0.3s;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateY(20px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Abrir/fechar carrinho
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});


let pontos = localStorage.getItem('pontos') ? parseInt(localStorage.getItem('pontos')) : 0;
const pontosEl = document.getElementById('pontos');
const msgEl = document.getElementById('mensagem');

function atualizarTela() {
  pontosEl.textContent = pontos;
}

function adicionarPontos(valor) {
  pontos += valor;
  localStorage.setItem('pontos', pontos);
  msgEl.textContent = `Você ganhou ${valor} pontos!`;
  atualizarTela();
}

function trocarPontos() {
  if (pontos >= 200) {
    pontos -= 200;
    localStorage.setItem('pontos', pontos);
    msgEl.textContent = "🎉 Você trocou 200 pontos por um desconto!";
    atualizarTela();
  } else {
    msgEl.textContent = "Você precisa de pelo menos 200 pontos!";
  }
}

atualizarTela();


