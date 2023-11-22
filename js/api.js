import { showDataError, showSuccessUpload, showFailedUpload} from './util';

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

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
      throw new Error(ErrorText.GET_DATA);
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
