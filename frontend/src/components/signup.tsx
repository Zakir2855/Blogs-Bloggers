import { ChangeEvent, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { user } from "../type/interface";
import defaultImage from "../assets/Blog_loggo.webp"

function SignUp() {
  let navigate=useNavigate();
  const [userDetails, setUserDetails] = useState<user>({
    first_name: "",
    last_name: "",
    about: "",
    email: "",
    password: "",
    username: "",
    dob: "",
    phoneNumber: "",
    communication_address: {
      address_1: "",
      address_2: "",
      country: "INDIA",
      phone_number_country_code: "+91",
      state: "",
    },
  });
//navigating to login page
function navigateLogin(){
  navigate("/Login")
}
  
  const handleUserDetails = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleAddressChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      communication_address: {
        ...prev.communication_address,
        [name]: value,
      },
    }));
  };

  //  form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify(userDetails));

    try {
       fetch("http://localhost:3001/api/v1/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      }).then((res)=>res.json())
      .then((sol)=>{
        console.log(sol,"resolution>>>>");
        alert(sol.message);
      })
      .catch((err)=>console.log(err,"error>>>"));

    
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="signup_page">
      <div className="signup_logo">
        <img src={defaultImage} alt="" />
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="first_name" placeholder="First Name" minLength={3} required onChange={handleUserDetails} />
        <input type="text" name="last_name" placeholder="Last Name" minLength={3} required onChange={handleUserDetails} />
        <textarea name="about" placeholder="About" minLength={10} maxLength={200} required onChange={handleUserDetails} />
        <input type="email" name="email" placeholder="Email" required onChange={handleUserDetails} />
        <input type="password" name="password" placeholder="Password" required onChange={handleUserDetails} />
        <input type="text" name="username" placeholder="Username" minLength={3} required onChange={handleUserDetails} />

        <select name="role" onChange={handleUserDetails}>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="QA-TESTER">QA Tester</option>
          <option value="CONTENT_WRITTER">Content Writer</option>
        </select>

        <input type="date" name="dob" required onChange={handleUserDetails} />
        <input type="text" name="phoneNumber" placeholder="Phone Number" required onChange={handleUserDetails} />

        {/* address+++++++++ */}
        <input type="text" name="address_1" placeholder="Address Line 1" required onChange={handleAddressChange} />
        <input type="text" name="address_2" placeholder="Address Line 2" required onChange={handleAddressChange} />
        <select name="country" onChange={handleAddressChange}>
          <option value="INDIA">India</option>
          <option value="US">United States</option>
          <option value="AUSTRALIA">Australia</option>
        </select>

        {/* country code +++++++++++++ */}
        <input type="text" name="phone_number_country_code" placeholder="Country Code" value={userDetails.communication_address.phone_number_country_code} readOnly />

        <input type="text" name="state" placeholder="State" required onChange={handleAddressChange} />

        <button type="submit">Submit</button>
      </form>
      <div><p>Already have an account <button onClick={navigateLogin}>Login</button></p></div>
    </div>
  );
}

export default SignUp;
