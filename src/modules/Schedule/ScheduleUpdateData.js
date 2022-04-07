import React, {
    useState, useEffect
} from 'react'
import NET from './../../network';
import ContextUsers from './../../context/Users/ContextUsers';
import { TIME } from '../../time';
import fetchData from './../../components/function/fetchData';
import Preloader from './../../components/ui/Preloader/Preloader';

const ScheduleUpdateData = ({updateDate, setShowUpdate}) => {
    // For preloading state with opacity
    const [preload, setPreload] = useState(0)
    useEffect(() => {
        setValueDate({
            ...valueDate,
            date: updateDate.date,
            companies_id: updateDate.companies_id
        })
    }, [updateDate])
    const [valueDate, setValueDate] = React.useState({
        start: '',
        end: '',
        date: updateDate.date,
        companies_id: updateDate.companies_id
    }) 
    const {dispatchMain} = React.useContext(ContextUsers)

    const handleUpdate = async () => {
        setPreload(1)
        console.log(valueDate)
        try {
            const url = `${NET.APP_URL}/events`
            const response = await fetch(url, {
                method: 'POST',
                // mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(valueDate)
            })
            const result = await response.text()
            fetchData(dispatchMain)
            setPreload(0)
            // dispatchMain({
            //     type: "FETCH_DATA",
            //     payload: result
            // })
        } catch (e) {
            console.log(e)
        }
        setValueDate({
            start: '',
            end: '',
            date: updateDate.date,
            companies_id: updateDate.companies_id
        })
        setShowUpdate(false)
    }

    const handleDelete = async () => {
        console.log(valueDate)
        try {
            const url = `${NET.APP_URL}/eventsdel`
            const response = await fetch(url, {
                method: 'POST',
                // mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(valueDate)
            })
            const result = await response.text()
            fetchData(dispatchMain)
            // dispatchMain({
            //     type: "FETCH_DATA",
            //     payload: result
            // })
        } catch (e) {
            console.log(e)
        }
    }
    
    return (
        <div>
            <Preloader preload={preload} />
            <div>{updateDate.date}</div>
            <div>
                <div>Start</div>
                <select onChange={(e) => {
                    setValueDate({
                        ...valueDate,
                        start: e.target.value
                    })
                }}>
                    <option value="08-00">Выбрать время</option>
                    {TIME.map((elem, index) => {
                        return (
                            <option key={index} value={elem}>{elem}</option>
                        )
                    })}                    
                </select>
            </div>
            <div>
                <div>End</div>
                <select onChange={(e) => {
                    setValueDate({
                        ...valueDate,
                        end: e.target.value
                    })
                }}>
                    <option value="08-00">Выбрать время</option>
                    {TIME.map((elem, index) => {
                        return (
                            <option key={index} value={elem}>{elem}</option>
                        )
                    })}    
                </select>
            </div>
            <button onClick={() => handleUpdate()}>Обновить</button>
            <button onClick={() => handleDelete()}>Очистить</button>
        </div>
    )
}
export default ScheduleUpdateData