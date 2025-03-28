import { BrowserRouter, Route, Routes } from "react-router-dom";
import Private from "./private";
import DashBoard from "../main/dashBoard";
import React from "react";
import { ProfilePage } from "../profile/profile";
import SignUp from "../components/signup";
import Login from "../components/login";
import BlogCreator from "../main/createblog";

function Routing({children}: React.PropsWithChildren<{}>){
    return(
        <BrowserRouter>
        {children}
        <Routes>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Private><DashBoard/></Private>}/>
            <Route path="/profile" element={<Private><ProfilePage/></Private>}/>
            <Route path="/createBlog" element={<Private><BlogCreator/></Private>}/>

        </Routes>
        </BrowserRouter>
    )
}
export default Routing;