import React, { useEffect } from 'react'
import { useState } from 'react';
import api from '../../axiosConfig';


export default function Modal2({setShowModal,trigger,setTrigger}) {
const [coverImage, setCoverImage]= useState('');
    const [Loading, setLoading]= useState(true);
    const [collaboratorExists, setCollaboratorExists]= useState(false);
    const [Title, setTitle]= useState('');
    const [collaboratorName , setCollaboratorName]= useState('');
    const [collaborator, setCollaborator]= useState([]);
    const [currentCollaborator, setCurrentCollaborator]= useState({});

    useEffect(()=>{

        setLoading(true)

        setTimeout( async () => {
        if(collaboratorName!='')
        {
            const response = await api.get(`/features/getCollaborator/${collaboratorName}`)
            
            if(response.data.exists)
            {
                setCollaboratorExists(true)
             
                setCurrentCollaborator(response.data.user)


            }
            else
            {
                setCollaboratorExists(false)
            }

            setLoading(false)

        }
        
      },2000);



    },[collaboratorName])


    const handleAdd = async()=>{

      try{

        if(collaboratorName.length>0 && collaboratorExists)
        {
          setCollaborator([...collaborator, currentCollaborator])
          setCollaboratorName('')
          setCollaboratorExists(false)
        }






      }
      catch(e)
      {
        console.log(e)
      }










    }


    const handleSave = async()=>{

      if(!Title)
      {
        return ;
      }

      console.log(coverImage)

      

      try{

        const formData = new FormData()
          formData.append("picture",coverImage)
          formData.append('Title', Title)
          formData.append('collaborator', JSON.stringify(collaborator))
          console.log(coverImage)

          const response = await api.post('/features/saveBoard', formData)
          if(response.status===200)
          {
            console.log('Board created successfully')
            setTrigger(!trigger)
            setShowModal(false)
            setCollaborator([])
          }
          else
          {
            console.log('Failed to create board')
          }








      }
      catch(e)
      {
        console.log(e)
      }




    }
  return (

    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-[100] ">
        <div className="bg-black p-6 rounded-2xl w-full max-w-md relative shadow-lg h-160 border-2 border-gray-300 mt-12">

        <button
          className=" bg-black-300 absolute top-3 right-4 text-2xl font-bold "
          onClick={() => setShowModal(false)}
        >
          &times;
        </button>

        
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Board</h2>


        <div className="mb-4">
          <label className="block mb-1 font-medium">Cover Image:</label>
          <input 
            type="file"
            accept="image/*"
            onChange={(e)=> setCoverImage(e.target.files[0])}
           
            className="w-full border rounded px-3 py-2"
          />
        </div>



        <div className="mb-4">
          <label className="block mb-1 font-medium">Board Name</label>
          <input 
            type="text"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter board name"
          />
        </div>


        <div className="mb-3">
          <label className="block mb-1 font-medium">Search Collaborators</label>
          <div className="flex gap-2">
            <input 
              type="text"
              value={collaboratorName}
              onChange={(e) => setCollaboratorName(e.target.value)}
              className="flex-1 border rounded px-3 py-2"
              placeholder="Enter username"
            />
            <button 
              onClick={handleAdd}
              className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>

        { (Loading && collaboratorName.length>0)?(
            <div className="flex items-start   h-10">
                Loading...
            </div>
        ):(  collaboratorExists ? (
          <div className=" text-green-700  rounded mb-4">
            Collaborator exists! You can add them to the board.
          </div>
        ) : ( collaboratorName.length>0 &&
          <div className=" text-red-700 rounded">
            Username does not exist.
          </div>
        ))
        
        }

        {collaborator.length > 0 && (
          <div className="mt-8">
            <p className="mb-2 font-medium mt-4">Added Collaborators:</p>
            <div className="flex gap-3 flex-wrap">
              {collaborator.map((user, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img
                    src={user.profileImage}
                    alt={user.username}
                    className="w-12 h-12 rounded-full border-2 border-white"
                  />
                  <p className="text-xs mt-1">{user.username}</p>
                </div>
              ))}
            </div>
          </div>
        )}


        <div className="flex justify-center mt-30">

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 w-100"
        >
          Save
        </button>


        </div>
        
      




       




        </div>
      
    </div>
  )
}
