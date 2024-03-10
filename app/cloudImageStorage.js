import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";

// Get a reference to the storage service
const storage = getStorage();

// Upload image function
const uploadImage = () => {
  // Create a child reference
  const imagesRef = ref(storage, "images");

  // Upload the file and metadata
  const uploadTask = uploadBytesResumable(imagesRef, file);

  // Register observers
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Progress observer
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // Error observer
      console.error("Upload failed:", error);
    },
    async () => {
      // Completion observer
      console.log("Upload complete");
      // Get the download URL
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log("File available at:", downloadURL);
    }
  );
};

export default uploadImage;
