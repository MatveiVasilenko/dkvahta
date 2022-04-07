import React from 'react'
import ContextUsers from './../../context/Users/ContextUsers';
import classes from './scan.module.scss'
import NET from './../../network';
import Preloader from './../../components/ui/Preloader/Preloader';
import NewYear from './NewYear';

const Scan = () => {
    const [preload, setPreload] = React.useState(0)
    const [scan, setScan] = React.useState()
    const [value, setValue] = React.useState('')
    const [count, setCount] = React.useState(0)
    const [people, setPeople] = React.useState({
        name: '',
        surname: '',
        fullname: '',
        type: '',
        status: '',
        image: '',
        collective_id: ''
    })

    const {stateMain} = React.useContext(ContextUsers)

    React.useEffect(() => {

        const time = new Date();
        const year = time.getFullYear()
        const day = String(time.getDate()).length === 1 ? '0' + String(time.getDate()) : String(time.getDate())
        const month = String(time.getMonth() + 1).length === 1 ? '0' + String(time.getMonth() + 1) : String(time.getMonth() + 1)
        const hour = time.getHours()
        const minutes = time.getMinutes()
        console.log(month)
        //срезаем получаемый код пользователя (значение 11)
        let code = value.slice(11)
        if (code){
            // Блок убирающий нули из получаемого кода пользователя
            const first = Number(code.substr(0,1))
            const second = Number(code.substr(1,1))
            if (first === 0) {
                code = code.slice(1)
                if(second === 0) {
                    code = code.slice(1)
                    console.log(code)
                }
            }
            const [user] = stateMain.users.filter((elem) => elem.id === Number(code))
            if (user) {
                if (user.companies_id) {
                    let type = null

                    const scanEmployer = async () => {
                        try {
                            const url = `${NET.APP_URL}/employer`
                            const response = await fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    id: user.id,
                                    idComp: user.companies_id,
                                    date: `${year}-${month}-${day}`,
                                    time: `${hour}-${minutes}`
                                })
                            })
                            const result = await response.text()
                            if (result === 'yet') {
                                if (user.companies_id === 1) {
                                    type = "Уже был(а) сегодня на работе"
                                } else if (user.companies_id > 2 && user.companies_id < 999) {
                                    type = "Уже был(а) сегодня на занятии"
                                } else if (user.companies_id === 999) {
                                    type = "Добро пожаловать"
                                }
                            } else if (result === 'start') {
                                if (user.companies_id === 1) {
                                    type = "Приход на работу"
                                } else if (user.companies_id > 2 && user.companies_id < 999) {
                                    type = "Зарегистрирован приход на занятие"
                                } else if (user.companies_id === 999) {
                                    type = "Добро пожаловать"
                                }
                            } else if (result === 'end') {
                                if (user.companies_id === 1) {
                                    type = "Уход с работы"
                                } else if (user.companies_id > 2 && user.companies_id < 999) {
                                    type = "Зарегистрирован уход с занятия"
                                } else if (user.companies_id === 999) {
                                    type = "Добро пожаловать"
                                }
                            }

                            const [company] = stateMain.companies.filter((comp, index) => comp.id === Number(user.companies_id))
                            setPeople({
                                name: user.name,
                                surname: user.surname,
                                fullname: user.fullname,
                                type: type,
                                status: user.statusPay,
                                image: user.image,
                                companies_id: user.companies_id,
                                companyName: company.title
                            })
                            console.log(company.title)
                        } catch (e) {
                            console.log(e)
                        }
                    }
                    scanEmployer()                    
                }
                // setPeople({
                //     name: user.name,
                //     surname: user.surname,
                //     type: user.type_id,
                //     status: user.statusPay,
                //     image: user.image,
                //     collective_id: user.companies_id
                // })
            } else if (user === undefined) {
                alert('Отсутствует в базе данных')
            }
            
            code = 0
            setCount(0)
            setValue('')
        }
        
    }, [scan])
    return (
        <div className={classes.scan}>
            <Preloader preload={preload} />
            <div className={classes.title}>Ласкаво просимо!</div>
            <div className={classes.subtitle}>Піднесить будь-ласка карту до сканера</div>
            <div style={{textAlign: "center"}}>
                <input value={value} onChange={(e) => {
                    if (count > 0 && count < 12) {
                        setPreload(1)
                    }
                    setScan(false)
                    setValue(e.target.value)
                    setCount(count + 1)
                    //Устанавливает количество проверяемых символов (значение 12)
                    if (count > 12) {
                        setScan(true)
                        setPreload(0)
                    }

                }} />
            </div>
            {scan ? (
            <div>
                <div style={{display: 'flex'}}>
                    <div className={classes.scan__image} style={{width: '200px'}}>
                        <img style={{width: '100%'}} src={`${NET.WEB_URL}/storage/${people.image.substring(6,30)}`} />
                    </div>
                    <div className={classes.scan__name}>
                        <div>Вітаємо:</div>
                        <div>{people.surname} {people.name}</div>                         
                    </div>
                </div>
                <div className={classes.scan__type}>
                    {/* {people.companies_id === 1 ? 'Сотрудник ДК': people.companies_id === 3 ? "ОТ 'Грани'": people.companies_id === 4 ? "НТП 'Forte music'": people.companies_id === 5 ? "ОТЄТ 'Релеве'": people.companies_id === 999 ? "Почесний гість" : ''} */}
                    {people.companyName}
                </div>
                {/* <div className={classes.scan__type}>
                    {people.collective_id}
                </div> */}
                <div style={{background: people.status === 1 ? 'green' : people.status === 2 ? 'red' : people.status === 0 ? '': ''}}>
                    {people.status === 1 ? 'Оплачено' : people.status === 2 ? 'Критический должник' : people.status === 0 ? '': ''}
                </div>
                <div className={classes.scan__status}>
                    {people.type}
                </div>
                <div className={classes.snow}></div>

            </div>
            
            ) : <></>}
        </div>
    )
}
export default Scan