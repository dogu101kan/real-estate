import { Link, useNavigate } from "react-router-dom";

import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    
    if(data.success === false){
      setError(data.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setError(null);
    navigate("/login");
  };

  return (
    <div className="max-w-md m-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 my-10 items-center p-3 sm:px-16"
      >
        <h1 className="text-3xl font-bold text-[color:var(--color-base-secondary)] mb-4 text-center">
          Sign Up
        </h1>
        <label className="w-full flex flex-col gap-2">
          <p className="ml-3">Username</p>
          <input
            id="username"
            type="text"
            placeholder="example"
            className="border-2 p-3 rounded-lg w-full outline-none focus-within:border-[color:var(--color-primary)]"
            onChange={handleChange}
          />
        </label>
        <label className="w-full flex flex-col gap-2">
          <p className="ml-3">Email</p>
          <input
            id="email"
            type="email"
            placeholder="example@example.com"
            className="border-2 p-3 rounded-lg w-full outline-none focus-within:border-[color:var(--color-primary)]"
            onChange={handleChange}
          />
        </label>
        <label className="w-full flex flex-col gap-2">
          <p className="ml-3">Password</p>
          <input
            id="password"
            type="password"
            placeholder="*******"
            className="border-2 p-3 rounded-lg w-full outline-none focus-within:border-[color:var(--color-primary)]"
            onChange={handleChange}
          />
        </label>

        <button disabled={loading} className="px-7 py-2 mt-1 rounded-2xl border border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-[color:var(--background-primary)] transition-colors disabled:bg-[color:var(--color-primary)] disabled:opacity-50 disabled:text-[color:var(--background-primary)]">
          {loading ? "Just a moment" : "Register"}
        </button>
        <div className="w-full flex">
          <p>Have an account?</p>
          <Link to="/login" className="text-[color:var(--color-primary)] pl-1">
            Sign In.
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
