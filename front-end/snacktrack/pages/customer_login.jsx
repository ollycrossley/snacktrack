import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/user_context";

export default function LoginButtonCustomer() {
  return (
    <Link className={"button"} href="/login/customerlogin">
      Customer
    </Link>
  );
}
