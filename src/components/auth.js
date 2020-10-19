import React, { useState, useContext, useEffect } from "react"
import { useHttp } from "../hooks/http.hook"
import { AuthContext } from "../context/authContext"
import { useAuth } from "../hooks/auth.hook"
import "./auth.css"
import config from "../config"
import { connect } from "react-redux"
import styled from "styled-components"
import { Icon, InlineIcon } from '@iconify/react';
import mailOutlined from '@iconify/icons-ant-design/mail-outlined';
import bxsLock from '../images/lock.svg'

const AuthInput = styled.input`
padding: 10px 20px;
border-radius: 10px;
background-color: rebeccapurple;
font-size: 16px;
font-style: normal;
font-family: Roboto;
border: none;
outline: 0;
color: white;
margin-left: -10px;
width: auto !important;
::placeholder{
  color: white;
  opacity: 0.8
}

`

const Auth = () => {
  const {baseUrl} = config
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


  const registerHandler = async () => {
    try {
      const { email, password } = form
      console.log(validatePass(password))
      if (!validateRegister(email, password)) {
        return
      }
      const data = await request(`${baseUrl}api/auth/register`, "POST", {
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
      const resp = await request(`${baseUrl}api/auth/login`, "POST", { ...form })
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
      <div className="auth-forms">
        <div className="auth_form">
        <div className="auth-input-pre">
        <Icon icon={mailOutlined} style={{color: '#ffffff', fontSize: '24px'}} />
        </div>
          <AuthInput
            id={"email"}
            type={"text"}
            name={"email"}
            placeholder="Email"
            onChange={changeHandler}
          />
        </div>
        <div className="auth_form">
        <div className="auth-input-pre">
        <img src={bxsLock} style = {{
          marginBottom: "0px"
        }}/>
        </div>
          <AuthInput
            id="password"
            type={"password"}
            name={"password"}
            placeholder="Password"
            onChange={changeHandler}
          />
        </div>
        
        <div> <input
            type="checkbox"
            id="admin"
            name="admin"
            checked={admin}
            onChange={adminHandler}
          />
          <label htmlFor="admin">I wanna be an Admin!</label>
          </div>
        
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


const mapStateToProps = ({cart}) => {
  return {cart}
}

export default connect(mapStateToProps)(Auth)