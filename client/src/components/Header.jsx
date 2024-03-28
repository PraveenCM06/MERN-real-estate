import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
const navigate =useNavigate();
  const handleSubmit =(e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl =urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }
  },[location.search])
  return (
    <header className="bg-transparent backdrop-blur-lg sticky top-0 shadow-md z-[1000]">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
       <Link to='/'> 
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">APEX</span>
          <span className="text-slate-800">REALTORS</span>
        </h1>
        </Link>
        <form onSubmit={handleSubmit} className="bg-slate-100 rounded-lg p-3 flex items-center">
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <button className="">
          <FaSearch className="text-slate-700" />
          </button>
        </form>
        <ul className="flex gap-4">
          <li className="hidden font-medium sm:inline text-slate-800 hover:font-semibold">
            <Link to="/">Home</Link>
          </li>
          <li className="text-slate-800 font-medium hover:font-semibold">
            <Link to="/about">About</Link>
          </li>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.photo}
                alt="profileimg"
              />
            ) : (
              <li className="text-slate-800 font-medium hover:font-semibold">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
