import { useUser } from "../../store/user/hooks";
import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import {
  setUpdateStart,
  setUpdateSuccess,
  setUpdateFailure,
  setUpdateInformationStart,
  setUpdateInformationSuccess,
  setUpdateInformationFailure,
  setDeleteAccountStart,
  setDeleteAccountSuccess,
  setDeleteAccountFailure,
  setLogoutStart,
  setLogoutSuccess,
  setLogoutFailure,
} from "../../store/user/actions";
import axios from "axios";

export default function Profile() {
  const { currentUser, loading, error } = useUser();
  const [file, setFile] = useState();
  const uploadRef = useRef(null);
  const { slug } = useParams();
  const [updateData, setUpdateData] = useState({});
  const [updateSuccess, setupdateSuccess] = useState();

  const navigate = useNavigate();

  const inputRef = () => {
    uploadRef.current.click();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setupdateSuccess(false);
    }, "1000");
    return () => clearTimeout(timer);
  }, [updateSuccess]);

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
  }, [file]);

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateInformationStart();

    const config = {
      headers: { authorization: `Bearer ${currentUser.access_token}` },
    };

    await axios
      .post(
        `${import.meta.env.VITE_API_ADRESS}/api/user/update/${
          currentUser.data._id || currentUser.data.id
        }`,
        updateData,
        config
      )
      .then((res) => {
        setUpdateInformationSuccess(res.data.data);
        setupdateSuccess(true);
        navigate("/profile/" + res.data.data.username);
      })
      .catch((err) => setUpdateInformationFailure(err.response.data.message));
  };

  const handleDeleteAccount = async () => {
    setDeleteAccountStart();
    const config = {
      headers: { authorization: `Bearer ${currentUser.access_token}` },
    };
    await axios
      .delete(
        `${import.meta.env.VITE_API_ADRESS}/api/user/delete/${
          currentUser.data._id || currentUser.data.id
        }`,
        config
      )
      .then((res) => {
        setDeleteAccountSuccess();
      })
      .catch((err) => setDeleteAccountFailure(err.response.data.message));
  };

  const handleLogout = async () => {
    setLogoutStart();
    await axios
      .get(`${import.meta.env.VITE_API_ADRESS}/api/auth/logout`)
      .then((res) => {
        setLogoutSuccess();
      })
      .catch((err) => setLogoutFailure(err.response.data.message));
  };

  return (
    <div className="max-w-lg mx-auto my-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {slug === currentUser.data.username ? (
          <input
            ref={uploadRef}
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            hidden
          />
        ) : (
          <input
            ref={uploadRef}
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            hidden
            disabled
          />
        )}

        <div
          className="relative w-20 h-20 self-center rounded-full cursor-pointer"
          onClick={inputRef}
        >
          <img
            className={classNames(
              "w-20 h-20 self-center rounded-full cursor-pointer",
              { "animate-bounce opacity-50": loading }
            )}
            src={
              import.meta.env.VITE_API_ADRESS +
              "/images/profileImages/" +
              currentUser.data.avatar
            }
            alt={currentUser.data.username}
          />
          {slug === currentUser.data.username ? (
            <CiEdit className="absolute bottom-0 -right-2 w-5 h-5 text-red-500" />
          ) : (
            ""
          )}
        </div>

        <div className="mx-auto w-3/4 flex flex-col gap-4">
          <label className="relative">
            <input
              id="username"
              type="text"
              placeholder="Username"
              defaultValue={currentUser.data.username}
              onChange={handleChange}
              className="border-2 p-3 rounded-lg w-full outline-none focus-within:border-[color:var(--color-primary)]"
            />
            <CiEdit className="absolute inset-y-4 right-3 w-5 h-5 text-red-500 cursor-pointer" />
          </label>
          <label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              defaultValue={currentUser.data.email}
              className="border-2 p-3 rounded-lg w-full outline-none focus-within:border-[color:var(--color-primary)]"
              disabled
            />
          </label>
          <label className="relative">
            <input
              id="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
              className="border-2 p-3 rounded-lg w-full outline-none focus-within:border-[color:var(--color-primary)]"
            />
            <CiEdit className="absolute inset-y-4 right-3 w-5 h-5 text-red-500 cursor-pointer" />
          </label>
          <button
            disabled={loading}
            className="self-center text-center min-w-full in w-1/4 py-2 px-1 mt-1 rounded-2xl border border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-[color:var(--background-primary)] transition-colors disabled:bg-[color:var(--color-primary)] disabled:opacity-50 disabled:text-[color:var(--background-primary)]"
          >
            {loading ? "Just a moment..." : "Update"}
          </button>
          <div className="flex flex-nowrap justify-between">
            <span
              onClick={handleDeleteAccount}
              className="text-red-500 cursor-pointer flex gap-1"
            >
              <span>Delete</span>
              <span>Account</span>
            </span>
            <span
              onClick={handleLogout}
              className="text-red-500 cursor-pointer"
            >
              Logout
            </span>
          </div>
          {error && (
            <p className="bg-red-500 border border-white ring-2 ring-red-500 text-white p-3 rounded-2xl self-center ">
              {error}
            </p>
          )}
          {updateSuccess && (
            <p className=" bg-green-500 border border-white ring-2 ring-green-500 text-white p-3 w-full rounded-2xl text-center">
              Successfull
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
