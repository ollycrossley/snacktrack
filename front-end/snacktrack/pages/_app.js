import "@/styles/globals.scss";
import { UserProvider } from "@/contexts/user_context";

export default function App({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}
