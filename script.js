const introduction = document.getElementById('introduction');
const form = document.querySelector('.form');
const startButton = document.getElementById('startButton');
const emojis = document.querySelectorAll('.emoji');
const textForm = document.getElementById('form-text');
const sendButton = document.getElementById('sendButton');

startButton.addEventListener('click', () => {
    introduction.classList.add('fade-out');
    setTimeout(() => {
        introduction.style.display = 'none';
        form.classList.add('active');
        form.classList.add('fade-in');
    }, 500);
});

let selectedEmoji = null;

emojis.forEach((emoji) => {
    emoji.addEventListener('click', () => {
        selectedEmoji = emoji.getAttribute('data-value');
        console.log('Выбранная оценка:', selectedEmoji);
        form.classList.add('fade-out');
        setTimeout(() => {
            form.style.display = 'none';
            form.classList.remove('active');
            textForm.classList.add('active');
            textForm.classList.add('fade-in');
        }, 500);
    });
});

sendButton.addEventListener('click', () => {
    const title = document.querySelector('.zagolovok').value.trim();
    const description = document.querySelector('.day').value.trim();

    if (!selectedEmoji || !title) {
        alert('Пожалуйста, выберите эмодзи и заполните заголовок.');
        return;
    }


    const entry = {
        emoji: selectedEmoji,
        title: title,
        description: description,
        date: new Date().toLocaleDateString()
    };

    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.unshift(entry); 
    localStorage.setItem('entries', JSON.stringify(entries));

    console.log('Записи после добавления:', entries);

    window.location.href = 'storage.html';
});