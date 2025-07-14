import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import bcrypt from "bcryptjs-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    console.log("hashed password: ", hash);

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        hash,
      });

      console.log("response from server: ", response);

      if (response.status === 200) {
        const isAuth = bcrypt.compareSync(
          password,
          response.data.hashedPassword
        );
        // console.log(isAuth);

        if (isAuth) {
          localStorage.setItem("isAuth", true);
          navigate("/todo");
        }
      }
    } catch (err) {
      console.log("login error: ", err);
      setError(
        err.response.data.message || "Login failed, please try again later"
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-5">Login Page</h1>

      {error && <p className="text-red-500 italic">{error}</p>}

      <input
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
        value={email}
        className="border-[1px] border-slate-200 p-3 bg-white rounded mb-3 w-1/3"
        type="email"
        placeholder="email"
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
          setError("");
        }}
        value={password}
        className="border-[1px] border-slate-200 p-3 bg-white rounded mb-3 w-1/3"
        type="password"
        placeholder="password"
      />

      <button onClick={login} className="underline mt-2 text-[22px]">
        Login
      </button>
    </div>
  );
}
