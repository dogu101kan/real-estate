import { useUser } from "../../store/user/hooks";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import {
  setUpdateStart,
  setUpdateSuccess,
  setUpdateFailure,
} from "../../store/user/actions";
import axios from "axios";

export default function Profile() {
  const { currentUser, loading, error } = useUser();
  const [file, setFile] = useState();
  const uploadRef = useRef(null);

  const inputRef = () => {
    uploadRef.current.click();
  };

  useEffect(() => {
    const formData = new FormData();
    

    if (file) {
      setUpdateStart();
      formData.append("image_p", file);
      const config = {
        headers: { authorization: `Bearer ${currentUser.access_token}` },
      };
      axios
        .post("/api/auth/upload", formData, config)
        .then((res) => {
          setUpdateSuccess(res.data.data.avatar);
          setFile(null);
        })
        .catch((err) => setUpdateFailure(err.message));
    }
  },[file])
  
  return (
    <div className="max-w-lg mx-auto my-10">
      <form className="flex flex-col gap-6">
        <input
          ref={uploadRef}
          type="file"
          accept="image/*"
          onChange={(e)=>setFile(e.target.files[0])}
          hidden
        />

        <img
          className={classNames(
            "w-20 h-20 self-center rounded-full cursor-pointer",
            { "animate-bounce opacity-50": loading }
          )}
          onClick={inputRef}
          src={
            import.meta.env.VITE_API_ADRESS +
            "/images/profileImages/" +
            currentUser.data.avatar
          }
          alt={currentUser.data.username}
        />
        {/* animate-spin */}

        <div className="mx-auto w-3/4 flex flex-col gap-4">
          <label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="border-2 p-3 rounded-lg w-full outline-none focus-within:border-[color:var(--color-primary)]"
            />
          </label>
          <label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="border-2 p-3 rounded-lg w-full outline-none focus-within:border-[color:var(--color-primary)]"
            />
          </label>
          <label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="border-2 p-3 rounded-lg w-full outline-none focus-within:border-[color:var(--color-primary)]"
            />
          </label>
          <button
            // disabled={loading}
            className="self-center text-center min-w-min in w-1/4 py-2 px-1 mt-1 rounded-2xl border border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-[color:var(--background-primary)] transition-colors disabled:bg-[color:var(--color-primary)] disabled:opacity-50 disabled:text-[color:var(--background-primary)]"
          >
            {/* {loading ? "Just a moment" : "Update"} */}Update
          </button>
          <div className="flex flex-nowrap justify-between">
            <span className="text-red-500 cursor-pointer flex gap-1">
              <span>Delete</span>
              <span>Account</span>
            </span>
            <span className="text-red-500 cursor-pointer">Logout</span>
          </div>
        </div>
      </form>
    </div>
  );
}
