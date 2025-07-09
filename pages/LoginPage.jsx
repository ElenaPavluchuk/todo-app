import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      console.log("response from server: ", response);
    } catch (err) {
      console.log("login error: ", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-5">Login Page</h1>

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="border-[1px] border-slate-200 p-3 bg-white rounded mb-3 w-1/3"
        type="email"
        placeholder="email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
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
