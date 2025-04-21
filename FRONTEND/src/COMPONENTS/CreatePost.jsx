
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "./Button";
import Loader from "./Loader";
import api from "../../axiosConfig";



const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags]= useState([]);
  const [loading,setloading]= useState(false)
  const[input,showInput]=useState(false);
  const[myTags, setMyTags]= useState('')
  const[aux,setAux]=useState([])



 
  const loc = useLocation()
  const data = loc.state
  const boardId=data? data.boardId:null
  console.log(data)

  const handleSubmit = async(e) => {
    e.preventDefault();


   if(!tags)
   {
    alert("One tag is required")
    return
   }

   if(!image)
   {
    alert("image is required")
   }
   

    const formData = new FormData();
    formData.append("pictureFile",image);
    formData.append("captions",title);
    formData.append("boardId",boardId);
    formData.append("tags",tags);
    

   

    try
    {

       

        const result = await api.post('/features/post',formData)
       
        
            alert("Post created successfully")

    }

    catch(e)
    {
      console.log(e)
    }
    

   
  };

  const handleGenerateTags=async()=>{

    if(!image)
    {
      console.log("No image is uploaded")
      return;
    }

    try{
      setloading(true);
      const formData = new FormData()
      formData.append('image',image)
 
      const response = await api.post('/features/generateTags',formData)
     

      if(response.status==200)
      {
         console.log(response.data)
         const temp =response.data.tags.map(x=>x.label)
        
         setTags(temp)
         setloading(false);
      }

      else
      {
        console.log("Failed to generate tags")
        setloading(false)
      }




    }
    catch(e)
    {
      console.error("failed to get tags",e);
      setloading(false)
    }




  }


  const AddTags= async()=>{
    showInput(true);
    
  }

  const handleAdd=()=>{
    const tagsArray = myTags.split(" ");
    setTags(tagsArray);
    setMyTags('')
    showInput(false);


  }

  


 

  return (
    <div className="p-9  max-w-xl mx-auto mt-20 ml-130">
      <h2 className="text-5xl font-semibold text-left mb-6">Create Post</h2>

      <form  className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter title"
          className="border border-gray-300 p-2 rounded-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="border border-gray-300 p-2 rounded-full"
          onChange={(e) => setImage(e.target.files[0])}
        />

        


      </form>
      <div className="flex flex-wrap gap-4 mt-5">
          <div className="h-auto w-auto" onClick={handleGenerateTags}>
         <Button></Button>

          </div>
         <button className="rounded-full  bg-[#3d3d3d] h-8.5 text-sm flex items-center justify-center px-4 border-2 border-gray-500 " onClick={AddTags}>Add your own</button>
          
           {input?( <div className="flex gap-5">
              <input
              type="text"
              placeholder="Enter space seperated tags"
              className="border border-gray-300 p-2 rounded-full"
              value={myTags}
              onChange={(e) => setMyTags(e.target.value)}
            />

            <button className="rounded-full border-2 border-gray-500 bg-[#37393b]" onClick={handleAdd}>Add</button>

          </div>)
           
           

          :(null)

          } 
         

        </div>
        <button
         
          className="bg-[#37393b] text-white py-2 px-4 rounded-full mt-4  border-2 border-gray-500 w-full"
          onClick={handleSubmit}
        >
          Upload Post
        </button>

      <div className="w-full h-auto  mt-10 flex flex-wrap  gap-x-5 gap-y-5">
        {!loading?(tags?.map((tag,i)=>(
          
          <div className=" w-auto rounded-full h-10 bg-[#3d3d3d] flex  justify-center items-center border-2 border-white text-sm p-3">
           <p> {tag}</p> 

          </div>
          
          
         



        ))):(<div className="ml-50"><Loader></Loader> <p className="text-sm mt-3 ml-1 text-gray-400">Generating..</p></div>)

        }

        {
          tags.length!=0?(<button className="rounded-full  border-2 border-gray-500 bg-[#37393b] w-auto h-10 flex justify-center items-center" onClick={()=> setTags([])}>Clear All</button>):(null)
        }

      </div>
     
    </div>
  );
};

export default CreatePost;