import React, {
    useState, useEffect, useContext
} from 'react'
import fetchData from '../../components/function/fetchData'
import NET from '../../network'
import YEAR from './../../time';
import ContextUsers from './../../context/Users/ContextUsers';

const ScheduleCopy = ({
    week,
    companyId
}) => {
    const {dispatchMain} = useContext(ContextUsers)
    useEffect(() => {
        setValueDate({
            period: YEAR[week - 1].value.map(el => el.date),
            nextPeriod: YEAR[week].value.map(el => el.date),
            companies_id: companyId
        })
    }, [week, companyId])
    const [valueDate, setValueDate] = useState({
        period: YEAR[week - 1].value.map(el => el.date),
        nextPeriod: YEAR[week].value.map(el => el.date),
        companies_id: companyId
    })
    const handleCopy = async () => {
        // setPreload(1)
        console.log(valueDate)
        try {
            const url = `${NET.APP_URL}/events/copy`
            const response = await fetch(url, {
                method: 'POST',
                // mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(valueDate)
            })
            const result = await response.text()
            console.log(result)
            fetchData(dispatchMain)
            // setPreload(0)
            // dispatchMain({
            //     type: "FETCH_DATA",
            //     payload: result
            // })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div style={{padding: '0 10px'}}>
            <button onClick={handleCopy}>Скопировать период</button>
        </div>
    )
}
export default ScheduleCopy