/*
opening hours input unfinished
submit button unfinished
*/
import NavBar from "../navbar";
import { useState } from "react";

export default function CreateBusiness() {
  const [menu, setMenu] = useState("");
  const [image, setImage] = useState("");
  const [logo, setLogo] = useState(undefined);
  const [phoneNumber, setPhoneNumber] = useState("");
  function handleMenuChange(e) {
    setMenu(e.target.value);
  }
  function handleImageChange(e) {
    setImage(e.target.value);
  }
  function handleLogoChange(e) {
    setLogo(e.target.value);
  }
  function handlePhoneNumberChange(e) {
    setPhoneNumber(e.target.value);
  }
  console.log(menu);
  return (
    <>
      <NavBar />
      <br></br>
      <h1>create business</h1>
      <br></br>
      <form>
        <ul>
          <li>
            <label htmlFor="menu_input">
              Upload Menu
              <input
                type="file"
                name="menu_input"
                id="menu_input"
                //placeholder="https://menu.com"
                value={menu}
                onChange={handleMenuChange}
              ></input>
            </label>
          </li>
          <br></br>
          <li>
            <label htmlFor="image_input">
              Upload a picture of your stall or truck
              <input
                type="file"
                name="image_input"
                id="image_input"
                // placeholder="https://image.com"
                value={image}
                onChange={handleImageChange}
              ></input>
            </label>
          </li>
          <br></br>

          <li>
            <label htmlFor="logo_input">
              Choose a logo to represent you on the map
            </label>
            <select
              id="logo_input"
              name="logo_input"
              onChange={handleLogoChange}
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
            <label htmlFor="phone_number_input">
              Phone Number
              <input
                type="text"
                name="phone_number_input"
                id="phone_number_input"
                placeholder="0161 123 4567"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              ></input>
            </label>
          </li>
          <br></br>
          <li>
            <label htmlFor="opening_hours_input">
              Opening Hours
              <ul>
                <li>
                  Monday
                  <input></input>
                  <input></input>
                </li>
                <li>
                  Tuesday
                  <input></input>
                  <input></input>
                </li>
                <li>
                  Wednesday
                  <input></input>
                  <input></input>
                </li>
                <li>
                  Thursday
                  <input></input>
                  <input></input>
                </li>
                <li>
                  Friday
                  <input></input>
                  <input></input>
                </li>
                <li>
                  Saturday
                  <input></input>
                  <input></input>
                </li>
                <li>
                  Sunday
                  <input></input>
                  <input></input>
                </li>
              </ul>
            </label>
          </li>
          <br></br>
        </ul>
        <button>Submit</button>
      </form>
    </>
  );
}
