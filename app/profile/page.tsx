"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfully");
      router.push("/login");
    } catch (error) {
      console.log("error:", error);
    }
  };

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get("/api/users/me");
      setUserData(data?.data?._id);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="w-50% flex flex-col justify-center items-center mt-[10%]">
      this is a profile page
      {userData === "nothing" ? (
        "nothing"
      ) : (
        <Link href={`/profile/${userData}`} className="bg-green-400 px-4 py-1">
          {userData}
        </Link>
      )}
      <button
        className="bg-blue-500 px-3 py-2 rounded-md mt-2"
        onClick={logout}
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-green-500 px-4 py-2 rounded-md mt-2"
      >
        Get User Details
      </button>
    </div>
  );
};

export default Profile;
