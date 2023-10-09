const checkStrLength = function (text, maxLength) {
  return text.length <= maxLength;
};

checkStrLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStrLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStrLength('проверяемая строка', 10); // false

const isPalindrome = function (text) {
  let normalizedText = text.replaceAll(' ', '');
  normalizedText = normalizedText.toLowerCase();
  let invertedText = '';
  for (let i = normalizedText.length - 1; i >= 0; i--) {
    invertedText += normalizedText[i];
  }
  return invertedText === normalizedText;
};

isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false

const getNumbers = function (text) {
  text = text.toString();
  let textNumber = '';
  for (let i = 0; i <= text.length; i++) {
    const textChar = parseInt(text[i], 10);
    if (!(Number.isNaN(textChar))) {
      textNumber += textChar;
    }
  }
  return(parseInt(textNumber, 10));
};

getNumbers('2023 год'); // 2023
getNumbers('ECMAScript 2022'); // 2022
getNumbers('1 кефир, 0.5 батона'); // 105
getNumbers('агент 007'); // 7
getNumbers('а я томат'); // NaN
getNumbers(2023); // 2023
getNumbers(-1); // 1
getNumbers(1.5); // 15
