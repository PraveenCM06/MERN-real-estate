import React from "react";

function CreateListing() {
  return (
    <main className="p-3 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a new Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            id="name"
            className="border p-3 rounded-lg"
            type="text"
            placeholder="name"
            maxLength="60"
            minLength="10"
            required
          />
          <textarea
            id="description"
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Description"
            required
          />
          <input
            id="address"
            className="border p-3 rounded-lg"
            type="text"
            placeholder="address"
            required
          />
          <input
            id="landmark"
            className="border p-3 rounded-lg"
            type="text"
            placeholder="landmark"
            maxLength="20"
            required
          />
          <input
            id="city"
            className="border p-3 rounded-lg"
            type="text"
            placeholder="city"
            maxLength="30"
            required
          />
          <select className="border p-3 rounded-lg" name="state" id="state">
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
              <input required  type="checkbox" id="sell" className="w-5 hover:cursor-pointer"/>
              <label for="sell" className="hover:cursor-pointer">Sell</label>
            </div>
            <div className="flex gap-2"> 
              <input required  type="checkbox" id="rent" className="w-5 hover:cursor-pointer"/>
              <label for="rent" className="hover:cursor-pointer">Rent</label>
            </div>
            <div className="flex gap-2"> 
              <input required type="checkbox" id="parking" className="w-5 hover:cursor-pointer"/>
              <label for="parking" className="hover:cursor-pointer">Parking Spot</label>
            </div>
            <div className="flex gap-2"> 
              <input required type="checkbox" id="furnished" className="w-5 hover:cursor-pointer"/>
              <label for="furnished" className="hover:cursor-pointer">Furnished</label>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input className="p-3 border rounded-lg" required type="number" id="bedrooms" min='1' max='5'/>
              <label htmlFor="bedrooms">Bed Rooms</label>
            </div>
            <div className="flex gap-2 items-center">
              <input className="p-3 border rounded-lg" required type="number" id="bathrooms" min='1' max='5'/>
              <label htmlFor="bathrooms">Bath Rooms</label>
            </div>
            <div className="flex gap-2 items-center">
              <input className="p-3 border rounded-lg w-24" required type="number" id="askingprice"/>
              <div className="flex flex-col">
                <label htmlFor="askingprice">Price</label>
                <span className="text-xs">(₹ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold ">Images: <span className="text-sm text-gray-500 ml-2">The first image will be selected for cover image (max 6 images)</span> </p>
          <div className="flex gap-2">
            <input className="p-3 border border-gray-300 rounded-lg w-full" type="file" id="images" accept="image/*" multiple/>
            <button className="p-3 text-blue-950 border border-blue-950 rounded-lg uppercase hover:shadow-lg disabled:opacity-65">upload</button>
          </div>
        <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-60">Publish Listing</button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
