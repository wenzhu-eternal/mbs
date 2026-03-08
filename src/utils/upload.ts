import { fileService } from '@/services';

export default (file: File) => {
  return fileService.upload(file);
};
