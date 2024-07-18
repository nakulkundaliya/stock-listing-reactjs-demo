"use client";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import {
  LOGIN_ROUTE,
} from "@/app/constants/routes";
import { AuthContext } from "@/app/provider/AuthProvider";
import { auth } from "@/app/services/firebase";

const Header = () => {
  const { user }: any = AuthContext();
  const router = useRouter();
  const logOut = () => {
    signOut(auth)
      .then((response) => {
        localStorage.removeItem("userToken");
        router.push(LOGIN_ROUTE);
      })
      .catch((e) => {
        console.log("Logout Catch ", e.message);
      });
  };

  return (
    <>
      <nav className="w-full mx-auto flex justify-end items-center px-2 py-2 text-white font-serif text-xl">
        <ul className="flex gap-4">
          {user?.isLogin && (
            <>
              <button className="mx-1 px-3 py-1 border rounded bg-white text-blue-500" onClick={logOut}>
                Logout
              </button>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
