
import { Home, Compass, PlusCircle, Settings,Bell } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../axiosConfig";
import Modal2 from "./Modal2";
import { useNavigate } from "react-router-dom";
import { useBoardContext } from "../Contexts/BoardProvider";
const Profilepage = () => {

    const [user, setUser] = useState({})
    const [toggle, setToggle] = useState(false)
    const [posts,setPosts]= useState([])
    const [savedPosts,setSavedPosts]=useState([])
    
    const [togglePins, setTogglePins]= useState(true)   // SHOW YOUR PINS BY DEFAULT
   

    const nav= useNavigate();
    const { boards, loading, trigger,setTrigger } = useBoardContext();



  useEffect(() => {

   
    console.log("useeffect called");
    fetchUserData()


  },[])


   

    const fetchUserData = async()=>{

      

        try{

            const result = await api.get('/features/profile')
            console.log(result)
          
            setUser(result.data)
            setPosts(result.data.posts)
            setSavedPosts(result.data.savedPosts);
            


        }
        catch(e)
        {
            console.log(e)
        }



    }

    const handleDelete= async(postId)=>{

      const temp = posts.filter(post=>post._id!=postId);
      setPosts(temp);

      try{
        const result= await api.delete(`/features/delete/${postId}`)
        if(result.status==200)
        {
          console.log("deleted successfully");
        }

        else
        {
          console.log("error deleting");
        }
      }
      catch(e)
      {
        console.error(e);
      }

    }

    const handleUnsave= async(postId)=>{

      const temp = savedPosts.filter(post=>post._id!=postId);
      setSavedPosts(temp);

      try{

        const result =  await api.delete(`/features/unsave/${postId}`);
        console.log(result)
        if(result.status==200)
        {
          console.log("Unsaved successfully");
        }

      else{
          console.log("Error unsaving");
        }

      }
      catch(e){
        console.error(e);

      }



    }
 
    
    return (
      <>
        <div className="flex justify-between mt-20 p-6 text-white items-start relative max-h-[200px]">
          {/* Left: Profile Info */}




          <div className="flex items-center space-x-8">
            {/* Profile Image */}
            <img
              src={user.profileImage}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover"
            />
  
            <div>
              {/* Username */}
              <h2 className="text-2xl font-bold">@{user.username}</h2>
  
              {/* Full Name */}
              <p className="text-lg text-gray-300">{user.fullname}</p>
  
              {/* Followers */}
              <p className="text-sm text-gray-400 mt-1">
                {user.total_followers} followers . {user.total_following} following
              </p>
            </div>
          </div>

          {toggle && <Modal2 setShowModal={setToggle} trigger={trigger} setTrigger={setTrigger}></Modal2>}
  
          {/* Right Side Box */}
          <div className=" p-4 rounded-lg w-160 h-auto items-center flex flex-col">
            <div className="flex items-center justify-center rounded-full border-3 border-gray-500 w-30 h-auto">

            <h3 className="text-lg font-semibold ">Boards</h3>

            </div>

            <div className="flex items-startmt-4 mr-10 w-full">

            <SidebarIcon icon={<PlusCircle size={28} color="white" onClick={()=>setToggle(true)}/>} />
            <p className="mt-3">Add new board</p>
            </div>

                   
            {boards?.length > 0 ? (

              boards.map((board, i) => (
                <div
                  key={i}
                  className="w-160 h-90 aspect-square bg-[#3d3d3d] rounded-xl flex items-center justify-center text-white text-sm border-3 relative mt-5"
                  onClick={() => nav('/board', { state: { board } })}
                >
                  <img src={board.coverimage} className="rounded-xl blur-sm absolute inset-0 w-full h-full object-cover"></img>
                  <h2 className="text-6xl font-bold text-white z-9 absolute top-2 left-2 ">{board.name}</h2>
                </div>
              ))
            ) : (
              <p>No boards yet. Create one!</p>
            )}

           
          </div>

        </div>

        
        <div className=" w-185 text-white items-center flex flex-col mt-5 ml-4">
          <div className="flex gap-3 mb-3">
          <button className={`rounded-full  bg-[#3d3d3d]  ${togglePins? "border-3 border-white":""} `} onClick={()=>setTogglePins(true)}>Your pins</button>
          <button className={`rounded-full  bg-[#3d3d3d]  ${!togglePins? "border-3 border-white":""} `} onClick={()=>setTogglePins(false)}>Saved pins</button>

          </div>
        


          {/* {MANSORY GRID} */}

          <div className="columns-3 sm:columns-2 md:columns-3 lg:columns-2 gap-5 space-y-4 mt-2">
          { togglePins?(posts?.map((img, index) => (
            <div className=" relative group">
            <img
              key={index}
              src={img.picturefile}
             
              className=" rounded-lg mb-4 break-inside-avoid"
            />

              <div className="absolute top-1 mt-1 mr-1 right-1">
                <div className="relative">
                  <button
                    className="p-2 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 shadow-md border-0 " onClick={()=>handleDelete(img._id)}

                  >
                    Delete
                  </button>
                </div>
              </div>



            </div>
          ))):(savedPosts?.map((img,index)=>(
            <div className=" relative group">
              <img
                key={index}
                src={img.picturefile}

                className=" rounded-lg mb-4 break-inside-avoid"
              />
              <div className="absolute top-1 mt-1 mr-1 right-1">
                <div className="relative">
                  <button
                    className="p-2 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 shadow-md border-0"
                     onClick={()=>handleUnsave(img._id)}
                  >
                    Unsave
                  </button>
                </div>
              </div>
            </div>

          )))}
          </div>
        </div>
  
       
      </>
    );
  };

  const SidebarIcon = ({ icon }) => {
    return (
      <div className="p-3 rounded-lg  cursor-pointer">
        {icon}
      </div>
    );
  };
  
  export default Profilepage;