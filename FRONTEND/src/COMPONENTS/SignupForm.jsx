import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../../axiosConfig';

const SignupForm = ({toggle}) => {

    const [userdata, setUserData]= useState({
        name:'',
        username:'',
        email:'',
        password:'',
        profile_pic:'',
    })


    const handleChange=(event)=>{
        const {name, value}= event.target;


        setUserData(prev=>({
            ...prev,
            [name]:value
        })
     ) 




    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

         if(userdata.name==='' || userdata.username==='' || userdata.email==='' || userdata.password==='') return;

         try{

         

            const formData = new FormData();
            formData.append('name', userdata.name);
            formData.append('username', userdata.username);
            formData.append('email', userdata.email);
            formData.append('password', userdata.password);
            formData.append('profileImage', userdata.profile_pic.name);

            

            

            const response = await api.post('/auth/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);

            alert("signed up successfully")


          





         }
         catch(e)
         {
            console.log("ERROR OCCURED");
            alert("Error signing up")
         }



    }

  
 
  return (
    <StyledWrapper>
      <div className="form-container">
        <p className="title">Signup</p>
        <form className="form" onSubmit={handleSubmit} >
          <div className="input-group">
            <label htmlFor="username">Name</label>
            <input type="text" name="name" id="name" value={userdata.name} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" value={userdata.username} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="username">Email</label>
            <input type="text" name="email" id="email" value={userdata.email}  onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={userdata.password} onChange={handleChange}/>
            
          </div>

                  <div className="input-group">
                      <label htmlFor="profile_pic">Profile Picture</label>
                      <input
                          type="file"
                          name="profile_pic"
                          id="profile_pic"
                          accept="image/*"
                         
                          onChange={(e) =>
                              setUserData((prev) => ({
                                  ...prev,
                                  profile_pic: e.target.files[0], 
                              }))
                          }
                      />
                  </div>


          <button className="sign" type='submit'>Sign up</button>
          <p className="signup">Already have an account?
          <a rel="noopener noreferrer" onClick={()=>toggle(true)} className>Sign up</a>
        </p>
        </form>
       
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form-container {
    width: 390px;
    border-radius: 0.75rem;
    background-color: rgba(17, 24, 39, 1);
    padding: 2rem;
    color: rgba(243, 244, 246, 1);
  }

  .title {
    text-align: center;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
  }

  .form {
    margin-top: 1.5rem;
  }

  .input-group {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .input-group label {
    display: block;
    color: rgba(156, 163, 175, 1);
    margin-bottom: 4px;
  }

  .input-group input {
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid rgba(55, 65, 81, 1);
    outline: 0;
    background-color: rgba(17, 24, 39, 1);
    padding: 0.75rem 1rem;
    color: rgba(243, 244, 246, 1);
  }

  .input-group input:focus {
    border-color: rgba(167, 139, 250);
  }

  .forgot {
    display: flex;
    justify-content: flex-end;
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgba(156, 163, 175,1);
    margin: 8px 0 14px 0;
  }

  .forgot a,.signup a {
    color: rgba(243, 244, 246, 1);
    text-decoration: none;
    font-size: 14px;
  }

  .forgot a:hover, .signup a:hover {
    text-decoration: underline rgba(167, 139, 250, 1);
  }

  .sign {
    display: block;
    width: 100%;
    background-color: rgba(167, 139, 250, 1);
    padding: 0.75rem;
    text-align: center;
    color: rgba(17, 24, 39, 1);
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
  }

  .social-message {
    display: flex;
    align-items: center;
    padding-top: 1rem;
  }

  .line {
    height: 1px;
    flex: 1 1 0%;
    background-color: rgba(55, 65, 81, 1);
  }

  .social-message .message {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: rgba(156, 163, 175, 1);
  }

  .social-icons {
    display: flex;
    justify-content: center;
  }

  .social-icons .icon {
    border-radius: 0.125rem;
    padding: 0.75rem;
    border: none;
    background-color: transparent;
    margin-left: 8px;
  }

  .social-icons .icon svg {
    height: 1.25rem;
    width: 1.25rem;
    fill: #fff;
  }

  .signup {
    text-align: center;
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgba(156, 163, 175, 1);
  }`;

export default SignupForm;
