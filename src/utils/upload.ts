import request from './request';

export default (file: File) => {
  const formData = new FormData();
  formData.set('file', file);

  return request({
    url: 'api/file/upload',
    method: 'POST',
    data: formData,
  });
};
