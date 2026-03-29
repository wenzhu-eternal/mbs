import { fileService } from '@/services/file.service';

export default (file: File) => {
  return fileService.upload(file);
};
