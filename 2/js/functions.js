const checkStrLength = function (text, maxLength) {
  return text.length <= maxLength;
};

const isPalindrome = function (text) {
  let normalizedText = text.replaceAll(' ', '');
  normalizedText = normalizedText.toLowerCase();
  let invertedText = '';
  for (let i = normalizedText.length - 1; i >= 0; i--) {
    invertedText += normalizedText[i];
  }
  return invertedText === normalizedText;
};

const getNumbers = function (text) {
  text = text.toString();
  let textNumber = '';
  for (let i = 0; i <= text.length; i++) {
    const textChar = parseInt(text[i], 10)
    if (!(Number.isNaN(textChar))) {
      textNumber += textChar;
    }
  }
  return(parseInt(textNumber, 10))
};
