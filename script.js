// Mock Data for destinations
const destinations = [
    {
        id: 1,
        title: "Museu de Arte de São Paulo",
        type: "cultural",
        badge: "Museu",
        desc: "O icônico MASP, conhecido por sua arquitetura brutalista com vãos livres e rica coleção de arte ocidental.",
        image: "https://images.unsplash.com/photo-1590403759247-493408a2fc2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        station: "Trianon-Masp",
        lineColor: "#007A5E", // Linha 2 Verde
        time: "5 min",
        walking: "a pé"
    },
    {
        id: 2,
        title: "Estação da Luz",
        type: "turismo",
        badge: "Histórico",
        desc: "Uma das mais importantes estações ferroviárias de SP, com arquitetura vitoriana clássica deslumbrante.",
        image: "https://images.unsplash.com/photo-1629739198305-64906f362145?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        station: "Luz",
        lineColor: "#00539F", // Linha 1 Azul
        time: "0 min",
        walking: "local"
    },
    {
        id: 3,
        title: "A Casa do Porco",
        type: "restaurante",
        badge: "Restaurante",
        desc: "Alta gastronomia acessível no centro da cidade, um dos melhores restaurantes do mundo.",
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        station: "República",
        lineColor: "#ED3237", // Linha 3 Vermelha
        time: "8 min",
        walking: "a pé"
    },
    {
        id: 4,
        title: "Padaria Bella Paulista",
        type: "padaria",
        badge: "Padaria",
        desc: "Tradicional padaria paulistana aberta 24h, famosa pelos pães frescos e buffet gigante.",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        station: "Consolação",
        lineColor: "#007A5E",
        time: "10 min",
        walking: "a pé"
    },
    {
        id: 5,
        title: "Rosewood São Paulo",
        type: "hospedagem",
        badge: "Hotel",
        desc: "Um refúgio de luxo no complexo Cidade Matarazzo, com arquitetura deslumbrante e natureza integrada.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        station: "Trianon-Masp",
        lineColor: "#007A5E",
        time: "12 min",
        walking: "a pé"
    },
    {
        id: 6,
        title: "Beco do Batman",
        type: "turismo",
        badge: "Ao Ar Livre",
        desc: "Galeria a céu aberto na Vila Madalena, repleta de murais de grafite em constante mudança.",
        image: "https://images.unsplash.com/photo-1574766863618-9366e6b010c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        station: "Fradique Coutinho",
        lineColor: "#FFD524", // Linha 4 Amarela
        time: "15 min",
        walking: "a pé"
    }
];

// DOM Elements
const grid = document.getElementById('destinations-grid');
const filterBtns = document.querySelectorAll('.chip');

// Render Cards
function renderCards(filterType = 'all') {
    grid.innerHTML = ''; // Clear current

    const filtered = filterType === 'all'
        ? destinations
        : destinations.filter(d => d.type === filterType);

    filtered.forEach((dest, index) => {
        // Staggered animation delay
        const delay = index * 0.1;

        const card = document.createElement('div');
        card.className = 'card';
        card.style.animation = `fadeIn 0.6s ease-out ${delay}s both`;

        // Build card HTML
        // Note: The transit UI inspiration shines here in the .route-info section
        card.innerHTML = `
            <div class="card-img-container">
                <span class="card-badge"><i data-lucide="tag" style="width:12px"></i> ${dest.badge}</span>
                <img src="${dest.image}" alt="${dest.title}" class="card-img" loading="lazy">
            </div>
            <div class="card-content">
                <h3 class="card-title">${dest.title}</h3>
                <p class="card-desc">${dest.desc}</p>
                
                <div class="route-info">
                    <div class="route-path">
                        <div class="route-point">
                            <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:${dest.lineColor};"></span>
                            Estação ${dest.station}
                        </div>
                    </div>
                    <div class="route-time">
                        <span>${dest.time}</span>
                        <small>${dest.walking}</small>
                    </div>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    // Re-initialize lucide icons for newly created elements
    lucide.createIcons();
}

// Filter Logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add to clicked
        btn.classList.add('active');

        // Render specific type
        const type = btn.getAttribute('data-filter');
        renderCards(type);
    });
});

// Chat Widget Logic
const chatFab = document.getElementById('chat-fab');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');

if (chatFab && chatWindow && closeChat) {
    chatFab.addEventListener('click', () => {
        chatWindow.classList.add('open');
    });

    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('open');
    });
}

// Chat AI Integration
const chatMessages = document.querySelector(".chat-messages");
const chatInput = document.querySelector(".chat-input-area input");
const sendButton = document.querySelector(".chat-input-area .send-btn");

function getCurrentTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
}

function scrollBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Create user message
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "sent");
    userMessage.innerHTML = `<p>${message}</p><span class="msg-time">${getCurrentTime()}</span>`;

    chatMessages.appendChild(userMessage);
    chatInput.value = "";
    scrollBottom();

    // Create loading message
    const loadingMessage = document.createElement("div");
    loadingMessage.classList.add("message", "received");
    loadingMessage.innerHTML = `<p>Pensando...</p><span class="msg-time">${getCurrentTime()}</span>`;

    chatMessages.appendChild(loadingMessage);
    scrollBottom();

    try {
        const response = await fetch("http://localhost:3001/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        loadingMessage.querySelector("p").innerText = data.response;

    } catch (error) {
        loadingMessage.querySelector("p").innerText = "Deu pau ao conectar com a SkillForge AI.";
    }

    scrollBottom();
}

if (sendButton && chatInput) {
    sendButton.addEventListener("click", sendMessage);

    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
}

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderCards();
});
