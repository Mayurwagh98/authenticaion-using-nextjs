"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfully");
      router.push("/login");
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="w-50% flex flex-col justify-center items-center mt-[10%]">
      this is a profile page
      <button
        className="bg-blue-500 px-3 py-2 rounded-md mt-2"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
