type UploadFileResponse = { data?: UploadData; error?: UploadError };

type UploadData = {
  key: string;
  url: string;
  name: string;
  size: number;
};

type UploadError = {
  code: string;
  message: string;
  data: any;
};

export type { UploadFileResponse, UploadData, UploadError };
