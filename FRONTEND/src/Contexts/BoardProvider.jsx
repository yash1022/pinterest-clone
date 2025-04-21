import { createContext, useContext, useState, useEffect } from 'react';
import api from '../../axiosConfig.js'
import React from 'react'

const BoardContext = createContext();

export  function BoardProvider({children}) {

  const [boards, setBoards] = useState([])
  const [loading, setLoading] = useState(true)
  const [trigger,setTrigger]= useState(false)
  const user = localStorage.getItem('user');
  
  const getBoards = async()=>{
    try{

      const response = await api.get('/features/getboards')
      console.log(response.data)
      setBoards(response.data.boards)
  }
  catch(error)
  {
    console.log(error)
  }
  finally{
    setLoading(false)

  }
}

  useEffect(() => {
     console.log("CONTEXT CALLED");

      getBoards();
   
  }, [user,trigger])

  const values={
    boards,
    setBoards,
    loading,
    setLoading,
    trigger,
    setTrigger



  }
  return (
    <BoardContext.Provider value={values}>
      {children}
    </BoardContext.Provider>
  )
}


export const useBoardContext = () => {
  const useboard= useContext(BoardContext);
  if (!useboard) {
    throw new Error('useBoardContext must be used within a BoardProvider');
  }
  return useboard;


}
