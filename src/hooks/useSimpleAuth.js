import { useState } from "react"

const useSimpleAuth = () => {

    const [loggedIn, setIsLoggedIn] = useState(false)

    const isAuthenticated = () =>
        loggedIn || localStorage.getItem("codearchive_token") !== null

    const register = userInfo => {
        return fetch("https://api.codearchive.net/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(res => {
                if ("token" in res) {
                    localStorage.setItem( "codearchive_token", res.token )
                    setIsLoggedIn(true)
                } 
                // else {
                //     alert("Username is taken, try another one.")
                // }
            })
    }

    const login = credentials => {
        return fetch("https://api.codearchive.net/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(credentials)
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem( "codearchive_token", res.token )
                    setIsLoggedIn(true)
                }
                else {
                    alert("Sorry, the username or password was not valid. Try again.")
                    return
                }
            })
    }

    const logout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem("codearchive_token")
    }

    return { isAuthenticated, logout, login, register }
}

export default useSimpleAuth
