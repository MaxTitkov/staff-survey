function showAnswers(index) {
    const answersContent = document.getElementById('answersContent');

    const formatAnswers = (answers) =>
        answers
            .map((a, i) => {
                const boldClass = a.score >= 1 ? 'bold-answer' : '';
                return `<div class="modal-answer ${boldClass}">${i + 1}. ${a.text} (${a.score})</div>`;
            })
            .join('');

    answersContent.innerHTML = `
        <div><strong>Депрессия:</strong></div>
        ${formatAnswers(depressionAnswers[index])}
        <div><strong>Тревога:</strong></div>
        ${formatAnswers(anxietyAnswers[index])}
        <div><strong>AUDIT:</strong></div>
        ${formatAnswers(auditAnswers[index])}
    `;

    const modal = document.getElementById('answersModal');
    modal.classList.add('is-active');
}

function closeModal() {
    const modal = document.getElementById('answersModal');
    modal.classList.remove('is-active');
}
