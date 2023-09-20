import { useRouter } from 'next/router'
import NavBar from "../navbar";
import { useState } from "react";

export default function CreateBusiness() {
  const [menu, setMenu] = useState("");
  const [image, setImage] = useState(undefined);
  const [businessBio, setBusinessBio] = useState("");
  const [logo, setLogo] = useState(undefined);
  // const [phoneNumber, setPhoneNumber] = useState("");
  const [mondayOpenTime, setMondayOpenTime] = useState("");
  const [tuesdayOpenTime, setTuesdayOpenTime] = useState("");
  const [wednesdayOpenTime, setWednesdayOpenTime] = useState("");
  const [thursdayOpenTime, setThursdayOpenTime] = useState("");
  const [fridayOpenTime, setFridayOpenTime] = useState("");
  const [saturdayOpenTime, setSaturdayOpenTime] = useState("");
  const [sundayOpenTime, setSundayOpenTime] = useState("");
  const [mondayCloseTime, setMondayCloseTime] = useState("");
  const [tuesdayCloseTime, setTuesdayCloseTime] = useState("");
  const [wednesdayCloseTime, setWednesdayCloseTime] = useState("");
  const [thursdayCloseTime, setThursdayCloseTime] = useState("");
  const [fridayCloseTime, setFridayCloseTime] = useState("");
  const [saturdayCloseTime, setSaturdayCloseTime] = useState("");
  const [sundayCloseTime, setSundayCloseTime] = useState("");
  const router = useRouter();
  const driverProfile = router.query;
  console.log(driverProfile)

  function handleMenuChange(e) {
    setMenu(e.target.value);
  }
  function handleImageChange(e) {
    setImage(e.target.value);
  }
  function handleLogoChange(e) {
    setLogo(e.target.value);
  }
  // function handlePhoneNumberChange(e) {
  //   setPhoneNumber(e.target.value);
  // }
  function handleBusinessBioChange(e) {
    setBusinessBio(e.target.value);
  }
  function handleMondayOpenChange(e) {
    setMondayOpenTime(e.target.value);
  }
  function handleTuesdayOpenChange(e) {
    setTuesdayOpenTime(e.target.value);
  }
  function handleWednedayOpenChange(e) {
    setWednesdayOpenTime(e.target.value);
  }
  function handleThursdayOpenChange(e) {
    setThursdayOpenTime(e.target.value);
  }
  function handleFridayOpenChange(e) {
    setFridayOpenTime(e.target.value);
  }
  function handleSaturdayOpenChange(e) {
    setSaturdayOpenTime(e.target.value);
  }
  function handleSundayOpenChange(e) {
    setSundayOpenTime(e.target.value);
  }
  function handleMondayCloseChange(e) {
    setMondayCloseTime(e.target.value);
  }
  function handleTuesdayCloseChange(e) {
    setTuesdayCloseTime(e.target.value);
  }
  function handleWednesdayCloseTime(e) {
    setWednesdayCloseTime(e.target.value);
  }
  function handleThursdayCloseChange(e) {
    setThursdayCloseTime(e.target.value);
  }
  function handleFridayCloseChange(e) {
    setFridayCloseTime(e.target.value);
  }
  function handleSaturdayCloseChange(e) {
    setSaturdayCloseTime(e.target.value);
  }
  function handleSundayCloseChange(e) {
    setSundayCloseTime(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(driverProfile)
  }
  const opening_hours = {
    monday: [mondayOpenTime, mondayCloseTime],
    tuesday: [tuesdayOpenTime, tuesdayCloseTime],
    wednesday: [wednesdayOpenTime, wednesdayCloseTime],
    thursday: [thursdayOpenTime, thursdayCloseTime],
    friday: [fridayOpenTime, fridayCloseTime],
    saturday: [saturdayOpenTime, saturdayCloseTime],
    sunday: [sundayOpenTime, sundayCloseTime]
  }

  driverProfile.menu_url = menu
  driverProfile.avatar_url = image
  driverProfile.buisness_bio = businessBio
  driverProfile.logo_url = logo
  driverProfile.opening_hours = opening_hours

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
              value={logo}
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
          {/* <li>
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
          </li> */}
          <br></br>
          <div>
            <label htmlFor="busiess_bio">
              Buisness Bio
              <textarea
                type="text"
                name="business_Bio"
                placeholder="Business Bio"
                id="Business_bio_box"
                value={businessBio}
                onChange={handleBusinessBioChange}
              ></textarea>
            </label>
          </div>
          <br></br>
          <li>
            <label htmlFor="opening_hours_input">
              Opening Hours
              <ul>
                <li>
                  Monday
                  <input
                    type="text"
                    name="monday_open"
                    id="monday_open"
                    placeholder="Opening Hours"
                    value={mondayOpenTime}
                    onChange={handleMondayOpenChange}
                  ></input>
                  <input
                    type="text"
                    name="monday_close"
                    id="monday_close"
                    placeholder="Closing Hours"
                    value={mondayCloseTime}
                    onChange={handleMondayCloseChange}
                  ></input>
                </li>
                <li>
                  Tuesday
                  <input
                    type="text"
                    name="tuesday_open"
                    id="tuesday_open"
                    placeholder="Opening Hours"
                    value={tuesdayOpenTime}
                    onChange={handleTuesdayOpenChange}
                  ></input>
                  <input
                    type="text"
                    name="tuesday_close"
                    id="tuesday_close"
                    placeholder="Closing Hours"
                    value={tuesdayCloseTime}
                    onChange={handleTuesdayCloseChange}
                  ></input>{" "}
                </li>
                <li>
                  Wednesday
                  <input
                    type="text"
                    name="wednesday_open"
                    id="wednesday_open"
                    placeholder="Opening Hours"
                    value={wednesdayOpenTime}
                    onChange={handleWednedayOpenChange}
                  ></input>
                  <input
                    type="text"
                    name="wednesday_close"
                    id="wednesday_close"
                    placeholder="Closing Hours"
                    value={wednesdayCloseTime}
                    onChange={handleWednesdayCloseTime}
                  ></input>
                </li>
                <li>
                  Thursday
                  <input
                    type="text"
                    name="thursday_open"
                    id="thursday_open"
                    placeholder="Opening Hours"
                    value={thursdayOpenTime}
                    onChange={handleThursdayOpenChange}
                  ></input>
                  <input
                    type="text"
                    name="thursday_close"
                    id="thursday_close"
                    placeholder="Closing Hours"
                    value={thursdayCloseTime}
                    onChange={handleThursdayCloseChange}
                  ></input>
                </li>
                <li>
                  Friday
                  <input
                    type="text"
                    name="friday_open"
                    id="friday_open"
                    placeholder="Opening Hours"
                    value={fridayOpenTime}
                    onChange={handleFridayOpenChange}
                  ></input>
                  <input
                    type="text"
                    name="friday-close"
                    id="friday_close"
                    placeholder="Closing Hours"
                    value={fridayCloseTime}
                    onChange={handleFridayCloseChange}
                  ></input>
                </li>
                <li>
                  Saturday
                  <input
                    type="text"
                    name="saturday-open"
                    id="saturday_open"
                    placeholder="Opening Hours"
                    value={saturdayOpenTime}
                    onChange={handleSaturdayOpenChange}
                  ></input>
                  <input
                    type="text"
                    name="saturday_close"
                    id="saturdat_close"
                    placeholder="Closing Hours"
                    value={saturdayCloseTime}
                    onChange={handleSaturdayCloseChange}
                  ></input>
                </li>
                <li>
                  Sunday
                  <input
                    type="text"
                    name="sunday_open"
                    id="sunday_open"
                    placeholder="Opening Hours"
                    value={sundayOpenTime}
                    onChange={handleSundayOpenChange}
                  ></input>
                  <input
                    type="text"
                    name="sunday_closed"
                    id="sunday_closed"
                    placeholder="Closing Hours"
                    value={sundayCloseTime}
                    onChange={handleSundayCloseChange}
                  ></input>
                </li>
              </ul>
            </label>
          </li>
          <br></br>
        </ul>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
}
