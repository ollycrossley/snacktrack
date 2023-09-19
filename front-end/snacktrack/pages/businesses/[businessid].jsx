import NavBar from "@/pages/navbar";

export async function getServerSideProps(context) {
  const { businessid } = context.query;

  return {
    props: {
      businessid,
    },
  };
}
export default function singleBusiness({ businessid }) {
  console.log(businessid);

  return (
    <>
      <NavBar />
      <br></br>
      <h1>Single Business Page</h1>
      <br></br>
      <h1>Business ID:{businessid}</h1>
    </>
  );
}
