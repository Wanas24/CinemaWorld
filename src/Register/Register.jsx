import axios from "axios";
import joi from "joi";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: "",
  });

  const [apiMsg, setMsg] = useState("");

  const [errorsDetails, setError] = useState([]);

  let myUser = { ...user };
  let navigateto = useNavigate();

  function valdata() {
    let rules = joi.object({
      first_name: joi.string().alphanum().min(2).max(10).required(),
      last_name: joi.string().alphanum().min(2).max(10).required(),
      email: joi
        .string()
        .email({ maxDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      password: joi.string().alphanum(),
      // pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/),
      age: joi.number().min(15).max(100).required(),
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

  async function register() {
    if (valdata()) {
      let { data } = await axios.post(
        "https://sticky-note-fe.vercel.app/signup",
        user
      );
      if (data.errors) {
        console.log(data.errors.email.message);
        setMsg(data.errors.email.message);
      } else {
        setMsg(data.message);
        navigateto("/login");
      }
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
        <h1>Registeration</h1>

        {/* {errorsDetails.map((error)=>{

        if(error.message.includes('pattern'))
        {
          error.message= '"password" must conatain number, sign, small and capital letters'
        }
        return <p className='text-danger'>{error.message}</p>
      })} */}

        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            register();
          }}
        >
          <label htmlFor="">First Name:</label>
          <input
            onChange={(e) => {
              myUser.first_name = e.target.value;
              setUser(myUser);
              console.log(user);
            }}
            type="text"
            className="form-control mb-2"
          />

          {showAlert("first_name")}

          <label htmlFor="">Last Name:</label>
          <input
            onChange={(e) => {
              myUser.last_name = e.target.value;
              setUser(myUser);
              console.log(user);
            }}
            type="text"
            className="form-control mb-2"
          />

          {showAlert("last_name")}

          <label htmlFor="">Age:</label>
          <input
            onChange={(e) => {
              myUser.age = e.target.value;
              setUser(myUser);
              console.log(user);
            }}
            type="text"
            className="form-control mb-2"
          />

          {showAlert("age")}

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
          <button className="btn btn-info">Register</button>
          <h5 className=" text-danger">{apiMsg}</h5>
        </form>
      </div>
    </>
  );
};
export default Register;
