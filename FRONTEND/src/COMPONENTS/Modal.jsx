import React, { useContext, useState } from 'react'
import LoginForm from './Loginpage'
import SignupForm from './SignupForm'

export default function Modal({currState, setCurrState, children}) {

  const [toggleLogin, setToggleLogin] = useState(true);

  

  

  

  return (
    <div>

    <div className="fixed inset-0  flex items-center justify-center z-[100]">
      <div className="rounded-xl p-6 w-auto h-auto max-w-md">
        <button
          className="absolute top-2 right-3 bg-white text-xl"
          onClick={()=>setCurrState(false)}
        >
          &times;
        </button>

        {
          toggleLogin?<LoginForm toggle={setToggleLogin}></LoginForm>:<SignupForm toggle={setToggleLogin}></SignupForm>
        }
        
     
      </div>
    </div>


      
    </div>
  )
}
