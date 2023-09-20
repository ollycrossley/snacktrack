import Link from "next/link";
import NavBar from "../navbar";
import { useState } from "react";

export default function CreateDriver() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [driverProfile, setDriverProile] = useState({});
  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }
  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }
  function handleUserNameChange(e) {
    setUserName(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handleBusinessNameChange(e) {
    setBusinessName(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handlePasswordConfirmChange(e) {
    setPasswordConfirm(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const driverProfile = {
      firstName,
      lastName,
      email,
      userName,
      businessName,
      password,
    };
    console.log(driverProfile);
  }
  return (
    <>
      <NavBar />
      <br></br>
      <h1>Create Driver</h1>
      <br></br>

      <form>
        <ul>
          <li>
            <label htmlFor="last_input">
              First name
              <input
                type="text"
                name="firstname_input"
                id="firstname_input"
                placeholder="first name"
                value={firstName}
                onChange={handleFirstNameChange}
              ></input>
            </label>
          </li>
          <br></br>
          <li>
            <label htmlFor="lastname_input">
              Last name
              <input
                type="text"
                name="lastname_input"
                id="lastname_input"
                placeholder="last name"
                value={lastName}
                onChange={handleLastNameChange}
              ></input>
            </label>
          </li>
          <br></br>
          <li>
            <label htmlFor="username_input">
              Username
              <input
                type="text"
                name="username_input"
                id="username_input"
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
                id="email_input"
                placeholder="email@business.com"
                value={email}
                onChange={handleEmailChange}
              ></input>
            </label>
          </li>
          <br></br>
          <li>
            <label htmlFor="business_name_input">
              Business type
              <input
                type="text"
                name="business_name_input"
                id="business_name_input"
                placeholder="Jim's Big Breakfast Wraps"
                value={businessName}
                onChange={handleBusinessNameChange}
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
                id="password_input"
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
                id="password_confirm_input"
                placeholder="password"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
              ></input>
            </label>
          </li>
        </ul>

        <button onClick={handleSubmit}>
          <Link href="/createprofile/createbusiness">Submit</Link>{" "}
        </button>
      </form>
    </>
  );
}
