document.addEventListener('DOMContentLoaded', () => {
    const entriesContainer = document.getElementById('entries-container');

    function getEntries() {
        return JSON.parse(localStorage.getItem('entries')) || [];
    }


    function saveEntries(entries) {
        localStorage.setItem('entries', JSON.stringify(entries));
    }

    function displayEntries(entries) {
        entriesContainer.innerHTML = ''; 

        entries.forEach((entry, index) => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry');

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.classList.add('delete-button');

            deleteButton.addEventListener('click', () => {
                const updatedEntries = entries.filter((_, i) => i !== index); 
                saveEntries(updatedEntries); 
                displayEntries(updatedEntries); 
            });

            entryDiv.innerHTML = `
                <img src="images/${getEmojiImage(entry.emoji)}.png" alt="${entry.emoji}" class="smile">
                <p><strong>${entry.title}</strong></p>
                <p>${entry.date}</p>
            `;

            entryDiv.appendChild(deleteButton);

            entriesContainer.appendChild(entryDiv);
        });
    }

    function getEmojiImage(emoji) {
        switch (emoji) {
            case 'Отлично': return 'smile5';
            case 'Хорошо': return 'smile4';
            case 'Так себе': return 'smile3';
            case 'Плохо': return 'smile2';
            case 'Ужасно': return 'smile1';
            default: 
                console.warn(`Неизвестная оценка: ${emoji}`);
                return 'smile6';
        }
    }

    const entries = getEntries();
    displayEntries(entries);
});