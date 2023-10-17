const DESCRIPTIONS = [
  'Фото озера',
  'Фото знака',
  'Фото океана',
  'Фото девушки',
  'Фото еды',
  'Фото машины',
  'Еще одно фото еды',
  'Фото напитка',
  'Еще одно фото девушки',
  'Фото обуви',
  'Фото пляжа',
  'Еще одно фото машины',
  'Третье фото еды',
  'Фото кота суши',
  'Фото дивана',
  'Фото неба',
  'Фото оркестра',
  'Фото старой машины',
  'Фото тапков',
  'Фото пальм',
  'Фото какой-то еды',
  'Фото заката',
  'Фото краба',
  'Фото концерта',
  'Фото машины в грязи',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Алексей',
  'Артем',
  'Борис',
  'Максим',
  'Екатерина',
  'Василий',
];

const PICTURES_COUNT = 25;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
};

function createRandomId (min, max) {
  const previousId = [];
  return function () {
    let currentId = getRandomInt(min, max);
    if (previousId.length >= (max - min + 1)) {
      return null;
    }
    while (previousId.includes(currentId)) {
      currentId = getRandomInt(min, max);
    }
    previousId.push(currentId);
    return currentId;
  };
}
const randomId = createRandomId(1, 25);
const randomUrl = createRandomId(1, 25);
const randomCommentId = createRandomId(1, 1000);

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];


const createCommentsInfo = () => ({
  id: randomCommentId(),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPictureInfo = () => {
  const pictureUrl = randomUrl();
  return {
    id: randomId(),
    url: `photos/${pictureUrl}.jpg`,
    description: DESCRIPTIONS[pictureUrl - 1],
    likes: getRandomInt(15, 200),
    comments: Array.from({length: getRandomInt(0, 30)}, createCommentsInfo)
  };
};

const picturesInfo = Array.from({length: PICTURES_COUNT}, createPictureInfo);
