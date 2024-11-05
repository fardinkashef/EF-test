import { useState } from "react";
import "./Login.scss";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
function Login() {
  // State variables 👇:
  const [email, setEmail] = useState("fardinkashef1397@gmail.com");
  const [password, setPassword] = useState("fardin72");
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  // Handlers 👇:
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/admins/login",

        { email, password }
      );
      // console.log("res", res);
      localStorage.setItem("adminData", JSON.stringify(res.data)); // adminId , email and token
      navigate("/data", { replace: true });
    } catch (error) {
      setErrorMessage(error.errorMessage);
      console.log(error);
    }
  };
  return (
    <div className="Login">
      <p className="message">{location.state}</p>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          placeholder="your-email@gmail.com"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          placeholder="your password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Log in</button>
      </form>
      <p className="errorMessage">{errorMessage}</p>
    </div>
  );
}

export default Login;
