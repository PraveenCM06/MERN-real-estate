import React from 'react'

function OAuth() {
    const handleGoogleClick = async ()=>{
        try {
            
            
        } catch (error) {
            console.log("Could not sign in with Google", error);
        }
    }

  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Continue With Google</button>
  )
}

export default OAuth