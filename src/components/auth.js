import React, { useState, useContext } from "react"
import {useHttp} from "../hooks/http.hook"
import { AuthContext } from "../context/AuthContext"
import { useAuth } from "../hooks/auth.hook"

export const Auth = () => {
    
    const auth = useContext(AuthContext)
    const {login,logout} = useAuth()
    const {request,response, loading} = useHttp()

    const [form,setForm] = useState({
        email:"", password:""
    })
    const changeHandler = (e) => {
        setForm({...form, [e.target.name]:e.target.value})

    }

    const greetingMessage = () => {
        if (!auth.isAuthenticated) {
            return (
                <div>Please log in!</div>
            )
        }
    }

    const registerHandler = async () => {
        try {
            const data = await request("api/auth/register", "POST", {...form})
        } catch (e) {
            alert(e)
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request("api/auth/login", "POST", {...form})
            login(data.token, data.userId)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div>
            <h2>Auth page</h2>
            {greetingMessage()}
            <div className="auth-forms">
                <div className="auth_form">Email: <input
                id={"email"}
                type={"text"}
                name={"email"}
                onChange={changeHandler}
                /></div>
                <div className="auth_form">Password: <input
                    id="password"
                    type={"password"}
                    name={"password"}
                    onChange={changeHandler}
                /></div>
            </div>
            <div className="auth-buttons">
                <button onClick={loginHandler}>Войти</button>
                <button onClick={registerHandler}>Регистрация</button>
            </div>
        </div>
    )

}