import {createPicturesData} from './data.js';
import {createThumbnails} from './thumbnails.js';
import {initValidation} from './user-form.js';
import {initEffectOptions, initScale} from './edit-picture.js';

const picturesData = createPicturesData();
createThumbnails(picturesData);
initValidation();
initScale();
initEffectOptions();

