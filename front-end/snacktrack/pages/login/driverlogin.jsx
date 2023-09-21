import NavBar from "../navbar";

import { useContext, useState } from "react";
import { UserContext } from "@/contexts/user_context";

export default function DriverLogin() {
  const [currentUser, setCurrentUser] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const { activeUser, setActiveUser } = useContext(UserContext);
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <NavBar />
      <br></br>
      <h1>Driver Login</h1>
      <br></br>

      <form>
        <label htmlFor="username_input">
          Username
          <input type="text" name="username_input" id="username_input"></input>
        </label>

        <label htmlFor="password_input">
          Password
          <input type="text" name="password_input" id="password_input"></input>
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
}
