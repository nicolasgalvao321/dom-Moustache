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