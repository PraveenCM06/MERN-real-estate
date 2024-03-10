import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

function Header() {
  const {currentUser} = useSelector(state=>state.user);
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>APEX</span>
            <span className='text-slate-800'>REALTORS</span>
        </h1>
        <form className='bg-slate-100 rounded-lg p-3 flex items-center'>
            <input className='bg-transparent focus:outline-none w-24 sm:w-64' type="text" placeholder='Search' />
            <FaSearch className='text-slate-700'/>
        </form>
        <ul className='flex gap-4'>
            <li className='hidden font-medium sm:inline text-slate-800 hover:font-semibold'><Link to='/'>Home</Link></li>
            <li className='text-slate-800 font-medium hover:font-semibold'><Link to='/about'>About</Link></li>
            <Link to="/signin">
              { currentUser ? 
                  (<img className='rounded-full h-7 w-7 object-cover' src={currentUser.photo} alt="profileimg" />) 
                    : 
                  (<li className='text-slate-800 font-medium hover:font-semibold'>Sign in</li>)
              }
            </Link>
        </ul>
        </div>

    </header>
  )
}

export default Header