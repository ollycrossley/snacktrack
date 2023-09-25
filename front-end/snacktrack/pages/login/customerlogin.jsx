import NavBar from "../navbar";

import { useContext, useState } from "react";
import { UserContext } from "@/contexts/user_context";
import { getCustomers } from "@/api";

export default function CustomerLogin() {
  const [currentUser, setCurrentUser] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const { activeUser, setActiveUser } = useContext(UserContext);
  function handleSubmit(e) {
    e.preventDefault();

    getCustomers().then((customers) => {
      console.log("getcustomers");

      for (const customer of customers) {
        if (
          customer.username === currentUser &&
          customer.password === currentPassword
        ) {
          console.log(customer);
          setActiveUser(customer);
          console.log(activeUser, "active user, customerlogin.jsx");

          window.localStorage.setItem("user", JSON.stringify(customer));
        }
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
      <h1 className="has-text-centered title">Customer Login</h1>
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
                  type="text"
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
