import React, { useState } from "react";
import style from "./Login.module.scss";
import Errorbar from "../../components/errorbar";
import httpClient from "../../services/httpClient";

export default function Home() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [err, seterr] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    let _errs = [];
    !password && _errs.push("Password is required");

    _errs.length && seterr(_errs);

    try {
      const res = await httpClient().post("/api/user/login", {
        username,
        password,
      });
      res.data && (window.location = "/");
      localStorage.setItem("token", res.data.token);
    } catch (e) {
      seterr([e.response.data.message]);
    }
  };

  return (
    <div className={style.Login}>
      <div className={style.LoginLayout}>
        <div className="mb-2">
          <h1 className={style.LoginTitle}>Login</h1>
          <span className={style.LoginSub}>
            Don't have an account?
            <a href="/signup" className={style.Link}>
              Sign up here
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
            type="username"
            value={username}
            className={style.LoginInput}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className={style.LoginInput}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={style.PrimaryButton}>Login</button>
        </form>
      </div>
    </div>
  );
}
