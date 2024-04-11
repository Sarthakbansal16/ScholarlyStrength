import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from '../utils/ApiRoutes';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

const toastOptions ={
    position: "bottom-right",
    autoClose:6000,
    pauseOnHover: true,
    draggable:true,
    theme: "dark",
  }

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);
     //const [loggedIn, setLoggedIn] = useState(false)
     const navigate = useNavigate();
    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(loginState)
        return authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = async() =>{
        if (!handleValidation()) { // Check for validation errors before sending request
            return;
        }

        try {
            const response = await axios.post(loginRoute,loginState)

            //console.log(response.data)
            if (response.data.success) {
                const { accessToken, refreshToken } = response.data.data;

                // Set cookies for accessToken and refreshToken
                Cookies.set('accessToken', accessToken, { expires: 7, sameSite: 'Lax', secure: true });
                Cookies.set('refreshToken', refreshToken, { expires: 14, sameSite: 'Lax', secure: true });

                toast.success('Logged in successfully!', toastOptions);
                navigate('/Layout'); // Navigate to the appropriate page
            } else {
                toast.error(response.data.message || 'Login failed.', toastOptions);
            }
        } catch (error) {
            console.error("Error while trying to log in into the account:", error);
            toast.error("An error occurred. Please try again later.", toastOptions);
        }  
      
    }


    const handleValidation = () => {
        const { password,username} = loginState;
        if (password === "") {
          toast.error(
            "Email and Password is required",
            toastOptions
          );
          return false;
        }
        else if (username.length === "") {
          toast.error(
            "Email and Password is required",
            toastOptions
          );
          return false;
          }
        return true;
      };    

    return(
          <form className=" space-y-6 " onSubmit={handleSubmit}>
              <div className="space-y-4">
                  {fields.map((field) => (
                      <Input
                          key={field.id}
                          handleChange={handleChange}
                          value={loginState[field.id]}
                          labelText={field.labelText}
                          labelFor={field.labelFor}
                          id={field.id}
                          name={field.name}
                          type={field.type}
                          isRequired={field.isRequired}
                          placeholder={field.placeholder}
                      />
                  ))}
              </div>
  
              <FormExtra />
              <FormAction handleSubmit={handleSubmit} text="Login" />
              <ToastContainer />
          </form>
       
    )
}