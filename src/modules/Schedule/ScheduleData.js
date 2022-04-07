import React from 'react'
import ContextUsers from './../../context/Users/ContextUsers';
import {TIME} from './../../time';
import YEAR from './../../time';
import classes from './shedule.module.scss'
import classNames from 'classnames'
import ScheduleUpdateData from './ScheduleUpdateData';
import ScheduleFilter from './ScheduleFilter';
import ScheduleFilterData from './ScheduleFilterData';
import getWeek from './../../components/function/getWeek';
import ScheduleCopy from './ScheduleCopy';


const ScheduleData = () => {
    

    const [companyId, setCompanyId] = React.useState(1)
    const [updateDate, setUpdateDate] = React.useState({
        date: '',
        companies_id: companyId
    })
    const [showUpdate, setShowUpdate] = React.useState(false)
    const {stateMain} = React.useContext(ContextUsers)


    const weeks = getWeek(4)
    const [week, setWeek] = React.useState(weeks)

    const events = stateMain.events.filter(el => el.companies_id === companyId)
    
    console.log(events)
    const updateSchedule = (date) => {
        setShowUpdate(true)
        setUpdateDate({
            ...updateDate,
            date: date,
            companies_id: companyId
        })
    }
    return (
        <div>
            {/* <div className={classes.schedule__filter}>
                <ScheduleFilter setCompanyId={setCompanyId} />
                <ScheduleFilterData week={week} setWeek={setWeek} />
                <ScheduleCopy 
                    week={week} 
                    companyId={companyId}
                    />
            </div> */}
            <div className={classes.schedule}>
                <div className={classes.timeline}>
                    {TIME.map((elem, index) => (
                        <div key={index} className={classNames(classes.timeline__data, classes.schedule__cells)}>
                            {elem}
                        </div>
                    ))}
                </div>  
                <div className={classes.weekline}>
                    {YEAR[week].value.map((date, index) => {
                        const [day] = events.filter(el => el.date === date.date)
                        let timeStart = "00-00"
                        return (
                            <div key={index} style={{display: 'flex', flexDirection: 'column'}}>
                                <div onClick={() => updateSchedule(date.date)} className={classNames(classes.weekline__data, classes.schedule__cells, classes.weekline__data__top)}>
                                    {date.date}
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
                                            timeStart === time ? (<div key={index} style={{background: '#50895B'}} className={classes.weekline__data}>
                                                
                                            </div>) : (<div key={index} className={classes.weekline__data}>
                                                
                                            </div>)
                                        )
                                    })}
                            </div>
                        )
                    })}
                </div>  
                {showUpdate ? <ScheduleUpdateData setShowUpdate={setShowUpdate} updateDate={updateDate} /> : <></>}       
            </div>
        </div>
    )
}
export default ScheduleData