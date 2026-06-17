const cursor = document.querySelector('.cursor');

window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {

    revealElements.forEach((element) => {

        const elementTop = element.getBoundingClientRect().top;

        if(elementTop < window.innerHeight - 100) {
            element.classList.add('active');
        }

    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

const buttons = document.querySelectorAll('.interactive-btn');

buttons.forEach((button) => {

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.08)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });

});

const cards = document.querySelectorAll('.style-card, .review-card');

cards.forEach((card) => {

    card.addEventListener('mousemove', (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 20;
        const rotateX = ((y / rect.height) - 0.5) * -20;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    });

});

/* CHATBOT */

const chatToggle =
document.getElementById("chat-toggle");

const chatContainer =
document.getElementById("chat-container");

chatToggle.addEventListener("click", () => {

    if (chatContainer.style.display === "flex") {

        chatContainer.style.display = "none";

    } else {

        chatContainer.style.display = "flex";

    }

});

const sendBtn =
document.getElementById("send-btn");

const userInput =
document.getElementById("user-input");

const chatMessages =
document.getElementById("chat-messages");

function responderPergunta(texto){

    texto = texto.toLowerCase();

    if(
        texto.includes("horário") ||
        texto.includes("hora") ||
        texto.includes("aberto")
    ){
        return "Funcionamos diariamente das 9h às 20h.";
    }

    if(
        texto.includes("fade") 
    ){
        return "O Fade Moderno é um dos cortes mais procurados da Dom Moustache.";
    }

    if(
        texto.includes("barba")
    ){
        return "Também oferecemos modelagem profissional de barba.";
    }

    if(
        texto.includes("agendar") ||
        texto.includes("marcar")
    ){
        return "Clique no botão 'Agende seu horário' na página principal.";
    }

        if(
        texto.includes("viking") 
    ){
        return "O Corte Viking é um estilo ousado e moderno, perfeito para quem quer se destacar.";
    }

        if(
        texto.includes("valor") ||
        texto.includes("preço")
    ){
        return "Os valores de corte são de 45 reais, agora da barba são 35 reais";
    }

    return "Desculpe, não consegui responder sua pergunta. Entre em contato com nossa equipe para informações mais específicas.";
}

function enviarMensagem(){

    const texto = userInput.value.trim();

    if(texto === "") return;

    chatMessages.innerHTML += `
        <div class="user-message">
            ${texto}
        </div>
    `;

    const resposta =
    responderPergunta(texto);

    chatMessages.innerHTML += `
        <div class="bot-message">
            ${resposta}
        </div>
    `;

    userInput.value = "";

    chatMessages.scrollTop =
    chatMessages.scrollHeight;
}

sendBtn.addEventListener(
    "click",
    enviarMensagem
);

userInput.addEventListener(
    "keypress",
    (e) => {

        if(e.key === "Enter"){
            enviarMensagem();
        }

    }
);
