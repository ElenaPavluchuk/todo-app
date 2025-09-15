import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import bcrypt from "bcryptjs-react";

export default function LoginPage() {
  // component state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  //hooks
  const navigate = useNavigate();

  const validate = () => {
    if (!email || !password) {
      console.log("email and password are required");
      return false;
    }
    return true;
  };

  const login = async () => {
    if (!validate()) return;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    console.log("hashed password: ", hash);

    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        email,
      });

      // console.log("response from server: ", response);

      if (response.status === 200) {
        const isAuth = bcrypt.compareSync(
          password,
          response.data.hashedPassword
        );
        // console.log(isAuth);

        if (isAuth) {
          localStorage.setItem("isAuth", true);
          localStorage.setItem("userId", response.data.userId);
          navigate("/todo");
        }
      }
    } catch (err) {
      console.log("login error: ", err);
      setError(
        err?.response?.data?.message || "Login failed, please try again later"
      );
    }
  };

  const register = async () => {
    console.log("redirect to register page");

    if (!validate()) return;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    // call register user API
    try {
      const response = await axios.post("http://localhost:3001/users", {
        email,
        hashedPassword: hash,
      });

      //console.log("register response: ", response);
      if (response.status === 201) {
        setMessage("Registration successful! You can now login.");
        setIsRegister(false);
      }
    } catch (err) {
      console.log("register error: ", err);
      setError(
        err?.response?.data?.message ||
          "Registration failed, please try again later"
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-5">Login Page</h1>

      {error && <p className="text-red-500 italic">{error}</p>}
      {message && <p className="text-green-500 italic">{message}</p>}

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

      <button onClick={isRegister ? register : login} className="add-items-btn">
        {isRegister ? "Register" : "Login"}
      </button>

      {isRegister ? (
        <button onClick={() => setIsRegister(false)} className="underline mt-2">
          Alredy have an account? Login
        </button>
      ) : (
        <button onClick={() => setIsRegister(true)} className="underline mt-2">
          No account? Register
        </button>
      )}
    </div>
  );
}
