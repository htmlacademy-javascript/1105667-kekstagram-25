import './miniatures.js';
import './user-form.js';
import {debounce} from './util.js';
import {closeUploadForm, setUserFormSubmit} from './user-form.js';
import {renderPicturesList, drawPictures, setFiltersClick} from './miniatures.js';
import {getData} from './api.js';

const RERENDER_DELAY = 500;

getData((pictures) => {
  renderPicturesList(pictures);
  setFiltersClick(debounce(
    (evt) => drawPictures(evt, pictures),
    RERENDER_DELAY,
  ));
});

setUserFormSubmit(closeUploadForm);

