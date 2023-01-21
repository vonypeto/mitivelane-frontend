import axios from "axios";
import firebase from "firebase/app";
import "firebase/storage";
import { message } from "antd";

const deletePhoto = async (url) => {
  let pictureRef = firebase.storage().refFromURL(url);
  await pictureRef
    .delete()
    .then(() => {
      console.log("Picture is deleted successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
};

export async function ResidentFileUploadApi(
  values,
  fileUrl,
  fileOldUrl,
  filePath,
  callback
) {
  try {
    console.log("fileOldUrl", fileOldUrl)
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`/${filePath}/${Date.now()}_${fileUrl?.name}`);

    if (fileUrl?.type) {
      // New Image
      await fileRef.put(fileUrl).then(function (_) {
        // initialized file upload
        fileRef.getDownloadURL().then(async function (url) {

          values.profile = {
            fileUrl: url,
            fileType: fileUrl?.type
          }

          // Old Image delete after success
          if (fileOldUrl != null) await deletePhoto(fileOldUrl);
          
          callback(values)

        });
      })
        .catch((error) => {
          // if error occure delete new image uploaded
          deletePhoto(url);
          console.log(error.message);
          return message.error(error.message);
        });;
    } else {
      //Old Image
    }
  } catch (error) {
    console.error(error);
    return message.error(error.message);
  }
}

