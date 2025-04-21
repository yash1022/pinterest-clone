import { useState } from 'react';
import api from '../../axiosConfig';
import { Link } from 'react-router-dom';

const TopBar = ({toggleState,Query,SetQuery}) => {

  const user = JSON.parse(localStorage.getItem('user')) 
  const [input,setInput]= useState(''); 
  const handleLogout = () => {
    api.post('/auth/logout')
    .then(() => {
      console.log("Logged out successfully");
    })
    localStorage.removeItem('user'); 
    window.location.reload(); 
  }

  const handleSearch=(e)=>{
    if(e.key==='Enter' && input.trim()!='')
    { const data= input.trim();
      console.log(data)
      setInput('');
      SetQuery(data.toString());
    }


  }



 

 
  
    return (
      <div className="w-full flex items-center justify-between px-4 py-2 bg-[#37393b] top-0 left-0 fixed z-10 border-b-1 border-gray-500">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={handleSearch}
          className="w-full px-3 py-2 text-white bg-gray-700 rounded-lg outline-none placeholder-gray-400 ml-16"
        />
  
        {/* Profile Image */}
        <Link to='/profile'>

        <img
          src={user?.profile_image_url} 
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-gray-500 ml-4"
         />
        
        
        </Link>
        

        <button onClick={()=>{user?handleLogout():toggleState(true)}}>{user?'Logout':'Login'}</button>  
      </div>
    );
  };
  
  export default TopBar;