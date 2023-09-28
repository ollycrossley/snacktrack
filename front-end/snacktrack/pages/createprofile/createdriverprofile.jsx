import Link from "next/link";
import NavBar from "../navbar";
import {useState, useEffect, useContext} from "react";
import { useRouter } from "next/router";
import { getBusinesses } from "@/api";
import { UserContext} from "@/contexts/user_context";

export default function CreateDriver() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [businessType, setBusinessType] = useState("Alcohol");
  const [driverProfile, setDriverProile] = useState({});
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [isNameValid, setIsNameValid] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState("");
  const [isEmailValid, setIsEmailValid] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState("");
  const [doPasswordsMatch, setDoPasswordsMatch] = useState("");
  const [buisnessNameValid, setBusinessNameValid] = useState("");
  const [driverUsernames, setDriverUsernames] = useState([]);
  const [otherBusinessCategory, setOtherBusinessCategory] = useState("");
  const {activeUser, setActiveUser} = useContext(UserContext)
  const router = useRouter();

  if (activeUser) {
    router.push("/map")
  }

  if (activeUser) {
    return (<>
      <NavBar/>
      <br/><br/>
      <h1 className={"title has-text-centered"}>Already logged in! Redirecting...</h1>
    </>)
  }

  useEffect(() => {
    getBusinesses().then((drivers) => {
      const usernames = drivers.map((driver) => driver.username.toLowerCase());
      setDriverUsernames(usernames);
    });
  }, []);
  function handleNameChange(e) {
    setName(e.target.value);
    if (e.target.value.length > 0) {
      setIsNameValid(true);
    } else {
      setIsNameValid("");
    }
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
    if (e.target.value.length > 0) {
      setBusinessNameValid(true);
    } else {
      setBusinessNameValid("");
    }
  }
  function handleBusiessTypeChange(e) {
    setBusinessType(e.target.value);
  }

  function handleOtherBusinessCategory(e) {
    setOtherBusinessCategory(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let category;
    if (businessType === "Other") {
      category = otherBusinessCategory;
    } else {
      category = businessType;
    }
    router.push({
      pathname: "/createprofile/createbusiness",
      query: {
        owner_name: name,
        email: email,
        username: userName,
        business_name: businessName,
        category,
        password: password,
      },
    });
  }
  const isEverythingValid =
    isNameValid === true &&
    isEmailValid === true &&
    buisnessNameValid === true &&
    isPasswordValid === true &&
    isUsernameValid === true &&
    doPasswordsMatch === true;

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
                  className="input"
                  type="text"
                  name="name_input"
                  id="name_input"
                  placeholder="full name"
                  value={name}
                  onChange={handleNameChange}
                ></input>
                {isNameValid === "" ? <p>Please enter a name</p> : null}
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
                {isUsernameValid === false ? (
                  <p>
                    Username must not already exist in the database and be
                    between 5 and 15 characters long
                  </p>
                ) : null}
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
                {isEmailValid === false ? (
                  <p>Please enter a valid email</p>
                ) : null}
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
                {buisnessNameValid === "" ? <p>Please enter a name</p> : null}
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="business_type_input">
                Select your business category
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
                  <optgroup label="Drinks">
                    <option value="Alcohol">Alcohol</option>
                    <option value="Tea/Coffee">Coffee</option>
                    <option value="Other Soft Drinks">Other</option>
                  </optgroup>
                  <optgroup label="Food">
                    <option value="Burgers">Burgers</option>
                    <option value="Cakes">Cakes</option>
                    <option value="Chinese Food">Chinese Food</option>
                    <option value="Doughnuts">Doughnuts</option>
                    <option value="Hot Dogs">Hot Dogs</option>
                    <option value="Ice Cream">Ice Cream</option>
                    <option value="Indian Food">Indian Food</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Street Food">Street Food</option>
                    <option value="Spanish Food">Spanish Food</option>
                  </optgroup>
                  <optgroup label="Other">
                    <option value="Gifts">Gifts</option>
                    <option value="Other">Other</option>
                  </optgroup>
                </select>
                {businessType === "Other" ? (
                  <input
                    className="input"
                    type="text"
                    placeholder="Business Category"
                    onChange={handleOtherBusinessCategory}
                    value={otherBusinessCategory}
                  ></input>
                ) : null}
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="password_input">
                Password
              </label>
              <input
                className="input"
                type="password"
                name="password_input"
                id="password_input"
                placeholder="password"
                value={password}
                onChange={handlePasswordChange}
              ></input>
              {isPasswordValid === false ? (
                <p>Password must be between 8 and 20 characters long</p>
              ) : null}
            </div>

            <div className="field">
              <label className="label" htmlFor="password_confirm_input">
                Confirm Password
              </label>
              <input
                className="input"
                type="password"
                name="password_confirm_input"
                id="password_confirm_input"
                placeholder="password"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
              ></input>
              {doPasswordsMatch === false ? <p>Passwords must match</p> : null}
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
