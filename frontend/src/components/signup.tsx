import { ChangeEvent, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { user } from "../type/interface";
import defaultImage from "../assets/Blog_loggo.webp";

function SignUp() {
  let navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<user>({
    first_name: "",
    last_name: "",
    about: "",
    email: "",
    password: "",
    username: "",
    dob: "",
  });
  //navigating to login page
  function navigateLogin() {
    navigate("/Login");
  }

  const handleUserDetails = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
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
      })
        .then((res) => res.json())
        .then((sol) => {
          console.log(sol, "resolution>>>>");
          alert(sol.message);
        })
        .catch((err) => console.log(err, "error>>>"));
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
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          minLength={3}
          required
          onChange={handleUserDetails}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          minLength={3}
          required
          onChange={handleUserDetails}
        />
        <textarea
          name="about"
          placeholder="About"
          minLength={10}
          maxLength={200}
          required
          onChange={handleUserDetails}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleUserDetails}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleUserDetails}
        />

        <input type="date" name="dob" required onChange={handleUserDetails} />

        <button type="submit">Submit</button>
      </form>
      <div>
        <p>
          Already have an account <button onClick={navigateLogin}>Login</button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
