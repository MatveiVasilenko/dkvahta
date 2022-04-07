import React, {
    useState
} from 'react'
import { getDayWeek } from '../../../../common/utils'
import YEAR, { TIME } from '../../../../time'
import NET from './../../../../network';
import DeleteModal from './DeleteModal';

const ScheduleTable = ({
    classes,
    week,
    eventsData,
    activeFilter,
    setEventsData,
    setShowModalLastTime
}) => {
    const [fieldData, setFieldData] = useState({
        start: '',
        end: ''
    })
    const updateSchedule = () => {

    }
    const fieldHandler = async (date, time) => {
        let dateRequest = new Date(date)
        let dateNow = new Date()
        dateNow.setDate(dateNow.getDate() - 1);
        if (dateRequest < dateNow) {
            setShowModalLastTime(true)
        } else {
            if (fieldData.start && (fieldData.start.date === date)) {
                setFieldData({
                    ...fieldData,
                    end: {
                        date,
                        time
                    }
                })
                
                try {
                    const url = `${NET.APP_URL}/events`
                    const response = await fetch(url, {
                        method: 'POST',
                        // mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            start: fieldData.start.time,
                            end: time,
                            date: fieldData.start.date,
                            companies_id: activeFilter
                        })
                    })
                    const data = await response.json()
                    if (response.status === 200) {
                        setFieldData({
                            start: '',
                            end: ''
                        })
                        setEventsData(data.data)
                    }
                } catch (e) {
                    console.log(e)
                }
                
            } else {
                setFieldData({
                    ...fieldData,
                    start: {
                        date,
                        time
                    }
                })
            }
        }
        
    }
    const [deleteDay, setDeleteDay] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const deletePeriod = (day) => {
        const dateRequest = new Date(day.date)
        let dateNow = new Date()
        dateNow.setDate(dateNow.getDate() - 1);

        if (dateRequest <= dateNow) {
            setShowModalLastTime(true)
        } else {
            setDeleteDay(day)
            setShowModalDelete(true)
        }
    }
    return (
        <div className={classes.schedule}>
            <div className={classes.timeline}>
                {TIME.map((elem, index) => (
                    <div key={index} className={[classes.timeline__data].join(' ')}>
                        {elem}
                    </div>
                ))}
            </div>  
            <div className={classes.table__head}>
                {YEAR[week].value.map((date, index) => {
                    const [day] = eventsData.filter(el => el.date === date.date)
                    let timeStart = "00-00"
                    let MM = date.date.substr(5,2)
                    let DD = date.date.substr(8,2)
                    return (
                        <div key={index} style={{display: 'flex', flexDirection: 'column'}}>
                            <div onClick={() => updateSchedule(date.date)} className={classes.table__head__item}>
                                <div className={classes.table__head__item__week}>{getDayWeek(index)}</div>
                                <div>{`${DD}`}</div>
                            </div>
                                {TIME.map((time, index) => {
                                    if (day) {
                                        if (day.start === time){
                                            timeStart = time
                                        }
                                        if (timeStart !== "00-00") {
                                            if(day.end === time) {
                                                timeStart = "00-00"
                                            } else {
                                                timeStart = time
                                            }
                                        }
                                    }
                                    return (
                                        timeStart === time ? (<div onClick={() => deletePeriod(day)} key={index} style={{background: '#50895B'}} className={classes.table__head__item_cell}>
                                            
                                        </div>) : (<div
                                                        style={(fieldData.start.date === date.date || fieldData.end.date === date.date) && (fieldData.end.time === time || fieldData.start.time === time) ? {background: 'red'} : {}}
                                                        onClick={() => fieldHandler(date.date, time)} 
                                                        key={index} 
                                                        className={classes.table__head__item_cell}
                                                     >
                                            
                                        </div>)
                                    )
                                })}
                        </div>
                    )
                })}
            </div>
            <DeleteModal 
                showModalDelete={showModalDelete}
                setShowModalDelete={setShowModalDelete}
                activeId={deleteDay?.id}
                classes={classes}
                data={deleteDay}
                setEventsData={setEventsData}
            />
        </div>
    )
}
export default ScheduleTable