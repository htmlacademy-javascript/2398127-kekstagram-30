import { showDataError, showSuccessUpload, showFailedUpload} from './util.js';

const getData = (method) => {
  fetch('https://30.javascript.pages.academy/kekstagram/data/')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showDataError();
    })
    .then((data) => {
      method(data);
    })
    .catch(() => {
      showDataError();
    });
};

const sendData = (body, enableButton, closeForm) => fetch(
  'https://30.javascript.pages.academy/kekstagram/',
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      showFailedUpload();
    } else {
      closeForm();
      showSuccessUpload();
    }
  })
  .catch(showFailedUpload)
  .finally(enableButton);

export {getData, sendData};
