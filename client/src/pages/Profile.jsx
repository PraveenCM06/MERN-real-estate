import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileref = useRef(null);
  const [file, setFile] = useState(undefined);
  //console.log(file);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log(`upload is ${progress} % done`);
        setFilePercentage(Math.round(progress));
      },

      (error) => {
        setFileUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, photo: downloadURL });
        });
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileref}
          hidden
          accept="image"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileref.current.click()}
          className="mt-2 rounded-full h-24 w-24 object-cover cursor-pointer self-center"
          src={formData.photo || currentUser.photo}
          alt="profile"
        />
        <p className="text-sm self-center">
          {/*conditional rendering - condtionally rendered Data, basically it is an if-else-if condition*/}
          {fileUploadError ? 
              (<span className="text-red-600 font-semibold"> ❌ Failed to upload image , <br/> - Please upload image with .jpg or .png extensions <br/> - Image must be less than 2 MB </span>)
                : 
              filePercentage > 0 && filePercentage < 100 ? 
              (<span className="text-slate-700 font-semibold">{`Uplaoding ${filePercentage}%`}</span>)
                : 
              filePercentage === 100 ? 
              (<span className="text-green-700 font-semibold"> ✔ Upload Successful  </span>)
                :
              ("")
           }
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-50">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer font-semibold">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer font-semibold">
          Sign Out
        </span>
      </div>
    </div>
  );
}

export default Profile;
