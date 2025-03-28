import axios from "axios";
import Cookies from "js-cookie";
import defaultImage from "../assets/default_blog_img.png";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  let Id = Cookies.get("userId");
  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/getUser/byId/${Id}`).then((res) => {
      console.log(res.data.User);
      setUser(res.data.User);
    });
  }, []);
  //handled log out functionality
  let handleLogOut = () => {
    Cookies.remove("newlettertoken");
    navigate("/login");
  };
  if (!user) {
    return <h1>User Not found, Login Please</h1>;
  }
  return (
    <div className="profile_div">
      <h1 className="profile_header">Profile</h1>
      <div>
        <div className="avatar">
          <img src={user.avatar ? user.avatar : defaultImage} alt="Avatar" />
        </div>
        <h2>
          {user.first_name} {user.last_name}
        </h2>
        <h3>email: {user.email}</h3>
        <h3>Mob: {user.phoneNumber}</h3>
        <h3>CreatedAt: {user.createdAt}</h3>
        <button onClick={handleLogOut}>LogOut</button>
      </div>
    </div>
  );
}
