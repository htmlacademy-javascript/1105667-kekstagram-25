import './miniatures.js';
import './user-form.js';
import {closeUploadForm, setUserFormSubmit} from './user-form.js';
import {renderPicturesList} from './miniatures.js';
import {getData} from './api.js';

getData((pictures) => {
  renderPicturesList(pictures);
});

setUserFormSubmit(closeUploadForm);

