import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/user_context";

export default function LoginButtonCustomer() {
  return (
    <button>
      <Link href="/login/customerlogin">Customer Login Button</Link>
    </button>
  );
}
