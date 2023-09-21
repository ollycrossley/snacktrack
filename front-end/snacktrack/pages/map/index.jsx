import NavBar from "../navbar";
import SimpleMap from "./components/simplemap";
import Head from "next/head";
import Script from "next/script";

export default function Map() {
  return (
    <>
      <Head>
          <Script src={"https://kit.fontawesome.com/a1a2d1f110.js"} crossOrigin="anonymous" />
      </Head>
      <NavBar />
      <h1>MAP</h1>
      <SimpleMap />
    </>
  );
}
