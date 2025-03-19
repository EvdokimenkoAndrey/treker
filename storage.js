document.addEventListener('DOMContentLoaded', () => {
    const entriesContainer = document.getElementById('entries-container');

    // Функция для получения записей из localStorage
    function getEntries() {
        return JSON.parse(localStorage.getItem('entries')) || [];
    }

    // Функция для сохранения записей в localStorage
    function saveEntries(entries) {
        localStorage.setItem('entries', JSON.stringify(entries));
    }

    // Функция для отображения записей
    function displayEntries(entries) {
        entriesContainer.innerHTML = ''; // Очищаем контейнер перед отрисовкой

        if (entries.length === 0) {
            // Если записей нет, показываем сообщение
            const noEntriesMessage = document.createElement('div');
            noEntriesMessage.classList.add('no-entries-message');
            noEntriesMessage.innerHTML = `
                <p style="color: white; font-size: 20px; text-align: center;">У вас еще нету записанных дней</p>
            `;
            entriesContainer.appendChild(noEntriesMessage);
        } else {
            // Если записи есть, отображаем их
            entries.forEach((entry, index) => {
                const entryDiv = document.createElement('div');
                entryDiv.classList.add('entry');

                // Создание кнопки со стрелочкой
                const toggleButton = document.createElement('button');
                toggleButton.classList.add('toggle-button');
                toggleButton.textContent = '▼'; // Стрелочка вниз
                toggleButton.setAttribute('aria-expanded', 'false'); // Для доступности

                // Обработчик клика по кнопке
                toggleButton.addEventListener('click', () => {
                    const formElement = entryDiv.querySelector('.entry-form');
                    if (formElement.style.display === 'block') {
                        formElement.style.display = 'none';
                        toggleButton.textContent = '▼'; // Меняем стрелочку на "вниз"
                        toggleButton.setAttribute('aria-expanded', 'false');
                    } else {
                        formElement.style.display = 'block';
                        toggleButton.textContent = '▲'; // Меняем стрелочку на "вверх"
                        toggleButton.setAttribute('aria-expanded', 'true');
                    }
                });

                // Блок с формой текста
                const formDiv = document.createElement('div');
                formDiv.classList.add('entry-form');
                formDiv.style.display = 'none'; // Сначала скрыто

                // Создаем div для редактирования
                const descriptionDiv = document.createElement('div');
                descriptionDiv.classList.add('description-text');
                descriptionDiv.contentEditable = 'false'; // По умолчанию не редактируемый
                descriptionDiv.innerHTML = entry.description; // Заполняем текущим текстом

                // Иконка карандаша
                const editIcon = document.createElement('img');
                editIcon.src = 'images/pen.png'; // Путь к вашей иконке карандаша
                editIcon.alt = 'Редактировать';
                editIcon.classList.add('edit-icon');
                editIcon.style.cursor = 'pointer';

                // Обработчик клика на иконку карандаша
                editIcon.addEventListener('click', () => {
                    const formElement = entryDiv.querySelector('.entry-form');

                    // Показываем форму текста, если она скрыта
                    if (formElement.style.display !== 'block') {
                        formElement.style.display = 'block';
                        toggleButton.textContent = '▲'; // Меняем стрелочку на "вверх"
                        toggleButton.setAttribute('aria-expanded', 'true');
                    }

                    // Включаем режим редактирования
                    if (!descriptionDiv.isContentEditable) {
                        descriptionDiv.contentEditable = 'true'; // Разрешаем редактирование
                        descriptionDiv.focus(); // Фокус на div

                        // Автоматическое сохранение при каждом изменении
                        descriptionDiv.addEventListener('input', () => {
                            const updatedDescription = descriptionDiv.innerText;
                            entries[index].description = updatedDescription; // Обновляем описание
                            saveEntries(entries); // Сохраняем изменения
                        });
                    } else {
                        descriptionDiv.contentEditable = 'false'; // Выключаем редактирование
                    }
                });

                formDiv.appendChild(descriptionDiv);

                // Создание кнопки удаления
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Удалить';
                deleteButton.classList.add('delete-button');

                // Обработчик удаления записи
                deleteButton.addEventListener('click', () => {
                    const updatedEntries = entries.filter((_, i) => i !== index); // Удаляем запись по индексу
                    saveEntries(updatedEntries); // Сохраняем обновленные данные
                    displayEntries(updatedEntries); // Перерисовываем записи
                });

                entryDiv.innerHTML = `
                    <img src="images/${getEmojiImage(entry.emoji)}.png" alt="${entry.emoji}" class="smile">
                    <p><strong>${entry.title}</strong></p>
                    <p>${entry.date}</p>
                `;

                // Добавляем элементы в форму
                entryDiv.appendChild(toggleButton); // Кнопка со стрелочкой
                entryDiv.appendChild(formDiv); // Форма текста
                entryDiv.appendChild(deleteButton); // Кнопка удаления
                entryDiv.appendChild(editIcon); // Иконка карандаша

                entriesContainer.appendChild(entryDiv);
            });
        }
    }

    // Функция для получения имени файла эмодзи
    function getEmojiImage(emoji) {
        switch (emoji) {
            case 'Отлично': return 'smile5';
            case 'Хорошо': return 'smile4';
            case 'Так себе': return 'smile3';
            case 'Плохо': return 'smile2';
            case 'Ужасно': return 'smile1';
            default: 
                console.warn(`Неизвестная оценка: ${emoji}`);
                return 'smile6'; // Возвращаем дефолтное значение
        }
    }

    // Получаем и отображаем записи при загрузке страницы
    const entries = getEntries();
    displayEntries(entries);
});
