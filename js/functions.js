const checkStrLength = function (text, maxLength) {
  return text.length <= maxLength;
};

checkStrLength('проверяемая строка', 20);
checkStrLength('проверяемая строка', 18);
checkStrLength('проверяемая строка', 10);

const isPalindrome = function (text) {
  let normalizedText = text.replaceAll(' ', '');
  normalizedText = normalizedText.toLowerCase();
  let invertedText = '';
  for (let i = normalizedText.length - 1; i >= 0; i--) {
    invertedText += normalizedText[i];
  }
  return invertedText === normalizedText;
};

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');

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

getNumbers('2023 год');
getNumbers('ECMAScript 2022');
getNumbers('1 кефир, 0.5 батона');
getNumbers('агент 007');
getNumbers('а я томат');
getNumbers(2023);
getNumbers(-1);
getNumbers(1.5);
