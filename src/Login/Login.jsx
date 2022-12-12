import React, { useState } from "react";
import joi from "joi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [apiMsg, setMsg] = useState("");

  const [errorsDetails, setError] = useState([]);

  let myUser = { ...user };
  let navigateto = useNavigate();

  function valdata() {
    let rules = joi.object({
      email: joi
        .string()
        .email({ maxDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      password: joi.string()
    });

    let valResult = rules.validate(user, { abortEarly: false });
    console.log(valResult);

    if (valResult.error) {
      setError(valResult.error.details);
      return false;
    } else {
      setError([]);
      return true;
    }
  }

  async function login() {
    if (valdata()) {
      let { data } = await axios.post(
        "https://sticky-note-fe.vercel.app/signin",
        user
      );

        setMsg(data.message)
        if(data.message==='success'){
          props.setIsLogin(true);
          localStorage.setItem('token',data.token)
          navigateto("/home");
        }
       

      // if (data.errors) {
      //   console.log(data.errors.email.message);
      //   setMsg(data.errors.email.message);
      // } else {
      //   setMsg(data.message);
      //   navigateto("/home");
      // }
    }
  }

  function showAlert(inputName) {
    let x = errorsDetails.filter((alert) => {
      return alert.message.includes(inputName);
    });

    if (x[0] !== undefined) {
      return <p className="text-danger">{x[0].message}</p>;
    } else {
      return "";
    }
  }

  return (
    <>
      <div className="container">
        <h1>Login</h1>

        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <label htmlFor="">Email:</label>
          <input
            onChange={(e) => {
              myUser.email = e.target.value;
              setUser(myUser);
              console.log(user);
            }}
            type="text"
            className="form-control mb-2"
          />

          {showAlert("email")}
          <label htmlFor="">Password:</label>
          <input
            onChange={(e) => {
              myUser.password = e.target.value;
              setUser(myUser);
              console.log(user);
            }}
            type="text"
            className="form-control mb-2"
          />
          {showAlert("password")}
          <button className="btn btn-info">Login</button>
          <h5 className=" text-danger">{apiMsg}</h5>
        </form>
      </div>
    </>
  );
};
export default Login;
