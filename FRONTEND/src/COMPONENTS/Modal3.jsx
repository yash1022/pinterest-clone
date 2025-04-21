import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import api from '../../axiosConfig';

const Modal3 = ({toggle, collabArray}) => {
  const [username, setUsername] = useState('');
  const [Loading, setLoading] = useState(false);
  const [collaboratorExists, setCollaboratorExists] = useState(false);
  const [currentCollaborator, setCurrentCollaborator] = useState({});
 

  useEffect(()=>{

    setLoading(true)

    setTimeout(async() => {
        if(username!='')
        {
            const response = await api.get(`/features/getCollaborator/${username}`)
            
            if(response.data.exists)
            {
                setCollaboratorExists(true)
                setCurrentCollaborator(response.data.user)


            } 
        }

        else
        {
            setCollaboratorExists(false)
        }

        setLoading(false)
        
    }, 500);




  },[username])


  const handleAdd = async()=>{
    try
    {

        if(collaboratorExists && username!='')
        {

            const response = await api.post(`/features/addCollaborator/${currentCollaborator._id}`)
          
            if(response.status==200)
            {
                collabArray(response.data.collaborators)
                console.log(collabArray)
                username('')
                toggle(false)
                setCollaboratorExists(false)

            }




        }





    }
    catch(e)
    {
        console.log(e)
    }






  }


     

  return (
    <div className="fixed inset-0  bg-opacity-80 flex items-center justify-center z-50 w-auto">
      <div className="bg-black p-6 rounded-2xl w-[90%] max-w-md shadow-lg border border-gray-700">

      <button
          onClick={()=>toggle(false)}
          className=" top-3 right-3 text-gray-400 hover:text-white transition"
        >
          <X size={20} />
        </button>



        <h2 className="text-white text-xl mb-4 font-semibold">Add Collaborator</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
        />

{ (Loading && username.length>0)?(
            <div className="flex items-start   h-10">
                Loading...
            </div>
        ):(  collaboratorExists ? (
          <div className=" text-green-700  rounded mb-4">
            Collaborator exists! You can add them to the board.
          </div>
        ) : ( username.length>0 &&
          <div className=" text-red-700 rounded">
            Username does not exist.
          </div>
        ))
        
        }
        
        
        <div className="flex justify-end">
          <button
            onClick={handleAdd}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal3;
