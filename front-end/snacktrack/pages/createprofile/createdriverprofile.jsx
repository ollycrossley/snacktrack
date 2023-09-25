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
  const [businessType, setBusinessType] = useState("");
  const [driverProfile, setDriverProile] = useState({});
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleUserNameChange(e) {
    setUserName(e.target.value);
  }
  function handleBusiessTypeChange(e) {
    setBusinessType(e.target.value);
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
    // if (password !== passwordConfirm) {
    //   alert("the passwords you entered do not match!");
    // }
    if (password !== passwordConfirm) {
      setPasswordErrorMsg(
        "The passwords you entered do not match, please check and try again."
      );
    }
    e.preventDefault();
    driverProfile.owner_name = name;
    driverProfile.email = email;
    driverProfile.username = userName;
    driverProfile.business_name = businessName;
    driverProfile.category = businessType;
    driverProfile.password = password;
  }

  let path = "";
  if (password.length !== 0 && password === passwordConfirm) {
    path = "/createprofile/createbusiness";
  } else {
    path = "";
  }

  return (
    <>
      <NavBar />
      <h1 className="title has-text-centered">Create Driver</h1>
      <div className="columns is-centered">
        <div className="column is-one-third">
          <form className="box">
            <div className="field">
              <label className="label" htmlFor="name_input">
                Full Name
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="name_input"
                  id="name_input"
                  placeholder="full name"
                  value={name}
                  onChange={handleNameChange}
                ></input>
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="username_input">
                Username
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="username_input"
                  id="username_input"
                  placeholder="username"
                  value={userName}
                  onChange={handleUserNameChange}
                ></input>
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="email_input">
                Email
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="email_input"
                  id="email_input"
                  placeholder="email@business.com"
                  value={email}
                  onChange={handleEmailChange}
                ></input>
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="business_name_input">
                Business Name
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="business_name_input"
                  id="business_name_input"
                  placeholder="Jim's Big Breakfast Wraps"
                  value={businessName}
                  onChange={handleBusinessNameChange}
                ></input>
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="business_type_input">
                Choose a logo to represent you on the map
              </label>
            </div>
            <div className="field">
              <div className="select">
                <select
                  id="business_type_input"
                  name="lbusiness_type_input"
                  onChange={handleBusiessTypeChange}
                  value={businessType}
                >
                  <option value="option1">Choose a logo</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                  <option value="option4">Option 4</option>
                  <option value="option5">Option 5</option>
                  <option value="option6">Option 6</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="password_input">
                Password
              </label>
              <input
                className="input"
                type="text"
                name="password_input"
                id="password_input"
                placeholder="password"
                value={password}
                onChange={handlePasswordChange}
              ></input>
            </div>

            <div className="field">
              <label className="label" htmlFor="password_confirm_input">
                Confirm Password
              </label>
              <input
                className="input"
                type="text"
                name="password_confirm_input"
                id="password_confirm_input"
                placeholder="password"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
              ></input>
            </div>

            <button className="button" onClick={handleSubmit}>
              <Link
                href={{
                  //the variable path below is only correct if the password.length !==0 and the password === passwordConfirm
                  pathname: `${path}`,
                  query: {
                    owner_name: name,
                    email: email,
                    username: userName,
                    business_name: businessName,
                    category: businessType,
                    password: password,
                  },
                }}
              >
                Submit
              </Link>
            </button>
            <p>{passwordErrorMsg}</p>
          </form>
        </div>
      </div>
    </>
  );
}
