import NavBar from "../navbar";

import { useContext, useState } from "react";
import { UserContext } from "@/contexts/user_context";

export default function DriverLogin() {
  const [currentUser, setCurrentUser] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const { activeUser, setActiveUser } = useContext(UserContext);
  function handleSubmit(e) {
    e.preventDefault();
    /*should send the activeUser obj to database to check username and password are correct and IF they're correct, set the user context to be the active user
     */
    setActiveUser({
      userName: currentUser,
      password: currentPassword,
      isDriver: true,
    });
  }
  function handleUserChange(e) {
    setCurrentUser(e.target.value);
  }
  function handlePasswordChange(e) {
    setCurrentPassword(e.target.value);
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
          <input
            type="text"
            name="username_input"
            id="username_input"
            value={currentUser}
            onChange={handleUserChange}
            autoComplete="off"
          ></input>
        </label>
          <br></br>
        <label htmlFor="password_input">
          Password
          <input
            type="text"
            name="password_input"
            id="password_input"
            value={currentPassword}
            onChange={handlePasswordChange}
            autoComplete="off"
          ></input>
        </label>
        <br></br>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
}
