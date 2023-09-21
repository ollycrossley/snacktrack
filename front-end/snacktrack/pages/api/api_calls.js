import { useState } from "react";
import axios from "axios";

export default function getSingleBusiness(_id, setBusiness, setisLoading) {
  setisLoading(true);
  axios
    .get(`https://snacktrack.onrender.com/api/businesses/${_id}`)
    .then(({ data }) => {
      console.log(data.business.business_name, "data");
      setBusiness(data.business);
      setisLoading(false);
    });
}
