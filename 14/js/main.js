import {createThumbnails} from './thumbnails.js';
import {initValidation} from './user-form.js';
import {initEffectOptions, initScale} from './edit-picture.js';
import {getData} from './api.js';

getData(createThumbnails);
initValidation();
initScale();
initEffectOptions();

