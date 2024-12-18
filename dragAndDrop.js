document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const outputDiv = document.getElementById('output');

    const displayTable = (data) => {
        
        const resultDiv = document.getElementById('result'); // Get the element with ID 'result'
        resultDiv.innerHTML = '';

        if (!data || data.length === 0) {
            resultDiv.innerHTML = '<p class="has-text-warning">Нет данных для отображения.</p>';
            return;
          }

        const persons = data.slice(2).map((personData, index) => {
              return {
                index: index,
                ID: personData[0],
                name: personData[5],
                dob: personData[6],
              };
            });

        if (!data || data.length === 0) {
            outputDiv.innerHTML = '<p class="has-text-warning">Нет данных для отображения.</p>';
            return;
        }
        depressionScores = calculateSurvey(data.slice(2), surveyQuestionsAndScores, 8, 28)
        anxietyScores = calculateSurvey(data.slice(2), anxietyBackScores, 30, 50)
        auditScores = calculateSurvey(data.slice(2), auditQuestionsAndScores, 51, 60)

        // Create the table element
        const table = document.createElement('table');
        table.classList.add('table'); // Add Bulma table class for styling (optional)

        // Create the table header row
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>ID</th>
            <th>Имя</th>
            <th>Дата рождения</th>
            <th>Бек депрессия</th>
            <th>Бек тревога</th>
            <th>AUDIT</th>
          `;
        table.appendChild(headerRow);

        // Create table rows for each person
        persons.forEach((person, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${person.ID}</td>
              <td>${person.name}</td>
              <td>${person.dob}</td>
              <td>${depressionScores[index]}</td>
              <td>${anxietyScores[index]}</td>
              <td>${auditScores[index]}</td>
            `;
            table.appendChild(row);
        });

        // Append the table to the resultDiv
        resultDiv.appendChild(table);
        }

        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });

        // Highlight drop zone when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, unhighlight, false);
        });

        // Handle dropped files
        dropZone.addEventListener('drop', handleDrop, false);

        // Handle click to select files
        dropZone.addEventListener('click', () => {
            fileInput.click();
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        function highlight(e) {
            dropZone.classList.add('drop-zone--over');
        }

        function unhighlight(e) {
            dropZone.classList.remove('drop-zone--over');
        }

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;

            if (files.length > 0) {
                processFile(files[0]);
            }
        }

        // Your existing file handling logic, modified to work with both methods
        const processFile = (file) => {
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

        // Handle file input change
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                processFile(file);
            }
        });
});