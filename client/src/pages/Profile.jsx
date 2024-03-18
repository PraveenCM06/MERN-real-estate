import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from'react-router-dom';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice.js' ;
import ToasterUi from 'toaster-ui';
function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileref = useRef(null);
  const [file, setFile] = useState(undefined);
  //console.log(file);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const toaster = new ToasterUi();
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

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]:e.target.value});
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const configuration = {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(formData),
      }
      const response = await fetch(`/api/user/update/${currentUser._id}`, configuration);
      const data= await response.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      toaster.addToast("Success", "success", { duration: 4000 });
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async ()=>{
    try {
        dispatch(deleteUserStart());
        const configuration = {
          method: "DELETE"
        }
        const response = await fetch(`/api/user/delete/${currentUser._id}`,configuration);
        const data = await response.json();
        if(data.success===false){
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async ()=>{
    try {
      dispatch(signOutUserStart());
      const response = await fetch('/api/auth/signout');
      const data = await response.json();
      if(data.success === false){
        dispatch(signOutUserFailure(data.message))
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          onChange={handleChange}
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
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-50">
          {loading? 'Loading..': "Update"}
        </button>
        <Link to="/create-listing" className="bg-green-900 text-white p-3 rounded-lg text-center uppercase hover:opacity-90">Create listing</Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer font-semibold">
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer font-semibold">
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error? error : ""}</p>
    </div>
  );
}

export default Profile;
