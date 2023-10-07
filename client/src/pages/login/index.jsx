import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { setSignInStart, setSignInSuccess, setSignInFailure } from "../../store/user/actions"
import { useUser } from "../../store/user/hooks";

const Login = () => {
  const [formData, setFormData] = useState({});
  const { loading, error }  = useUser();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSignInStart();
    
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success === false) {
      
      setSignInFailure(data.message);
      return;
    }

    setSignInSuccess(data);
    navigate("/");
  };

  return (
    <div className="max-w-md m-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 my-10 items-center p-3 sm:px-16"
      >
        <h1 className="text-3xl font-bold text-[color:var(--color-base-secondary)] mb-4 text-center">
          Sign In
        </h1>

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

        <button
          disabled={loading}
          className="px-7 py-2 mt-1 rounded-2xl border border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-[color:var(--background-primary)] transition-colors disabled:bg-[color:var(--color-primary)] disabled:opacity-50 disabled:text-[color:var(--background-primary)]"
        >
          {loading ? "Just a moment" : "Sign In"}
        </button>
        <div className="w-full flex">
          <p>Have an account?</p>
          <Link
            to="/register"
            className="text-[color:var(--color-primary)] pl-1"
          >
            Sign Up.
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
