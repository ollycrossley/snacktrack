import Link from "next/link";
import NavBar from "../navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getBusinesses } from "@/api";

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
  const [isUsernameValid, setIsUsernameValid] = useState("");
  const [isEmailValid, setIsEmailValid] = useState("");  const [isPasswordValid, setIsPasswordValid] = useState("");
  const [doPasswordsMatch, setDoPasswordsMatch] = useState("");
  const [buisnessNameValid, setBusinessNameValid] = useState("")
  const [driverUsernames, setDriverUsernames] = useState([]);

  useEffect(() => {
    getBusinesses().then((drivers) => {
      const usernames = drivers.map((driver) =>
        driver.username.toLowerCase()
      );
      setDriverUsernames(usernames);
    });
  }, []);
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleUserNameChange(e) {
    setUserName(e.target.value);
    if (e.target.value.length > 0) {
      if (
        e.target.value.length >= 5 &&
        e.target.value.length < 16 &&
        !driverUsernames.some(
          (username) => username === e.target.value.toLowerCase()
        )
      ) {
        setIsUsernameValid(true);
      } else {
        setIsUsernameValid(false);
      }
    } else {
      setIsUsernameValid("");
    }
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
    if (
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(e.target.value)
    ) {
      setIsEmailValid(true);
    } else if (e.target.value.length === 0) {
      setIsEmailValid("");
    } else {
      setIsEmailValid(false);
    }
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
    if (e.target.value.length > 0) {
      if (e.target.value.length > 7 && e.target.value.length < 21) {
        setIsPasswordValid(true);
      } else {
        setIsPasswordValid(false);
      }
    } else {
      setIsPasswordValid("");
    }
  }
  function handlePasswordConfirmChange(e) {
    setPasswordConfirm(e.target.value);
    if (e.target.value.length > 0) {
      if (e.target.value === password) {
        setDoPasswordsMatch(true);
      } else {
        setDoPasswordsMatch(false);
      }
    } else {
      setDoPasswordsMatch("");
    }
  }
  function handleBusinessNameChange(e) {
    setBusinessName(e.target.value);
    if(e.target.value.length > 0) {
      setBusinessNameValid(true);
    } else {
      setBusinessNameValid("")
    }
  }
  function handleBusiessTypeChange(e) {
    setBusinessType(e.target.value);
  }
  const router = useRouter()
  function handleSubmit(e) {
    
    e.preventDefault();
    router.push({pathname:"/createprofile/createbusiness",  query: {
      owner_name: name,
      email: email,
      username: userName,
      business_name: businessName,
      category: businessType,
      password: password,
    }})
  }
  const isEverythingValid =
    isEmailValid === true &&
    buisnessNameValid === true &&
    isPasswordValid === true &&
    isUsernameValid === true &&
    doPasswordsMatch === true;

  console.log(isEverythingValid);



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
          <form className="box" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="name_input">
                Full Name
              </label>
              <div className="control">
                <input
                  class="input"
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
                  class="input"
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
                  class="input"
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
                  class="input"
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
                class="input"
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
                class="input"
                type="text"
                name="password_confirm_input"
                id="password_confirm_input"
                placeholder="password"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
              ></input>
            </div>

            <button 
            className="button" 
            type={"submit"}
              disabled={!isEverythingValid}
              >
              {/* <Link
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
              > */}
                Submit
              {/* </Link> */}
            </button>
            <p>{passwordErrorMsg}</p>
          </form>
        </div>
      </div>
    </>
  );
}
