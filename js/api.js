import { showDataError, showSuccessUpload, showFailedUpload} from './util.js';

const getData = (method) => {
  fetch('https://30.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((data) => {
      method(data);
    })
    .catch(() => {
      showDataError();
    });
};

const postData = (enableButton, formData, closePictureUploadForm) => {
  fetch(
    'https://30.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      } else {
        closePictureUploadForm();
        showSuccessUpload();
      }
    })
    .catch(() => {
      showFailedUpload();
    })
    .finally(enableButton);
};
export {getData, postData};
