declare module 'multer-storage-cloudinary' {
  import { StorageEngine } from 'multer';

  export interface CloudinaryStorageOptions {
    cloudinary: any;
    params?: {
      folder?: string;
      format?: string;
      allowed_formats?: string[];
      public_id?: (req: any, file: any) => string;
      [key: string]: any;
    };
  }

  export class CloudinaryStorage implements StorageEngine {
    constructor(options: CloudinaryStorageOptions);
    _handleFile(req: any, file: any, callback: any): void;
    _removeFile(req: any, file: any, callback: any): void;
  }
}