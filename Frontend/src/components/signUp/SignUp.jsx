import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "../../config/urlConfig";
import LandNavBar from "../landingNavBar/LandNavBar";
import Footer from "../footer/Footer";
import axios from "axios"
import { context } from "../../context/context";
import "./SignUp.css";

export default function Signup() {
  const [preview, setPreview] = useState("");
  const [showImg,setShowImg]=useState("");
  const navigate=useNavigate()

  
  const {state,dispatch}=useContext(context)
  
   
    const grabImage=(e)=>{ 
    const link = e.target.files[0]
    setPreview(link)

    setShowImg(URL.createObjectURL(link))
  }

  const signupUser = (e) => {
    e.stopPropagation();
    e.preventDefault();
  /*   const user = {
      firstName: e.target.firstname.value,
      lastName: e.target.lastname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    }; */
    const data=new FormData();
    data.append('userImage',preview);
    data.append('firstName',e.target.firstname.value),
    data.append('lastName', e.target.lastname.value),
    data.append('email', e.target.email.value),
    data.append('password',e.target.password.value)
    /* fetch(`${BASE_URL}/api/users/signUp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.errors) {
          console.log(result.errors);
          toast.error(JSON.stringify(result.errors));
        } else {
          e.target.reset();
          toast.success("You successfully signed up!"); // pop-up message
          dispatch({type:"setIsSignUp",payload:true})
          setTimeout(() => {
           navigate("/login");
          }, 1500);
        }
      })
      .catch((err) => console.log(err)); */

      axios.post(`${BASE_URL}/api/users/signUp`, data,{headers:{"Content-Type": "multipart/form-data"}})
      .then((result) => {
        if (result.errors) {
          console.log(result.errors);
          toast.error(JSON.stringify(result.errors));
        } else {
          e.target.reset();
          toast.success("You successfully signed up!"); 
          dispatch({type:"setIsSignUp",payload:true})
          setTimeout(() => {
           navigate("/login");
          }, 1500);
        }
      })
      .catch((err) => console.log(err));
  };


 
  // const uploadFile = (e)=>{
  //   e.stopPropagation()
  //   e.preventDefault()
  //   const data=new FormData()
  //   console.log(preview)
  //   data.append('file',preview);
  //   fetch("http://localhost:5000/api/userimages/uploadImage",
  //   {method:"POST",
  //   // headers:{"content-type":"application/json"},
  //   body:data,
  // })
  //   .then(res => res.json())
  //   .then(result=>console.log(result.okay))
  // };
  
  return (
    <div>
    <div className="signup">
      <div className="left"></div>
      <div className="right">
      <div className="mainDiv">
      <LandNavBar/>
      <h1>Signup</h1>
      <Toaster position="top-center" /> {/* toast position*/}
      
      
      <form onSubmit={signupUser} className="form">
        <label htmlFor="firstname">First Name: </label>
        <input className="inputs" type="text" id="firstname" name="firstname" /> <br />
        <label htmlFor="lastname">Last Name: </label>
        <input className="inputs" type="text" id="lastname" name="lastname" /> <br />
        <label htmlFor="email">Email :</label>
        <input className="inputs" type="email" id="email" name="email" /> <br />
        <label htmlFor="password">Password : </label>
        <input className="inputs" type="password" id="password" name="password" /> <br />
        <div className="second-half">
        <h3>Upload your Image</h3>
        <div class="file-input-container">
        <input type="file" name="file" id="file" onChange={grabImage} />  

        {/* added this extra line of label for the CSS pupose */}
        <label htmlFor="file" className="chooseFile-label">Choose File</label> 
        
        </div>
      <div className="profileImg" >
        <img  src= {showImg} alt=""  width="100%"/>
      </div>
        <button className="signup-btn">SignUp</button>
        </div>
      </form>
      </div>
      </div>
      </div>
      <Footer/>   
    </div>
  );
}

