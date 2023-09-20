import Link from "next/link";
import NavBar from "../navbar";
import { useState } from "react";

export default function CreateDriver() {
    const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [businessType, setBusinessType] = useState("")
  const [driverProfile, setDriverProile] = useState({});
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleUserNameChange(e) {
    setUserName(e.target.value);
  }
  function handleBusiessTypeChange(e){
    setBusinessType(e.target.value)
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
      driverProfile.owner_name = name
      driverProfile.email = email
      driverProfile.username = userName
      driverProfile.business_name= businessName 
      driverProfile.category = businessType
      driverProfile.password = password
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
            <label htmlFor="name_input">
              Full Name
              <input
                type="text"
                name="name_input"
                id="name_input"
                placeholder="full name"
                value={name}
                onChange={handleNameChange}
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
              Business Name
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
            <label htmlFor="business_type_input">
              Choose a logo to represent you on the map
            </label>
            <select
              id="business_type_input"
              name="lbusiness_type_input"
              onChange={handleBusiessTypeChange}
              value={businessType}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
              <option value="option5">Option 5</option>
              <option value="option6">Option 6</option>
            </select>
          </li>
          <br></br>
          <li>
            <label htmlFor="password_input">
              Password
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
          <Link href={{pathname: "/createprofile/createbusiness",
          query: { owner_name : name,
            email : email,
            username : userName,
            business_name: businessName,
            category : businessType,
            password : password}
         }}
  >Submit</Link>
        </button>
      </form>
    </>
  );
}
