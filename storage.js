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

        if (entries.length === 0) {

            const noEntriesMessage = document.createElement('div');
            noEntriesMessage.classList.add('no-entries-message');
            noEntriesMessage.innerHTML = `
                <p style="color: white; font-size: 20px; text-align: center;">У вас еще нету записанных дней</p>
            `;
            entriesContainer.appendChild(noEntriesMessage);
        } else {
   
            entries.forEach((entry, index) => {
                const entryDiv = document.createElement('div');
                entryDiv.classList.add('entry');


                const toggleButton = document.createElement('button');
                toggleButton.classList.add('toggle-button');
                toggleButton.textContent = '▼'; 
                toggleButton.setAttribute('aria-expanded', 'false');

 
                toggleButton.addEventListener('click', () => {
                    const formElement = entryDiv.querySelector('.entry-form');
                    if (formElement.style.display === 'block') {
                        formElement.style.display = 'none';
                        toggleButton.textContent = '▼'; 
                        toggleButton.setAttribute('aria-expanded', 'false');
                    } else {
                        formElement.style.display = 'block';
                        toggleButton.textContent = '▲';
                        toggleButton.setAttribute('aria-expanded', 'true');
                    }
                });

           
                const formDiv = document.createElement('div');
                formDiv.classList.add('entry-form');
                formDiv.style.display = 'none'; 

              
                const descriptionDiv = document.createElement('div');
                descriptionDiv.classList.add('description-text');
                descriptionDiv.contentEditable = 'false';
                descriptionDiv.innerHTML = entry.description;

                
                const editIcon = document.createElement('img');
                editIcon.src = 'images/pen.png'; 
                editIcon.alt = 'Редактировать';
                editIcon.classList.add('edit-icon');
                editIcon.style.cursor = 'pointer';

               
                editIcon.addEventListener('click', () => {
                    const formElement = entryDiv.querySelector('.entry-form');

                  
                    if (formElement.style.display !== 'block') {
                        formElement.style.display = 'block';
                        toggleButton.textContent = '▲';
                        toggleButton.setAttribute('aria-expanded', 'true');
                    }

                    
                    if (!descriptionDiv.isContentEditable) {
                        descriptionDiv.contentEditable = 'true'; 
                        descriptionDiv.focus();

                       
                        descriptionDiv.addEventListener('input', () => {
                            const updatedDescription = descriptionDiv.innerText;
                            entries[index].description = updatedDescription;
                            saveEntries(entries); 
                        });
                    } else {
                        descriptionDiv.contentEditable = 'false'; 
                    }
                });

                formDiv.appendChild(descriptionDiv);

             
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

              
                entryDiv.appendChild(toggleButton);
                entryDiv.appendChild(formDiv); 
                entryDiv.appendChild(deleteButton); 
                entryDiv.appendChild(editIcon); 

                entriesContainer.appendChild(entryDiv);
            });
        }
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
