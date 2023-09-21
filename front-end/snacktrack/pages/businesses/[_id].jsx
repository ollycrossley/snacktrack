import NavBar from "@/pages/navbar";
import { useEffect } from "react";
import { useState } from "react";
import getSingleBusiness from "../api/api_calls";

export async function getServerSideProps(context) {
  const { _id } = context.query;

  return {
    props: {
      _id,
    },
  };
}

export default function singleBusiness({ _id }) {
  console.log(_id);
  const [business, setBusiness] = useState("");
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    getSingleBusiness(_id, setBusiness, setisLoading);
  }, []);
  if (isLoading) return <h1> Loading, please wait....</h1>;
  console.log(business.opening_hours, "business");
  const { opening_hours } = business;

  console.log(opening_hours.friday, "monday");

  return (
    <>
      <NavBar />
      <br></br>
      <h1>{business.business_name}</h1>
      <br></br>
      <h1>
        {business.is_active ? "Open Now!" : "This business is currently closed"}
      </h1>
      <br></br>
      <h1>Business Type: {business.category}</h1>
      <br></br>
      <ul>
        {/* {
          <li>
            <h1>
              Monday:{opening_hours.monday} - {day[1]}
            </h1>
          </li>
        } */}
      </ul>
      <img src={business.menu_url} />
      <h1>Business ID:{_id}</h1>
    </>
  );
}
