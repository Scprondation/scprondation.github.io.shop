document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll(".tab");
    const modal = document.getElementById("purchase-modal");
    const modalProductName = document.getElementById("modal-product-name");
    const modalProductPrice = document.getElementById("modal-product-price");
    const modalsrc = document.getElementById("modal-src"); 
    const modalbutton = document.getElementById("modal-button");
    const cancelPurchaseButton = document.getElementById("cancel-purchase");
    const buyButtons = document.querySelectorAll(".buy-button");



    

    
    // Переключение вкладок
    tabs.forEach(tab => {
        tab.addEventListener("click", event => {
            event.preventDefault();

            const targetId = tab.getAttribute("href").slice(1);

            sections.forEach(section => {
                section.classList.remove("active");
            });

            tabs.forEach(t => {
                t.classList.remove("active");
            });

            document.getElementById(targetId).classList.add("active");
            tab.classList.add("active");
        });
    });

    // Открытие модального окна
    buyButtons.forEach(button => {
        button.addEventListener("click", () => {
            const product = button.getAttribute("data-product");
            const price = button.getAttribute("data-price");
            const src = button.getAttribute("data-src");
            const button = button.getAttribute("button");

    
            modalProductName.textContent = `Товар: ${product}`;
            modalProductPrice.textContent = `Цена: ${price}`;
            modalsrc.textContent = `${src}`;
            modalbutton.textContent = `${button}`;

            modal.style.display = "flex";
        });
    });

    // Закрытие модального окна
    cancelPurchaseButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Закрытие модального окна при клике вне содержимого
    window.addEventListener("click", event => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const background = document.querySelector(".background");

    window.addEventListener("scroll", () => {
        // Получаем текущую позицию прокрутки
        const scrollPosition = window.pageYOffset;

        // Задаем смещение фона (можно регулировать множитель для изменения скорости)
        background.style.transform = `translateY(${scrollPosition * -0.6}px)`;
    });
});

