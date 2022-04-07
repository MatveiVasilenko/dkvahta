import React, {
    useEffect, useState, useContext
} from 'react'
import { Redirect, Route } from 'react-router'
import NET from './../network';
import ContextUsers from './../context/Users/ContextUsers';

const ProtectedRoute = ({
    path,
    component,
    children
}) => {
    const {dispatchMain} = useContext(ContextUsers)
    const token = localStorage.getItem('token')
    const [redirect, setRedirect] = useState(token ? true : false)
    useEffect(() => {
        if (token) {
            (async() => {
                try {
                    const res = await fetch(`${NET.APP_URL}/auth`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        body: JSON.stringify({token})
                    })
                    const data = await res.json()
                    if (res.status === 200) {
                        setRedirect(true)
                        if (data.data[0]) {
                            dispatchMain({
                                type: "AUTH",
                                payload: data.data[0]
                            })
                        } else {
                            setRedirect(false)
                        }
                    } else {
                        localStorage.removeItem('token')
                        setRedirect(false)
                    }
                } catch (e) {
                    console.log(e)
                }
            })()
        }
        // return () => cleanupFunction = true;
    }, [])
    console.log(redirect)
    return (
        redirect ? children : <Redirect to="/" />
    )
}
export default ProtectedRoute