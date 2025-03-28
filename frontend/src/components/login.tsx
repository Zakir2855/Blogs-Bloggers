import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { login } from "../type/interface";
import defaultImage from "../assets/Blog_loggo.webp"
// import "./login.css"

function Login() {
  let navigate = useNavigate();
  const [loginDetails, setDetails] = useState<login>({
    email: "",
    password: "",
  });
  //to signup
  function navigateSignUp(){
    navigate("/SignUp")
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDetails((state:any) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Submitted Details:", loginDetails);
    // axios.post("http://localhost:3001/api/v1/login",loginDetails)
    // .then((res)=>{alert(res.data.message);console.log(res.data)})
    // .catch((err)=>alert(err))
    fetch("http://localhost:3001/api/v1/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, ">>>>>>>>>");
        Cookies.set("userId", data.id);
        navigate("/")
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="login_page">
    <div className="logo_login">
      <img style={{width:"200px",height:"150px"}} src={defaultImage} alt="logo" />
    </div>
    <form onSubmit={handleSubmit} className="login_form">
      <input
        onChange={handleChange}
        type="text"
        name="email"
        placeholder="Email"
      />
      <input
        onChange={handleChange}
        type="password"
        name="password"
        placeholder="Password"
      />
      <button type="submit">Submit</button>
      
    </form>
    <div className="login_page_navigation"><p className="option_para">Don't have an account then <button onClick={navigateSignUp}>SignUp</button></p></div>
    </div>
  );
}

export default Login;
