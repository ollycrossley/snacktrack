import NavBar from "../navbar";
import SimpleMap from "./components/simplemap";
import Head from "next/head";

export default function Map() {
  return (
    <>
      <Head>
        <script
          src="https://kit.fontawesome.com/a1a2d1f110.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <NavBar />
      <h1>MAP</h1>
      <SimpleMap />
    </>
  );
}
