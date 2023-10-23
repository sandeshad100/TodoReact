import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";
const Register = () => {
  console.log("fff");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    try {
      const { data } = await axios.post(
        `${server}/users/new`,
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
    } catch (error) {
      toast.success("Some Error");
      console.log(error);
    }
  };
  return (
    <div>
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <h2>Register</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
            <h4>Or</h4>
            <Link to={"/login"}>Login</Link>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Register;
