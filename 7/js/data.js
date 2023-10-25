import {getRandomInt, createUnicueIds, getRandomArrayElement} from './util.js';

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
const randomId = createUnicueIds(1, 25);
const randomUrl = createUnicueIds(1, 25);
const randomCommentId = createUnicueIds(1, 1000);

const createCommentsData = () => ({
  id: randomCommentId(),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPictureData = () => {
  const pictureUrl = randomUrl();
  return {
    id: randomId(),
    url: `photos/${pictureUrl}.jpg`,
    description: DESCRIPTIONS[pictureUrl - 1],
    likes: getRandomInt(15, 200),
    comments: Array.from({length: getRandomInt(0, 30)}, createCommentsData)
  };
};

const picturesData = Array.from({length: PICTURES_COUNT}, createPictureData);
export {picturesData};
