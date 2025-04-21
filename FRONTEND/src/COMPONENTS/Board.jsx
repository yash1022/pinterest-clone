import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react'; // Icon
import Masonry from 'react-masonry-css'; // npm i react-masonry-css
import { useLocation, useNavigate } from 'react-router-dom';
import Modal3 from './Modal3';

const Board = ({ board }) => {


const [toggle, setToggle] = useState(false)
const [collabArray, setCollabArray] = useState([])
const loc = useLocation();
const data = loc.state.board
const nav= useNavigate();

console.log(data)

useEffect(() => {
    if (data?.collaborators) {
      setCollabArray(data.collaborators);
      
    }
  }, [data?.collaborators]);


  return (
    <div className="p-6 relative mt-20">
      {/* Board Name */}
      <h1 className="text-3xl font-bold">{data.name}</h1>

      {/* Pin Count */}
      <p className="text-gray-500 text-sm mt-1">{data.images? data.images.length:0} Pins</p>
      <p className="text-gray-500 text-sm mt-1">Owner: {data.owner.username}</p>


      {/* Collaborators */}
      <div className="flex  space-x-2 mt-5">
        {collabArray?.map((user, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <img
              src={user?.profileImage|| '/default-avatar.png'}
              className="w-10 h-10 rounded-full border-2 border-white shadow-md"
            />
            <p className="text-sm text-gray-500 mt-1">{user?.username || 'Unknown'}</p>
          </div>
        ))}
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold text-gray-700"
        onClick={()=>setToggle(true)}>
          +
        </button>
      </div>

      {/* Masonry Grid */}
          <div className="mt-8 w-full">
              {!toggle ? (<Masonry
                  breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
                  className="flex gap-4"
                  columnClassName="masonry-column"
              >
                  {data.images ? (data.images.map((post, idx) => (
                      <div key={idx} className="mb-4">
                          <img
                              src={post.picturefile}
                              alt="Post"
                              className="rounded-lg w-full"
                          />
                      </div>)
                  )) : (<div className='flex justify-center align-center w-300'>No images yet. add some!</div>)}
              </Masonry>
              ) : (<Modal3 toggle={setToggle} collabArray={setCollabArray}></Modal3>)}
            </div>
       
        
    

      {/* Floating Plus Button */}
      <button className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition" onClick={()=> nav('/create',{state:{boardId:data._id}})}>
        <Plus size={24} />
      </button>
    </div>
  );
};

export default Board;
