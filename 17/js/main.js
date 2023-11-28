import {initValidation} from './user-form.js';
import {initEffectOptions, initScale} from './edit-picture.js';
import { getData } from './api.js';
import { initPicturesFilters } from './filter-pictures.js';
getData(initPicturesFilters);
initValidation();
initScale();
initEffectOptions();
