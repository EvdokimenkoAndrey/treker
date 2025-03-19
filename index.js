function caesarEncryptRussian(text, shift) {
    return text.split('').map(char => {
        if (char.match(/[а-яё]/i)) { // Проверяем, является ли символ русской буквой
            const isLower = char === char.toLowerCase(); // Проверяем регистр
            const base = isLower ? 1072 : 1040; // База для маленьких или больших букв (Unicode)
            let code = char.charCodeAt(0);

            // Обработка буквы "Ё/ё"
            if (char.toLowerCase() === 'ё') {
                code = isLower ? 1105 : 1025; // Unicode для "ё" и "Ё"
                return String.fromCharCode(((code - base + shift + 33) % 33) + base);
            }

            // Обработка остальных букв
            return String.fromCharCode(((code - base + shift + 33) % 33) + base);
        }
        return char; // Не буквы остаются без изменений
    }).join('');
}
let mixedText = "РГЖЛИЕ";
let encryptedMixed = caesarEncryptRussian(mixedText, 3, 'encrypt');
console.log(encryptedMixed);