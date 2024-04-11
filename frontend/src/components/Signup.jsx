import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import axios from "axios";
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from '../utils/ApiRoutes';

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

const toastOptions ={
    position: "bottom-right",
    autoClose:6000,
    pauseOnHover: true,
    draggable:true,
    theme: "dark",
  }

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    //console.log(signupState)
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount = async () => {
    if (!handleValidation()) { // Check for validation errors before sending request
      return;
    }
  
    try {
        // let data=signupState;
        // data={...data,fullName:signupState?.username}
        // console.log(data);
      const response = await axios.post(registerRoute, signupState); // Send POST request
      console.log(response)
      if (response.data.success) {
        // Handle successful registration (e.g., redirect to login page, show success message)
        toast.success("Account created successfully!", toastOptions);
        // Redirect or handle success here
      } else {
        // Handle registration errors (e.g., show error message)
        toast.error(response.data.message || "Registration failed.", toastOptions);
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("An error occurred. Please try again later.", toastOptions);
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email} = signupState;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>
        <ToastContainer/>
      </form>
      
    )
}