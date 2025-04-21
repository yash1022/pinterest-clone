import { useContext, useEffect, useState } from 'react'


import './App.css'
import Sidebar from './COMPONENTS/Sidebar'
import TopBar from './COMPONENTS/Topbar'
import axios from 'axios'
import api from '../axiosConfig';

import Gallery from './COMPONENTS/Gallery'
import ModalContext from '../src/main.jsx'
import Modal from './COMPONENTS/Modal.jsx'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CreatePost from './COMPONENTS/CreatePost.jsx'
import Profilepage from './COMPONENTS/Profilepage.jsx'
import Board from './COMPONENTS/Board.jsx'
import { BoardProvider } from './Contexts/BoardProvider.jsx'
import Postdetails from './COMPONENTS/Postdetails.jsx'





function App() {


  const useModal = useContext(ModalContext)
 

  

  const [images, setImages] = useState([])
  const [Query,SetQuery]=useState(null);
  

  




  useEffect(()=>{

    console.log("useEffect called")
   
    fetchImages()




  },[Query])


  const fetchImages = async()=>{

    if(Query==='')
    {
      SetQuery(null);
    }

    try{

      const response = await api.get(`/features/getposts/${Query}`)
      console.log(response.data)
      setImages(response.data)






    }
    catch(e)
    {
      console.log(e)
    }







  }

  

  
  

  return (
    <BoardProvider>
    
    <div className="flex flex-col h-screen w-screen">
      
      <TopBar toggleState={useModal.setToggleModal} Query={Query} SetQuery={SetQuery}/>

      <div className="flex flex-row h-full overflow-hidden w-full">
       
        <Sidebar SetQuery={SetQuery} />

        {/* Main Content Area */}
        <div className="flex-1 p-1 text-white overflow-y-auto scrollbar-hide w-full ">

          {/* <Gallery images={images}></Gallery> */}

          
            <Routes>
              <Route path="/" element={<Gallery images={images} />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path='/profile' element={<Profilepage></Profilepage>}/>
              <Route path='/board' element={<Board></Board>}></Route>
              
              <Route path='/info' element={<Postdetails></Postdetails>}></Route>
              

            </Routes>


         
         
         
        </div>

       
      </div>

      {useModal.toggleModal && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-[100]">
            <Modal setCurrState={useModal.setToggleModal} />
          </div>
        )}
    </div>
   
   



      
        
    
    </BoardProvider>
  )
}

export default App
