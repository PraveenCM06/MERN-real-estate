import React from 'react'

function Search() {
  return (
    <div className="flex flex-col md:flex-row p-2 gap-4 ">
        <div className="p-7 border-2 border-b-slate-300 md:border-2 md:border-r-slate-300 md:border-b-0">
            <form className='flex flex-col gap-4'>
                <div className="flex items-center gap-2">
                    <label className='whitespace-nowrap font-bold text-blue-950'>Search Term: </label>
                    <input className='rounded-lg p-3 w-full border-2 border-slate-100' type="text" id="searchTerm" placeholder='Search..'/>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-bold text-blue-950'>Type: </label>
                    <div className="flex gap-2">
                        <input type="checkbox" id='all' className='w-5'/>
                        <label htmlFor="all">Rent & Sale</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id='rent' className='w-5'/>
                        <label htmlFor="rent">Rent</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id='sale' className='w-5'/>
                        <label htmlFor="sale">Sale</label>
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-bold text-blue-950'>Amenities: </label>
                    <div className="flex gap-2">
                        <input type="checkbox" id='parking' className='w-5'/>
                        <label htmlFor="parking">Parking</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id='furnished' className='w-5'/>
                        <label htmlFor="furnished">Furnished</label>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <label className='font-bold text-blue-950' htmlFor="sort_order">Sort:</label>
                    <select className='boder-2 rounded-lg p-2' name="" id="sort_order">
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                        <option value="hightolow">Price High to Low</option>
                        <option value="lowtohigh">Price Low to High</option>
                    </select>
                </div>
                <button className='bg-blue-950 text-white p-3 rounded-lg uppercase hover:opacity-95 active:translate-y-0.5'>Search</button>
            </form>
        </div>
        <div className="">
            <h1 className='text-3xl font-semibold p-3 text-slate-700 mt-0 md:mt-5'>Listing results:</h1>
        </div>
    </div>
  )
}

export default Search