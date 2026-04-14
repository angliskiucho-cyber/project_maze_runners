document.addEventListener('DOMContentLoaded', () => {

    // 1. Анимация при скролле (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, observerOptions);

    fadeElements.forEach(el => appearOnScroll.observe(el));


    // 2. Логика фильтрации кроссовок (The Trial)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const shoeCards = document.querySelectorAll('.shoe-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок
            filterBtns.forEach(b => b.classList.remove('active'));
            // Добавляем нажатой
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            shoeCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Простая логика фильтрации
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                    // Небольшая задержка для плавности появления (CSS animation reset)
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // время должно совпадать с CSS transition, если он задан
                }
            });
        });
    });

    // 3. Интерактивный список экипировки
    const kitItems = document.querySelectorAll('.kit-item');
    const descContents = document.querySelectorAll('.desc-content');

    kitItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Убираем активные классы из списка
            kitItems.forEach(i => {
                i.classList.remove('active');
                // Визуально переключаем чекбокс (опционально, для атмосферы)
                const checkbox = i.querySelector('input[type="checkbox"]');
                if(checkbox) checkbox.checked = false;
            });

            // Делаем текущий элемент активным
            item.classList.add('active');
            const currentCheckbox = item.querySelector('input[type="checkbox"]');
            if(currentCheckbox) currentCheckbox.checked = true;

            // Скрываем все описания
            descContents.forEach(desc => desc.classList.remove('active'));

            // Показываем нужное
            const targetId = item.getAttribute('data-desc');
            document.getElementById(targetId).classList.add('active');
        });
    });

});