import React, { useState, useContext, useEffect } from "react"
import { useHttp } from "../hooks/http.hook"
import { AuthContext } from "../context/AuthContext"
import { useAuth } from "../hooks/auth.hook"
import "./auth.css"

export const Auth = () => {
  const auth = useContext(AuthContext)
  const { login } = useAuth()
  const [locked, setLocked] = useState(false)
  const { request } = useHttp()
  const [admin, setAdmin] = useState(false)
  const [notifications, setNotifications] = useState({
    status: "",
    messages: [],
  })
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [counter, setCounter] = useState(0)
  const changeHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const countAdmin = () => {
    setCounter(counter + 1)
  }

  const greetingMessage = () => {
    if (!auth.isAuthenticated) {
      return <div onClick={countAdmin}>Please log in!</div>
    }
  }

  const registerHandler = async () => {
    try {
      const { email, password } = form
      console.log(validatePass(password))
      if (!validateRegister(email, password)) {
        return
      }
      const data = await request("api/auth/register", "POST", {
        ...form,
        admin,
      })
      if (data.message === "User already exists") {
        throw new Error(data.message)
      }
    

      setNotifications({
        status: "registered",
        messages: ["Check your email for verification letter"],
      })
    } catch (e) {
      setNotifications ({
        status: "error",
        messages:[e.message]
      })
    }
  }

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  function validatePass(pass) {
    const re = /\S{8}\S*/gi
    return re.test(pass)
  }

  const validateRegister = (email, pass) => {
    if (!validateEmail(email) && !validatePass(pass)) {
      setNotifications({
        status: "error",
        messages: [
          "Please enter a valid email",
          "Password must be at least 8 symbols long",
        ],
      })
      return false
    } else if (!validateEmail(email)) {
      setNotifications({
        status: "error",
        messages: ["Please enter a valid email"],
      })
      return false
    } else if (!validatePass(pass)) {
      setNotifications({
        status: "error",
        messages: ["Password must be at least 8 symbols long"],
      })
      return false
    } else {
      setNotifications({
        status: "",
        messages: [],
      })
      return true
    }
  }

  const loginHandler = async () => {
    try {
      setNotifications({
        status: "",
        messages: [],
      })
      setLocked(true)
      const resp = await request("api/auth/login", "POST", { ...form })
      setLocked(false)
      if (resp.error) {

        throw new Error(resp.message)
      }
      login(resp.token, resp.userId, resp.admin)
    } catch (e) {
      setNotifications ({
        status: "error",
        messages:[e.message]
      })
    }
  }

  const adminHandler = () => {
    setAdmin(!admin)
  }

  return (
    <div>
      <h2>Auth page</h2>
      {greetingMessage()}
      <div className="auth-forms">
        <div className="auth_form">
          Email:{" "}
          <input
            id={"email"}
            type={"text"}
            name={"email"}
            className="auth-input"
            onChange={changeHandler}
          />
        </div>
        <div className="auth_form">
          Password: <br />
          <input
            id="password"
            type={"password"}
            name={"password"}
            className="auth-input"
            onChange={changeHandler}
          />
        </div>
        
        {counter >= 5 &&<div> <input
            type="checkbox"
            id="admin"
            name="admin"
            checked={admin}
            onChange={adminHandler}
          />
          <label htmlFor="admin">I wanna be an Admin!</label>
          </div>}
        
      <div className="auth-buttons">
        <button onClick={loginHandler} disabled={locked}>
          Login
        </button>
        <button onClick={registerHandler} disabled={locked}>
          Register
        </button>
        
      </div>
      <div className={`auth-notifications ${notifications.status}`}>
        {notifications.messages.map((a, i) => {
          return <div key={i}>{a}</div>
        })}
      </div>
      </div>
      
    </div>
  )
}
