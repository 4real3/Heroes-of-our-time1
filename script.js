document.addEventListener('DOMContentLoaded', () => {
    // Анімація переходу між сторінками
    const navLinks = document.querySelectorAll('.nav-btn, .btn');
    const fadeOverlay = document.getElementById('fade-overlay');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');

            fadeOverlay.classList.add('active');
            setTimeout(() => {
                window.location.href = href;
            }, 800); // Збільшено час для плавності
        });
    });

    // Зникає затемнення після завантаження сторінки
    setTimeout(() => {
        fadeOverlay.classList.remove('active');
    }, 100);

    // Завантаження історій на сторінку "Герої"
    const heroesGrid = document.getElementById('heroes-grid');
    if (heroesGrid) {
        loadHeroes();
    }

    // Обробка форми додавання історії
    const form = document.getElementById('story-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('hero-name').value;
            const category = document.getElementById('hero-category').value;
            const story = document.getElementById('hero-story').value;
            const photoInput = document.getElementById('hero-photo');
            let photoUrl = 'https://via.placeholder.com/300x200';

            if (photoInput.files && photoInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    photoUrl = e.target.result;
                    saveHero(name, category, story, photoUrl);
                    alert('Історію додано! Перейдіть до вкладки "Герої".');
                    form.reset();
                };
                reader.readAsDataURL(photoInput.files[0]);
            } else {
                saveHero(name, category, story, photoUrl);
                alert('Історію додано! Перейдіть до вкладки "Герої".');
                form.reset();
            }
        });
    }
});

// Збереження історії в localStorage
function saveHero(name, category, story, photoUrl) {
    let heroes = JSON.parse(localStorage.getItem('heroes')) || [];
    heroes.push({ name, category, story, photoUrl });
    localStorage.setItem('heroes', JSON.stringify(heroes));
}

// Завантаження історій на сторінку
function loadHeroes() {
    const heroesGrid = document.getElementById('heroes-grid');
    let heroes = JSON.parse(localStorage.getItem('heroes')) || [];

    if (heroes.length === 0) {
        heroes = [
            {
                name: 'Олександр, військовий',
                category: 'military',
                story: 'Захищає країну на передовій з 2022 року.',
                photoUrl: 'https://via.placeholder.com/300x200'
            },
            {
                name: 'Марія, волонтерка',
                category: 'volunteer',
                story: 'Допомагає переселенцям знайти дім.',
                photoUrl: 'https://via.placeholder.com/300x200'
            }
        ];
        localStorage.setItem('heroes', JSON.stringify(heroes));
    }

    heroesGrid.innerHTML = '';
    heroes.forEach(hero => {
        const heroCard = document.createElement('div');
        heroCard.classList.add('hero-card');
        heroCard.innerHTML = `
            <img src="${hero.photoUrl}" alt="${hero.name}">
            <h3>${hero.name}</h3>
            <p>${hero.story}</p>
            <a href="#" class="btn-small">Читати історію</a>
        `;
        heroesGrid.appendChild(heroCard);
    });
}