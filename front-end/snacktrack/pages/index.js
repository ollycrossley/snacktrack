import Head from "next/head";
// import { Inter } from "next/font/google";
import NavBar from "./navbar";
import LoginButtonCustomer from "./customer_login";
import LoginButtonDriver from "./driver_login";
import CreateCustomerProfile from "./customercreate";
import CreateDriverProfile from "./drivercreate";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title class="subtitle is-5">SnackTrack</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <NavBar />
        <br></br>
        <header>
          <h1>Snack Track</h1>
        </header>
        <br></br>
        <>
          <div>The number one leading pop-up shop location service!!!</div>
          <br></br>
          <div>
            <LoginButtonCustomer />
            <LoginButtonDriver />
          </div>
          <br></br>
          <div>
  
            <CreateCustomerProfile />
            <CreateDriverProfile />
          </div>
        </>
        <br></br>
        <footer>Created by SnackTrack TM</footer>
      </main>
    </>
  );
}
