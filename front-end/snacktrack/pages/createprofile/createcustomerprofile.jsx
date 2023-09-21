import NavBar from "../navbar";
import { useState } from "react";
import Link from "next/link";

export default function CreateCustomer() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
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
  let path = "";
  if (password.length !== 0 && password === passwordConfirm) {
    path = "/map";
  } else {
    path = "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(path);
    if (password !== passwordConfirm) {
      setPasswordErrorMsg(
        "The passwords you entered do not match, please check and try again."
      );
    }
    const customerProfile = {
      username: userName,
      email,
      avatar_url: avatarUrl,
      password,
    };
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
        <button onClick={handleSubmit}>
          <Link
            href={{
              //the variable path below is only correct if the password.length !==0 and the password === passwordConfirm
              pathname: `${path}`,
            }}
          >
            Submit
          </Link>
        </button>
        <p>{passwordErrorMsg}</p>
      </form>
    </>
  );
}
