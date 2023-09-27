import NavBar from "../navbar";

import { useContext, useState } from "react";
import { UserContext } from "@/contexts/user_context";
import { getBusinesses } from "@/api";
import { useRouter } from "next/router";

export default function DriverLogin() {
  const [currentUser, setCurrentUser] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const { activeUser, setActiveUser } = useContext(UserContext);
  const [loginError, setLoginError] = useState("");
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

  function handleSubmit(e) {
    e.preventDefault();

    getBusinesses().then((businesses) => {
      let userFound = false;
      for (const business of businesses) {
        console.log(business, "business");
        if (
          business.username === currentUser &&
          business.password === currentPassword
        ) {
          console.log(business);
          setActiveUser(business);
          window.localStorage.setItem("user", JSON.stringify(business));
          router.push("/map");
        }
      }
      if (!userFound) {
        setLoginError(
          "Invalid username or password, please check your details and try again"
        );
      }
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
      <h1 className="has-text-centered title">Driver Login</h1>
      <br></br>
      <div className="columns is-centered">
        <div className="column is-one-third">
          <form className="box p-5">
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
                  value={currentUser}
                  onChange={handleUserChange}
                  autoComplete="off"
                ></input>
              </div>
            </div>
            <br></br>

            <div className="field">
              <div className="control">
                <label className="label" htmlFor="password_input">
                  Password
                </label>
                <input
                  className="input"
                  type="password"
                  name="password_input"
                  id="password_input"
                  placeholder="password"
                  value={currentPassword}
                  onChange={handlePasswordChange}
                  autoComplete="off"
                ></input>
              </div>
            </div>
            <br></br>
            <div className="has-text-centered">
              <button className="button is-link" onClick={handleSubmit}>
                Submit
              </button>
              <p className="has-text-centered"> {loginError} </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
