/**
 * Функция проверяет длину строки
 * @param {string} text - проверяемая строка
 * @param {number} maxLength - максимальная длина
 * @returns {boolean} - результат проверки
 */
const checkStrLength = (text, maxLength) => text.length <= maxLength;

checkStrLength('проверяемая строка', 20);

/**
 * Функция проверяет является ли строка палиндромом
 * @param {string} text - проверяемая строка
 * @returns {boolean} - результат проверки
 */

const isPalindrome = (text) => {
  let normalizedText = text.replaceAll(' ', '');
  normalizedText = normalizedText.toLowerCase();
  let invertedText = '';
  for (let i = normalizedText.length - 1; i >= 0; i--) {
    invertedText += normalizedText[i];
  }
  return invertedText === normalizedText;
};

isPalindrome('топот');

/**
 * Функция извлекает цифры из строки
 * @param {string} text - обрабатываемая строка
 * @returns {number} - возвращает цифры в виде целого положительного числа. Если цифр нет - NaN
 */

const getNumbers = (text) => {
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

/**
Функция проверяет умещается ли встреча в рамки рабочего дня
* @param {string} startOfDay - начало рабочего дня в формате часы:минуты
* @param {string} endOfDay - конец рабочего дня в формате часы:минуты
* @param {string} startOfMeeting - начало встречи в формате часы:минуты
* @param {number} duration - продолжительность встречи в минутах
* @returns {boolean} - возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит
*/

const isEnoughTimeForMeeting = (startOfDay,endOfDay, startOfMeeting, duration) => {
  const convertTime = function (time) {
    const times = time.split(':');
    return parseInt(times[0], 10) * 60 + parseInt(times[1], 10);
  };
  const meetingStartsDuringWork = convertTime(startOfMeeting) >= convertTime(startOfDay);
  const meetingEndsDuringWork = convertTime(startOfMeeting) + duration <= convertTime(endOfDay);
  return meetingStartsDuringWork && meetingEndsDuringWork;
};

isEnoughTimeForMeeting('08:00', '17:30', '14:00', 80);
