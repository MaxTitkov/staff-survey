function updateTableHeaders() {
    const headers = document.querySelectorAll('.table th');
    const isMobile = window.innerWidth <= 480; // Определяем мобильное устройство 
    headers.forEach((header) => {
        if (isMobile) {
            console.log('DFGDFGDFGDFG')
            // Заменяем длинный текст на короткий
            if (header.innerText === 'Дата рождения') {
                header.innerText = 'DOB';
            }
            if (header.innerText === 'Бек депрессия') {
                header.innerText = 'Депр.';
            }
            // Добавьте другие условия для замены текста
        } else {
            // Восстановить оригинальный текст при изменении размера
            if (header.innerText === 'Бек тревога') {
                header.innerText = 'Трев.';
            }
        }
    });
}
