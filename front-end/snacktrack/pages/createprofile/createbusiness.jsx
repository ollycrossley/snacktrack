"use client" 

import { useRouter } from "next/router";
import NavBar from "../navbar";
import { useState, useContext } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { postBusiness } from "@/api";
import BusinessOpeningTimes from "@/components/BusinessOpeningTimes";
import { UserContext } from "@/contexts/user_context";

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
  const [activeDays, setActiveDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const { activeUser, setActiveUser } = useContext(UserContext);

  const router = useRouter();
  const driverProfile = router.query;

  if (activeUser) {
    router.push("/map");
  }

  function handleLogoChange(e) {
    setLogo(e.target.value);
  }

  function handleBusinessBioChange(e) {
    setBusinessBio(e.target.value);
    if (e.target.value.length > 0) {
      if (e.target.value.length >= 25 && e.target.value.length <= 250) {
        setValidBio(true);
      } else {
        setValidBio(false);
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
  function handleWednesdayOpenChange(e) {
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
  function handleWednesdayCloseChange(e) {
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
    if (menu === "") {
      delete driverProfile.menu_url;
    }
    if (image === "") {
      delete driverProfile.avatar_url;
    }

    if (businessBio === "") {
      delete driverProfile.business_bio;
    }

    if (!driverProfile.logo_url) {
      delete driverProfile.logo_url;
    }
    for (let key in activeDays) {
      if (!activeDays[key]) {
        opening_hours[key] = ["Closed", "Closed"];
      }
    }
    for (let key in opening_hours) {
      if (opening_hours[key].some((time) => time === "")) {
        opening_hours[key] = ["Closed", "Closed"];
      }
    }
    postBusiness(driverProfile)
      .then((response) => {
        console.log(response, response.business._id);
        const newDriver = { ...driverProfile, _id: response.business._id };
        setActiveUser(newDriver);
        window.localStorage.setItem("user", JSON.stringify(newDriver));
        router.push("/");
      })
      .catch((e) => {
        console.log(e);
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
  driverProfile.business_bio = businessBio;
  driverProfile.logo_url = logo;
  driverProfile.opening_hours = opening_hours;

  return (
    <>
      <NavBar />
      <h1 className="title has-text-centered">Create Business</h1>
      <br />
      <div className="columns is-centered">
        <div className="column is-one-third">
          <form className="box" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="menu_input">
                Upload Business Menu (Optional)
                <div className="control">
                  <CldUploadWidget
                    uploadPreset="unsigned_test"
                    onSuccess={(result) => {
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
                          Choose a file...
                        </button>
                      );
                    }}
                  </CldUploadWidget>
                  {menu !== "" ? <p>{menu}</p> : null}
                </div>
              </label>
            </div>

            <div className="field">
              <label className={"label"} htmlFor="image_input">
                Upload a picture of your truck or stall (Optional)
                <div className="control">
                  <CldUploadWidget
                    uploadPreset="unsigned_test"
                    onSuccess={(result) => {
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
                          Choose a file...
                        </button>
                      );
                    }}
                  </CldUploadWidget>
                  {image !== "" ? <p>{image}</p> : null}
                </div>
              </label>
            </div>

            <div className="field">
              <label className={"label"} htmlFor="image_input">
                Upload your logo for your company's bio (Optional)
                <div className="control">
                  <CldUploadWidget
                    uploadPreset="unsigned_test"
                    onSuccess={(result) => {
                      setLogo(result.info.url);
                    }}
                  >
                    {({ open }) => {
                      function handleOnClick(e) {
                        e.preventDefault();
                        open();
                      }
                      return (
                        <button className="button" onClick={handleOnClick}>
                          Choose a file...
                        </button>
                      );
                    }}
                  </CldUploadWidget>
                  {logo !== "" ? <p>{logo}</p> : null}
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
                Business Bio (Optional)
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
                {validBio === false ? (
                  <p>Bio must be between 25 and 250 characters</p>
                ) : null}
              </label>
            </div>

            <div className="field">
              <label className={"label"} htmlFor="opening_hours_input">
                Opening Hours
                <ul>
                  <li id="background">
                    Monday
                    <br />
                    <div className="level-left">
                      <div className="level-item has-text-centred">
                        <BusinessOpeningTimes
                          openChange={handleMondayOpenChange}
                          closeChange={handleMondayCloseChange}
                          day={"monday"}
                          setActiveDays={setActiveDays}
                          style="object-fit: cover"
                        />
                      </div>
                    </div>
                    {/* <input
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
                    ></input> */}
                  </li>
                  <li>
                    Tuesday
                    <br />
                    <span className="level-left">
                      <div className="level-item has-text-centred">
                        <BusinessOpeningTimes
                          openChange={handleTuesdayOpenChange}
                          closeChange={handleTuesdayCloseChange}
                          day={"tuesday"}
                          setActiveDays={setActiveDays}
                        />
                      </div>
                    </span>
                    {/* <input
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
                    ></input> */}
                  </li>
                  <li>
                    Wednesday
                    <br />
                    <span className="level-left">
                      <div className="level-item has-text-centred">
                        <BusinessOpeningTimes
                          openChange={handleWednesdayOpenChange}
                          closeChange={handleWednesdayCloseChange}
                          day={"wednesday"}
                          setActiveDays={setActiveDays}
                        />
                      </div>
                    </span>
                    {/* <input
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
                    ></input> */}
                  </li>
                  <li>
                    Thursday
                    <br />
                    <span className="level-left">
                      <div className="level-item has-text-centred">
                        <BusinessOpeningTimes
                          openChange={handleThursdayOpenChange}
                          closeChange={handleThursdayCloseChange}
                          day={"thursday"}
                          setActiveDays={setActiveDays}
                        />
                      </div>
                    </span>
                    {/* <input
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
                    ></input> */}
                  </li>
                  <li>
                    Friday
                    <br />
                    <span className="level-left">
                      <div className="level-item has-text-centred">
                        <BusinessOpeningTimes
                          openChange={handleFridayOpenChange}
                          closeChange={handleFridayCloseChange}
                          day={"friday"}
                          setActiveDays={setActiveDays}
                        />
                      </div>
                    </span>
                    {/* <input
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
                    ></input> */}
                  </li>
                  <li>
                    Saturday
                    <br />
                    <span className="level-left">
                      <div className="level-item has-text-centred">
                        <BusinessOpeningTimes
                          openChange={handleSaturdayOpenChange}
                          closeChange={handleSaturdayCloseChange}
                          day={"saturday"}
                          setActiveDays={setActiveDays}
                        />
                      </div>
                    </span>
                    {/* <input
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
                    ></input> */}
                  </li>
                  <li>
                    Sunday
                    <br />
                    <span className="level-left">
                      <div className="level-item has-text-centred">
                        <BusinessOpeningTimes
                          openChange={handleSundayOpenChange}
                          closeChange={handleSundayCloseChange}
                          day={"sunday"}
                          setActiveDays={setActiveDays}
                        />
                      </div>
                    </span>
                    {/* <input
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
                    ></input> */}
                  </li>
                </ul>
              </label>
            </div>
            <button className={"button"}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
