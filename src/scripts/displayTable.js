const displayTable = (data) => {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (!data || data.length === 0) {
        resultDiv.innerHTML = '<p class="has-text-warning">Нет данных для отображения.</p>';
        return;
      }

  
    if (!data || data.length === 0) {
        outputDiv.innerHTML = '<p class="has-text-warning">Нет данных для отображения.</p>';
        return;
    }
    depressionScores = calculateSurvey(data, surveyQuestionsAndScores, 8, 29)
    anxietyScores = calculateSurvey(data, anxietyBackScores, 30, 51)
    auditScores = calculateSurvey(data, auditQuestionsAndScores, 51, 61)

    depressionAnswers = getAnswers(data, surveyQuestionsAndScores, 8, 29)
    anxietyAnswers = getAnswers(data, anxietyBackScores, 30, 51)
    auditAnswers = getAnswers(data, auditQuestionsAndScores, 51, 61)

    // Create the table element
    const table = document.createElement('table');
    table.classList.add('table', 'is-scrollable');

    // Create the table header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>ID</th>
        <th>Имя</th>
        <th>Дата рождения</th>
        <th>Бек депрессия</th>
        <th>Бек тревога</th>
        <th>AUDIT</th>
        <th class='is-hidden-mobile'><input type="checkbox" onclick="toggleAll(this)"></th>
      `;
    table.appendChild(headerRow);

    const persons = data.map((personData, index) => { 
        return {
            index: index,
            ID: personData[0],
            name: personData[5],
            dob: personData[6],
          };
        });

    persons.forEach((person, index) => {
        const row = document.createElement('tr');
    
        // Проверяем условия для изменения фона и чекбокса
        const isHighlighted = 
            depressionScores[index] >= 16 || 
            anxietyScores[index] >= 9 || 
            auditScores[index] >= 16;
    
        row.innerHTML = `
          <td><button class="button is-text modal-btn" onclick="showAnswers(${person.ID})">${person.ID}</button></td>
          <td>${person.name}</td>
          <td>${person.dob}<input type="checkbox" class="row-checkbox is-hidden-tablet" onclick="showCopyBtn(this)" ${isHighlighted ? 'checked' : ''}></td>
          <td style="background-color: ${depressionScores[index] >= 16 ? 'coral' : 'transparent'}">${depressionScores[index]}</td>
          <td style="background-color: ${anxietyScores[index] >= 36 ? 'coral' : 'transparent'}">${anxietyScores[index]}</td>
          <td style="background-color: ${auditScores[index] >= 16 ? 'coral' : 'transparent'}">${auditScores[index]}</td>
          <td class='is-hidden-mobile'><input type="checkbox" class="row-checkbox" onclick="showCopyBtn(this)" ${isHighlighted ? 'checked' : ''}></td>
        `;
    
        if (isHighlighted) {
            row.style.backgroundColor = 'coral';
            const copyButton = document.getElementById('copyButton');
            copyButton.classList.remove('is-hidden');
        }
    
        if (canConvertToInt(person.ID)) {
            table.appendChild(row);
        }
    });

    // Append the table to the resultDiv
    
    resultDiv.appendChild(table);
    updateTableHeaders();

}

// Your existing file handling logic, modified to work with both methods
const processFile = (file) => {
    dropZone.classList.toggle('is-hidden', true);

    const filenameElement = document.getElementById('filenameElem');
    filenameElement.innerText = file.name;

    if (!file) {
        outputDiv.innerHTML = '<p class="has-text-danger">Файл не выбран.</p>';
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Предполагаем, что нам нужен первый лист
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        displayTable(jsonData);
    };

    reader.onerror = (error) => {
        outputDiv.innerHTML = `<p class="has-text-danger">Ошибка чтения файла: ${error}</p>`;
    };

    reader.readAsArrayBuffer(file);
}

