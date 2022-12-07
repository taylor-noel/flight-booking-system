import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import axios from "axios";

function RegisterAdminPage() {
  const [authorize, setAuthorize] = useState(false);
  const [email, setEmail] = useState({ value: "" });
  const [password, setPassword] = useState({ value: "" });

  const navigate = useNavigate();

  function handleEmail(event: any) {
    event.preventDefault();
    setEmail({ value: event.target.value });
  }
  function handlePassword(event: any) {
    event.preventDefault();

    setPassword({ value: event.target.value });
  }
  function handleSubmit(event: any) {
    event.preventDefault();
    setAuthorize(false);

    axios.get("http://127.0.0.1:8000/getAdminEmails").then((response) => {
      const emails: string[] = [];
      response.data.forEach((x: { [x: string]: any }) => {
        emails.push(x["email"]);
      });
      if (emails.includes(email.value)) {
        setAuthorize(true);
      }
    });

    //TODO: needs to be checked!
    if (password.value !== "" && email.value !== "" && !authorize) {
      const url =
        "http://127.0.0.1:8000/createAdmin?emails=" +
        email.value +
        "&password=" +
        password.value;
      axios.put(url).then((response) => {
        navigate("/login");
      });
    }
  }

  return (
    <div className="loginPage">
      <Header showLogin={false} />
      <form className="loginForm">
        <label className="title">Register as an Admin</label>
        <label>Email Address</label>
        <input
          type="email"
          value={email.value}
          placeholder="Enter email"
          onChange={handleEmail}
        />
        <label>Password</label>
        <input
          type="password"
          value={password.value}
          placeholder="Enter password"
          onChange={handlePassword}
        />
        <button onClick={handleSubmit}>Submit</button>
        {authorize ? (
          <label>Error: There is already an account with that email.</label>
        ) : null}
      </form>
    </div>
  );
}
export default RegisterAdminPage;
