function toggleAll(source) {
    const checkboxes = document.getElementsByClassName('row-checkbox');
    for(let checkbox of checkboxes) {
        checkbox.checked = source.checked;
    }
    showCopyBtn();
}

function copySelectedNames() {
    const checkboxes = document.getElementsByClassName('row-checkbox');
    let selectedNames = [];

    for(let i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked) {
            // Get the name from the second cell (index 1) of the row
            const name = checkboxes[i].closest('tr').cells[1].textContent;
            selectedNames.push(name);
            showCopyBtn();
        }
    }

    selectedNames = [...new Set(selectedNames)];

    if(selectedNames.length === 0) {
        alert('Please select at least one row');
        return;
    }

    // Copy to clipboard
    const namesText = selectedNames.join('\n');
    navigator.clipboard.writeText(namesText).then(() => {
        console.log('Names copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy names:', err);
        alert('Failed to copy names to clipboard');
    });
}

function showCopyBtn() {
    const checkboxes = document.querySelectorAll('.row-checkbox');
    const copyButton = document.getElementById('copyButton');
    let isAnyChecked = false;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          isAnyChecked = true;
        }
    });
    if (isAnyChecked) {
        copyButton.classList.remove('is-hidden');
    } else {
        copyButton.classList.add('is-hidden');
    }
}
