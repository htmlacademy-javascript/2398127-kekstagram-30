const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
};

const createUnicueIds = (min, max) => {
  const previousIds = [];
  return function () {
    let currentId = getRandomInt(min, max);
    if (previousIds.length >= (max - min + 1)) {
      return null;
    }
    while (previousIds.includes(currentId)) {
      currentId = getRandomInt(min, max);
    }
    previousIds.push(currentId);
    return currentId;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

export {getRandomInt, createUnicueIds, getRandomArrayElement};
