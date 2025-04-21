import React, { useState } from 'react'
import { Heart, Bookmark } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import api from '../../axiosConfig';

export default function Postdetails() {
   
    const loc = useLocation();
    const data = loc.state.src
    const [likeStatus,SetLikeStatus]=useState(data.isLiked);
    const [likes,SetLikes]=useState(data.total_likes)
    
    console.log(data);

    const handleLikes= async()=>{

      SetLikeStatus(prev=>!prev);
      if(likeStatus && likes>0)
      SetLikes(prev=>prev-1);
    else
    {
      SetLikes(prev=>prev+1);
    }


      try{
        
       const response = await api.post(`/features/like/${data._id}`)
       if(response.status===200)
       {
        console.log("LIKES SUCCESSFULLY");
       }
      }
      catch(e)
      {
        console.log("error liking post");
      }

      



    }
    const handleDownload = () => {
      const cloudinaryUrl = data.picturefile;
  const fileName = `${data.captions || "image"}.jpg`;

  // Modify the URL to add fl_attachment:<filename>
  const parts = cloudinaryUrl.split("upload/");
  if (parts.length !== 2) {
    console.error("Invalid Cloudinary URL");
    return;
  }

  const downloadUrl = `${parts[0]}upload/fl_attachment:${encodeURIComponent(fileName)}/${parts[1]}`;

  // Create a hidden anchor element to trigger download
  const anchor = document.createElement("a");
  anchor.href = downloadUrl;
  anchor.download = fileName;
  anchor.target = "_blank"; // open in new tab just in case
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
    };

   
    



  return (
    <div>


    <div className="flex flex md:flex-row p-8  text-white mt-18 mr-20">
      {/* Left Side: Image */}
      <div className="md:w-1/2 flex align-start">
        <img
          src={data.picturefile}
          alt="Post"
          className="rounded-2xl max-w-190 max-h-[80vh] object-cover shadow-xl "
        />
      </div>

      {/* Right Side: Post Info */}
      <div className="md:w-1/2 w-full flex flex-col space-y-6">
        {/* Title */}
        <h1 className="text-3xl font-bold">{data.captions}</h1>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <img
            src={data.ownerInfo[0].profileImage}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover border-2"
          />
          <div>
            <p className="text-lg font-semibold">@{data.ownerInfo[0].username}</p>
            <p className="text-md font-semibold">Followers: {data.ownerInfo[0].total_followers}</p>
           
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 mt-4">
          <button
            onClick={handleLikes}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition ${
            likeStatus ? 'bg-red-600' : 'bg-gray-700'
             }`}
          >
            <Heart size={20} />
            {likes} {likes === 1 ? 'Like' : 'Likes'}
           
          </button>

         <button className='rounded-full flex justify-center items-center border-3 border-gray-500' onClick={handleDownload}>Download</button>
        </div>

        {/* Timestamp */}
        <p className="text-md text-gray-400">

            Posted on- 

        
        {new Date(data.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        
    })}
         
        </p>
        <div className='w-full  h-auto flex flex-wrap gap-x-5 gap-y-5'>
          {data.tags?.map((tag,i)=>(

<div className=" w-auto rounded-full h-10 bg-[#3d3d3d] flex  justify-center items-center border-2 border-white text-sm p-3">
  <p> {tag}</p>

</div>



))



          }




        </div>
      </div>
    </div>




    </div>


  )
}

