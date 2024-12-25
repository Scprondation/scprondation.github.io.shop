document.addEventListener("DOMContentLoaded", () => {
    // Модальное окно
    const modal = document.getElementById('purchase-modal');
    const cancelBtn = document.getElementById('cancel-purchase');
    const modalHeader = document.getElementById('modal-header');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalAdditionalInfo = document.getElementById('modal-additional-info');
    const modalButton = document.getElementById('modal-button');

    const buyButtons = document.querySelectorAll('.buy-button');

    // Обработчик нажатия на кнопку покупки
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            const price = button.getAttribute('data-price');
            const ip = button.getAttribute('data-ip'); // Получаем IP для бесплатного товара

            modalProductName.textContent = product;
            modalProductPrice.textContent = price !== 'бесплатно' ? `Цена: ${price}` : '';  // Цена не отображается, если товар бесплатный

            if (price === 'бесплатно') {
                // Для бесплатных товаров
                modalHeader.textContent = 'Информация о товаре';
                if (ip) {
                    modalAdditionalInfo.innerHTML = `<p>IP сервера: ${ip}</p>`;  // Отображаем IP
                } else {
                    modalAdditionalInfo.innerHTML = '<p>Информация недоступна</p>';
                }
                modalButton.style.display = 'none';  // Скрываем кнопку для бесплатных товаров
            } else {
                // Для платных товаров
                modalHeader.textContent = 'Вы уверены, что хотите купить?';
                modalAdditionalInfo.innerHTML = '<p>средства нельзя будет вернуть.</p>';
                modalButton.style.display = 'block';  // Показываем кнопку для платных товаров
                modalButton.textContent = 'Перейти в Telegram';
                modalButton.setAttribute('href', 't.me/Scprondation');  // Устанавливаем ссылку на Telegram
                modalButton.setAttribute('target', '_blank'); // Открываем ссылку в новой вкладке
            }

            modal.style.display = 'flex';
        });
    });

    // Обработчик нажатия кнопки "Отменить"
    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Переключение вкладок
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabs = document.querySelectorAll('.tab');

    // Функция для переключения вкладок
    function switchTab(event) {
        event.preventDefault();

        // Удаляем класс активной вкладки у всех ссылок
        tabLinks.forEach(link => link.classList.remove('active'));

        // Добавляем класс активной вкладке
        event.target.classList.add('active');

        // Скрываем все вкладки
        tabs.forEach(tab => tab.style.display = 'none');

        // Показать вкладку, на которую кликнули
        const targetTab = document.getElementById(event.target.getAttribute('data-tab'));
        targetTab.style.display = 'block';
    }

    // Обработчик кликов по ссылкам вкладок
    tabLinks.forEach(link => link.addEventListener('click', switchTab));

    // Устанавливаем первую вкладку как активную по умолчанию
    tabLinks[0].classList.add('active');
    tabs[0].style.display = 'block';
});


// Функция для добавления и удаления класса подсветки
function highlightCard(card) {
  // Если карточка уже подсвечена, снимаем подсветку
  if (card.classList.contains('highlighted')) {
    card.classList.remove('highlighted');
  } else {
    // Если карточка не подсвечена, добавляем класс подсветки
    card.classList.add('highlighted');
  }
}
