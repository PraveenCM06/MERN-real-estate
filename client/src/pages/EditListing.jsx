import React, { useEffect, useState } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js'
import {useSelector} from 'react-redux';
import ToasterUi from 'toaster-ui';
import { useNavigate,useParams } from "react-router-dom";


function CreateListing() {

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name:'',
    description:'',
    address:'',
    landmark:'',
    city:'',
    state:'',
    askingPrice:0,
    bedrooms:1,
    bathrooms:1,
    furnished:false,
    parking:false,
    type:'rent',
    imageURLs:[],
    
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  // console.log(formData);
  const[uploading, setUploading] = useState(false);
  const [error, setError] =useState(false);
  const [loading, setLoading] = useState(false);
  const {currentUser} = useSelector(state=>state.user);
  const toaster = new ToasterUi();
  const navigate= useNavigate();
  const params = useParams();
  useEffect(()=>{
    const fetchListing = async ()=>{
        const listingId = params.listingId;
        const res = await fetch(`/api/listing/getlisting/${listingId}`);
        const data= await res.json();
        if(data.success ===false){
            console.log(data.message);
            return;
        }
        setFormData(data);
    }

    fetchListing();
  },[]);

  const handleImageSubmit = (e) => {
    if(files.length>0 && files.length + formData.imageURLs.length < 7){
      setUploading(true);
      setImageUploadError(false);
        const promises =  [];

        for(let i=0; i<files.length; i++){
          promises.push(storeImage(files[i]));
        }

        Promise.all(promises).then((urls)=>{
          setFormData({...formData, imageURLs: formData.imageURLs.concat(urls)});
          setImageUploadError(false);
          setUploading(false);
        }).catch((err)=>{
          setImageUploadError('Image upload error, please check images before uploading');
          setUploading(false);
        });
    } else if(files.length==0 && files.length + formData.imageURLs.length ==0){
      setImageUploadError("Please upload images");
      setUploading(false);
    }
    else{
      setImageUploadError("upto 6 images allowed per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file)=>{
      return new Promise((resolve, reject)=>{
        const storage = getStorage(app);
        const fileName =new Date().getTime + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          'state_changed',
          (snapshot)=>{
            const progress = (snapshot.bytesTransferred/ snapshot.totalBytes)*100;
            console.log(`Upload is ${progress}% done`);
          },
          (error)=>{
            reject(error);
          },
          ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downlaodURL)=>{
                resolve(downlaodURL);  
            });
          }
        );
      })
  };

  const handleRemoveImage =(index)=>{
    setFormData({
      ...formData,
      imageURLs:formData.imageURLs.filter((url, i)=>i !==index)
    });
  };

  const handleChange =(e)=>{
    if(e.target.id === 'sell' || e.target.id==='rent'){
      setFormData({...formData, type:e.target.id});   
    }
    if(e.target.id === 'parking' || e.target.id==='furnished'){
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked
      })
    }
    if(e.target.id==='state'){
      setFormData({
        ...formData,
        state:e.target.value
      })
    }
    if(e.target.type === 'number' || e.target.type==='text' || e.target.type==='textarea'){
      setFormData({
        ...formData,
        [e.target.id]:e.target.value
      })
    }
  };

  const handleFormSubmit =async (e)=>{
    e.preventDefault();
    try {
      if(formData.imageURLs.length<1){
        return setError('Please upload atleast one Image for cover image')
      }
      setLoading(true);
      setError(false);
      const config ={
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          ...formData,
          userRef:currentUser._id
        })
      }
      const response = await fetch(`/api/listing/edit/${params.listingId}`, config);
      const data = await response.json();
      setLoading(false);
      toaster.addToast("Success", "success", { duration: 4000 });
      navigate(`/listing/${data._id}`);
      if(data.success === false){
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Edit Listing
      </h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            id="name"
            className="border p-3 rounded-lg"
            type="text"
            placeholder="name"
            maxLength="60"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            id="description"
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            id="address"
            className="border p-3 rounded-lg"
            type="text"
            placeholder="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <input
            id="landmark"
            className="border p-3 rounded-lg"
            type="text"
            placeholder="landmark"
            maxLength="40"
            required
            onChange={handleChange}
            value={formData.landmark}
          />
          <input
            id="city"
            className="border p-3 rounded-lg"
            type="text"
            placeholder="city"
            maxLength="30"
            required
            onChange={handleChange}
            value={formData.city}
          />
          <select  onChange={handleChange} className="border p-3 rounded-lg" name="state" id="state">
            <option value="disable" selected disabled>
              state
            </option>
            <optgroup label="States">
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </optgroup>
            <optgroup label="Union Territories">
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli and Daman and Diu">
                Dadra and Nagar Haveli and Daman and Diu
              </option>
              <option value="Delhi">
                Delhi (National Capital Territory of Delhi)
              </option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Lakshadweep">Lakshadweep</option>
            </optgroup>
          </select>
          <div className="flex gap-7 flex-wrap">
            <div className="flex gap-2">
              <input
                required={formData.type!=='rent'}
                type="checkbox"
                id="sell"
                className="w-5 hover:cursor-pointer"
                onChange={handleChange}
                checked={formData.type === 'sell'}
              />
              <label for="sell" className="hover:cursor-pointer">
                Sell
              </label>
            </div>
            <div className="flex gap-2">
              <input
                required={formData.type !== 'sell'}
                type="checkbox"
                id="rent"
                className="w-5 hover:cursor-pointer"
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <label for="rent" className="hover:cursor-pointer">
                Rent
              </label>
            </div>
            <div className="flex gap-2">
              <input
                required
                type="checkbox"
                id="parking"
                className="w-5 hover:cursor-pointer"
                onChange={handleChange}
                checked={formData.parking}
              />
              <label for="parking" className="hover:cursor-pointer">
                Parking Spot
              </label>
            </div>
            <div className="flex gap-2">
              <input
                required
                type="checkbox"
                id="furnished"
                className="w-5 hover:cursor-pointer"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <label for="furnished" className="hover:cursor-pointer">
                Furnished
              </label>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input
                className="p-3 border-gray-300 rounded-lg"
                required
                type="number"
                id="bedrooms"
                min="1"
                max="5"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <label htmlFor="bedrooms">Bed Rooms</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="p-3 border-gray-300 rounded-lg"
                required
                type="number"
                id="bathrooms"
                min="1"
                max="5"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <label htmlFor="bathrooms">Bath Rooms</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="p-3 border-gray-300 rounded-lg w-24"
                required
                type="number"
                id="askingPrice"
                onChange={handleChange}
                value={formData.askingPrice}
              />
              <div className="flex flex-col">
                <label htmlFor="askingprice">Price</label>
                {formData.type==='rent'? <span className="text-xs">(₹ / month)</span>:''}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold ">
            Images:{" "}
            <span className="text-sm text-gray-500 ml-1 font-light">
              The first image will be selected for cover image (max 6 images)
            </span>{" "}
          </p>
          <div className="flex gap-2">
            <input
              className="p-3 border border-gray-300 rounded-lg w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-blue-950 border border-blue-950 rounded-lg uppercase hover:shadow-2xl hover:bg-blue-950 hover:text-white active:opacity-70 transition-all ease disabled:opacity-65"
              disabled={uploading}
            >
              {uploading? 'Uploading': 'upload'}
            </button>
          </div>
          <p className="text-red-700 text-sm font-semibold ml-2">{imageUploadError && imageUploadError }</p>
          {
            formData.imageURLs.length > 0 && formData.imageURLs.map((url, index)=>(
              <div key={url} className="flex justify-between p-3 border border-zinc-300  items-center rounded-lg" >
                <img src={url} alt="listing image" className="w-28 h-25 object-contain rounded-lg"/>
                <button onClick={() => handleRemoveImage(index)} type="button" className="p-2 text-sm text-red-700 border border-red-700 rounded-lg hover:bg-red-700 hover:text-white active:opacity-80">Delete</button>
              </div>
            ))
          }
          <button disabled={loading || uploading} className="tracking-wider p-3 bg-blue-950 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-60">
            {loading? 'creating..':'update listing'}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
