import cloudinary from "./cloudinaryConfig";


// 2 cases:
// 1. single file delete (no folder): use deleteFile in controller

// 2. folder delete: get all fileId's in folder and subfolders
// then delete all files using below:
export const deleteFileFromCloudinary = (publicId: string) => {
  cloudinary.uploader.destroy(publicId, { invalidate: true }, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
  });
};
