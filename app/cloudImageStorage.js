import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UploadImage = (file, onUploadSuccess) => {
  const storage = getStorage();
  const fileName = `ProfileImages/${file.name}`;
  const storageRef = ref(storage, fileName);

  const metadata = {
    contentType: 'image/jpeg',
  };

  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  uploadTask.on("state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused": console.log("Upload is paused"); break;
        case "running": console.log("Upload is running"); break;
      }
    }, 
    (error) => {
      console.log("Error uploading file", error);
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        onUploadSuccess(downloadURL); // Call the callback function with the download URL
      });
    }
  );
};
export default UploadImage;
