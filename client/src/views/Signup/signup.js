import React, { useState } from "react";
import style from "./Signup.module.scss";
import validator from "validator";
import Errorbar from "../../components/errorbar";
import httpClient from "../../services/httpClient";

export default function Home() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [err, seterr] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    let _errs = [];
    !username && _errs.push("Username is required");
    !validator.isEmail(email) && _errs.push("Incorrect email");
    !password && _errs.push("Password is required");
    !passwordConfirm && _errs.push("Password is required");
    password !== passwordConfirm && _errs.push("Passwords must match");

    _errs.length && seterr(_errs);

    try {
      const res = await httpClient().post("/api/user/register", {
        username,
        email,
        password,
      });
      res.data && (window.location = "/");
    } catch (e) {
      seterr([e.response.data.message]);
    }
  };

  return (
    <div className={style.SignUp}>
      <div className={style.SignUpLayout}>
        <div className="mb-2">
          <h1 className={style.SignUpTitle}>Sign up</h1>
          <span className={style.SignUpSub}>
            Already have an account?
            <a href="/" className={style.Link}>
              Log in here
            </a>
          </span>
        </div>
        {err.length > 0 &&
          err.map((i, index) => (
            <div key={index}>
              <Errorbar message={i} />
            </div>
          ))}

        <form onSubmit={onSubmit}>
          <input
            className={style.SignUpInput}
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            className={style.SignUpInput}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className={style.SignUpInput}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className={style.SignUpInput}
            placeholder="Confirm your password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <button type="submit" className={style.PrimaryButton}>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
