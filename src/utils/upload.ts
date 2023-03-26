import request from './request';

export default (file: File) => {
  const formData = new FormData();
  formData.set('file', file);

  return request({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: 'api/file/upload',
    method: 'POST',
    data: formData,
  });
};
