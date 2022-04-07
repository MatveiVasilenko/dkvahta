import React, {
    useMemo, useState
} from 'react'
import { Redirect } from 'react-router-dom';
import { getUser } from './utils';
import classes from './../../../project/styles/views/auth-styles.module.scss'
import Input from './../../../components/ui/elems/Input';
import Button from './../../../components/ui/elems/Button';
import NET from './../../../network';
import Error from './components/Error';

const AuthView = () => {

    const [value, setValue] = React.useState({
        login: '',
        password: ''
    })
    const [route, setRoute] = React.useState(false)
    const [error, setError] = useState(false)
    const signIn = async () => {
        try {
            const res = await fetch(`${NET.APP_URL}/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(value)
            })
            const data = await res.json()
            if (res.status === 200) {
                console.log(data)
                localStorage.setItem('token', data.token)
                setRoute(true)
            } else if (res.status === 401) {
                setError([data.error])
            } else if (res.status === 422) {
                console.log(data)
                setError([data.error.login && data.error.login[0], data.error.password && data.error.password[0]])
            }
        } catch (e) {
            console.log(e)
        }
    }
    // onScan.attachTo(document);
    // // Register event listener
    // document.addEventListener('scan', function(sScancode, iQuantity) {
    //     alert(iQuantity + 'x ' + sScancode); 
    // });
    return (
        <>
            <div className={classes.wrapper}>
                <div>Авторизація у системі</div>
                <div className={classes.title}>DKVAHTA</div>
                <Input 
                    value={value}
                    setValue={setValue}
                    placeholder="Введите логин"
                    name="login"
                    type="text"
                />
                <Input 
                    value={value}
                    setValue={setValue}
                    placeholder="Введите пароль"
                    name="password"
                    type="password"
                />
                {error && error.map((err) => (
                    <Error 
                        text={err}
                        classes={classes}
                    />
                ))}
                {!route ? <Button 
                            onClick={signIn} 
                            text="Увійти"
                            /> : <Redirect to="/general" />}
            </div>
        </>
    )
}
export default AuthView