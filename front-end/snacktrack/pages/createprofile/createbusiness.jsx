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
    postBusiness(driverProfile).then((response) => {
      setActiveUser(driverProfile);
      window.localStorage.setItem("user", JSON.stringify(driverProfile));
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
  driverProfile.business_bio = businessBio;
  driverProfile.logo_url = logo;
  driverProfile.opening_hours = opening_hours;

  return (
    <>
      <NavBar />
      <h1 className="title has-text-centered">Create Business</h1>
      <br />
      <div className="columns is-centered">
        <div className="column is-half">
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
                <br/>
                <br/>

                <ul className={"ml-1"}>
                  <li>
                    Monday
                    <br />
                        <BusinessOpeningTimes
                          openChange={handleMondayOpenChange}
                          closeChange={handleMondayCloseChange}
                          day={"monday"}
                          setActiveDays={setActiveDays}
                        />
                  </li>
                  <li>
                    Tuesday
                    <br />
                    <BusinessOpeningTimes
                        openChange={handleTuesdayOpenChange}
                        closeChange={handleTuesdayCloseChange}
                        day={"tuesday"}
                        setActiveDays={setActiveDays}
                    />
                  </li>
                  <li>
                    Wednesday
                    <br />
                        <BusinessOpeningTimes
                          openChange={handleWednesdayOpenChange}
                          closeChange={handleWednesdayCloseChange}
                          day={"wednesday"}
                          setActiveDays={setActiveDays}
                        />
                  </li>
                  <li>
                    Thursday
                    <br />
                        <BusinessOpeningTimes
                          openChange={handleThursdayOpenChange}
                          closeChange={handleThursdayCloseChange}
                          day={"thursday"}
                          setActiveDays={setActiveDays}
                        />

                  </li>
                  <li>
                    Friday
                    <br />
                        <BusinessOpeningTimes
                          openChange={handleFridayOpenChange}
                          closeChange={handleFridayCloseChange}
                          day={"friday"}
                          setActiveDays={setActiveDays}
                        />
                  </li>
                  <li>
                    Saturday
                    <br />
                        <BusinessOpeningTimes
                          openChange={handleSaturdayOpenChange}
                          closeChange={handleSaturdayCloseChange}
                          day={"saturday"}
                          setActiveDays={setActiveDays}
                        />
                  </li>
                  <li>
                    Sunday
                    <br />
                        <BusinessOpeningTimes
                          openChange={handleSundayOpenChange}
                          closeChange={handleSundayCloseChange}
                          day={"sunday"}
                          setActiveDays={setActiveDays}
                        />
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
