import NavBar from "../navbar";
import SimpleMap from "./components/simplemap";
import Head from "next/head";
import Script from "next/script";

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
      <h1 className={"title has-text-centered"}>MAP</h1>
        <div className={"container"} style={{marginBottom: 25}}><SimpleMap/></div>
    </>
  );
}
