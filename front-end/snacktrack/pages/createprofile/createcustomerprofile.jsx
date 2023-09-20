import NavBar from "../navbar";
import { useState } from "react";

export default function CreateCustomer() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const customerProfile = { userName, email, avatarUrl, password };
    console.log(customerProfile);
  }

  function handleUserNameChange(e) {
    setUserName(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handleAvatarUrlChange(e) {
    setAvatarUrl(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handlePasswordConfirmChange(e) {
    setPasswordConfirm(e.target.value);
  }

  return (
    <>
      <NavBar />
      <br></br>
      <h1>Create Customer</h1>
      <br></br>

      <form>
        <ul>
          <li>
            <label htmlFor="username_input">
              Username
              <input
                type="text"
                name="username_input"
                placeholder="username"
                value={userName}
                onChange={handleUserNameChange}
              ></input>
            </label>
          </li>
          <br></br>
          <li>
            <label htmlFor="email_input">
              Email
              <input
                type="text"
                name="email_input"
                placeholder="email"
                value={email}
                onChange={handleEmailChange}
              ></input>
            </label>
          </li>
          <br></br>
          <li>
            <label htmlFor="avatar_input">
              Avatar
              <input
                type="url"
                name="avatar_input"
                placeholder="https://example.com"
                value={avatarUrl}
                onChange={handleAvatarUrlChange}
              ></input>
            </label>
          </li>
          <br></br>
          <li>
            <label htmlFor="password_input">
              Email
              <input
                type="text"
                name="password_input"
                placeholder="password"
                value={password}
                onChange={handlePasswordChange}
              ></input>
            </label>
          </li>
          <br></br>
          <li>
            <label htmlFor="password_confirm_input">
              Confirm Password
              <input
                type="text"
                name="password_confirm_input"
                placeholder="password"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
              ></input>
            </label>
          </li>
        </ul>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
}
