import { useRouter } from "next/router";
import NavBar from "../navbar";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { postBusiness } from "../api/api_calls";

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
  const [validBio, setValidBio] = useState("");
  const router = useRouter();
  const driverProfile = router.query;
  console.log(driverProfile);

  function handleLogoChange(e) {
    setLogo(e.target.value);
  }
  // function handlePhoneNumberChange(e) {
  //   setPhoneNumber(e.target.value);
  // }
  function handleBusinessBioChange(e) {
    setBusinessBio(e.target.value);
    if (e.target.value.length > 0) {
      if (e.target.value.length >= 25 && e.target.value.length < 250) {
        setValidBio(true);
        console.log("valid");
      } else {
        setValidBio(false);
        console.log("invalid");
      }
    } else {
      setValidBio("");
    }
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
    console.log(driverProfile);
    postBusiness(driverProfile).then((response) => {
      router.push("/");
    });
  }
  const opening_hours = {
    monday: [mondayOpenTime, mondayCloseTime],
    tuesday: [tuesdayOpenTime, tuesdayCloseTime],
    wednesday: [wednesdayOpenTime, wednesdayCloseTime],
    thursday: [thursdayOpenTime, thursdayCloseTime],
    friday: [fridayOpenTime, fridayCloseTime],
    saturday: [saturdayOpenTime, saturdayCloseTime],
    sunday: [sundayOpenTime, sundayCloseTime],
  };

  driverProfile.menu_url = menu;
  driverProfile.avatar_url = image;
  driverProfile.buisness_bio = businessBio;
  driverProfile.logo_url = logo;
  driverProfile.opening_hours = opening_hours;

  console.log(menu);

  return (
    <>
      <NavBar />

      <h1>Create Business</h1>
      <div className="columns is-centered">
        <div className="column is-one-third">
          <form className="box" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="menu_input">
                Upload Menu
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="menu_input"
                    id="menu_input"
                    //placeholder="https://menu.com"
                    value={menu}
                    // onChange={handleMenuChange}
                  ></input>
                </div>
              </label>
            </div>

            <CldUploadWidget
              uploadPreset="unsigned_test"
              onSuccess={(result) => {
                console.log(result.info.url);
                setMenu(result.info.url);
              }}
            >
              {({ open }) => {
                function handleOnClick(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <button className="button" onClick={handleOnClick}>
                    Upload menu
                  </button>
                );
              }}
            </CldUploadWidget>

            <div className="field">
              <label className={"label"} htmlFor="image_input">
                Upload a picture of your truck or stall
                <div className="control">
                  <input
                    className="business"
                    type="text"
                    name="image_input"
                    id="image_input"
                    // placeholder="https://image.com"
                    value={image}
                    // onChange={handleImageChange}
                  ></input>
                </div>
              </label>
            </div>

            <CldUploadWidget
              uploadPreset="unsigned_test"
              onSuccess={(result) => {
                console.log(result.info.url);
                setImage(result.info.url);
              }}
            >
              {({ open }) => {
                function handleOnClick(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <button className="button" onClick={handleOnClick}>
                    Upload truck or stall image
                  </button>
                );
              }}
            </CldUploadWidget>

            <div className="field">
              <label className={"label"} htmlFor="logo_input">
                Choose a logo to represent you on the map
                <div className="control">
                  <select
                    className="input"
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
                </div>
              </label>
            </div>
            {/*
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
            </label>*/}
            <div className="field">
              <label className={"label"} htmlFor="business_bio">
                Business Bio
                <div className="control">
                  <textarea
                    className="input"
                    type="text"
                    name="business_Bio"
                    placeholder="Enter a bio for your business"
                    id="Business_bio_box"
                    value={businessBio}
                    onChange={handleBusinessBioChange}
                  ></textarea>
                </div>
              </label>
            </div>

            <div className="field">
              <label className={"label"} htmlFor="opening_hours_input">
                Opening Hours
                <ul>
                  <li>
                    Monday
                    <input
                      type="text"
                      name="monday_open"
                      id="monday_open"
                      placeholder="Open from"
                      value={mondayOpenTime}
                      onChange={handleMondayOpenChange}
                    ></input>
                    <input
                      type="text"
                      name="monday_close"
                      id="monday_close"
                      placeholder="Closing at"
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
                      placeholder="Open from"
                      value={tuesdayOpenTime}
                      onChange={handleTuesdayOpenChange}
                    ></input>
                    <input
                      type="text"
                      name="tuesday_close"
                      id="tuesday_close"
                      placeholder="Closing at"
                      value={tuesdayCloseTime}
                      onChange={handleTuesdayCloseChange}
                    ></input>
                  </li>
                  <li>
                    Wednesday
                    <input
                      type="text"
                      name="wednesday_open"
                      id="wednesday_open"
                      placeholder="Open from"
                      value={wednesdayOpenTime}
                      onChange={handleWednedayOpenChange}
                    ></input>
                    <input
                      type="text"
                      name="wednesday_close"
                      id="wednesday_close"
                      placeholder="Closing at"
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
                      placeholder="Open from"
                      value={thursdayOpenTime}
                      onChange={handleThursdayOpenChange}
                    ></input>
                    <input
                      type="text"
                      name="thursday_close"
                      id="thursday_close"
                      placeholder="Closing at"
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
                      placeholder="Open from"
                      value={fridayOpenTime}
                      onChange={handleFridayOpenChange}
                    ></input>
                    <input
                      type="text"
                      name="friday-close"
                      id="friday_close"
                      placeholder="Closing at"
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
                      placeholder="Open from"
                      value={saturdayOpenTime}
                      onChange={handleSaturdayOpenChange}
                    ></input>
                    <input
                      type="text"
                      name="saturday_close"
                      id="saturdat_close"
                      placeholder="Closing at"
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
                      placeholder="Open from"
                      value={sundayOpenTime}
                      onChange={handleSundayOpenChange}
                    ></input>
                    <input
                      type="text"
                      name="sunday_closed"
                      id="sunday_closed"
                      placeholder="Closing at"
                      value={sundayCloseTime}
                      onChange={handleSundayCloseChange}
                    ></input>
                  </li>
                </ul>
              </label>
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
