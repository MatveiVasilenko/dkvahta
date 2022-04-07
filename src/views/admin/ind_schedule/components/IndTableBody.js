import React, {
    useState
} from 'react'
import YEAR, { TIME_SHORT } from './../../../../time';
import IndTableCell from './IndTableCell';
import NET from './../../../../network';
import ModalLastTime from '../../schedule/components/ModalLastTime';
import IndDeleteModal from './IndDeleteModal';

const IndTableBody = ({
    classes,
    iventsData,
    week,
    iventItem,
    setIventItem,
    setIventsData
}) => {
    const [showModalLastTime, setShowModalLastTime] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const addIvent = async (
        t,
        date,
        fuser
    ) => {
        const dateRequest = new Date(date.date)
        let dateNow = new Date()
        dateNow.setDate(dateNow.getDate() - 1);
        if (dateRequest < dateNow) {
            setShowModalLastTime(true)
        } else {
            if (iventItem?.date_start && iventItem?.time_start && fuser.id === iventItem.fusers_id) {
                // setIventItem({
                //     ...iventItem,
                //     date_end: date.date,
                //     time_end:`${t}-00`,
                // })
                try {
                    const url = `${NET.APP_URL}/ivents`
                    const response = await fetch(url, {
                        method: 'POST',
                        // mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            date_start: iventItem.date_start,
                            date_end: date.date,
                            time_start: iventItem.time_start,
                            time_end: t,
                            fusers_id: iventItem.fusers_id,
                            companies_id: fuser.companies_id
                        })
                    })
                    const data = await response.json()
                    if (response.status === 200) {
                        setIventsData(data.data)
                        setIventItem({})
                    }
                } catch (e) {
                    console.log(e)
                }
            } else {
                setIventItem({
                    date_start: date.date,
                    time_start: t,
                    fusers_id: fuser.id
                })
            }
        }
        
    }
    const [deleteData, setDeleteData] = useState(false)
    const deleteEvent = async (dayStart, dayEnd, fuser) => {
        if (showDeleteModal) {
            const dateRequest = new Date(dayEnd[0]?.data?.date_end)
            let dateNow = new Date()
            dateNow.setDate(dateNow.getDate() - 1);
            if (dateRequest < dateNow) {
                setShowModalLastTime(true)
            } else {
                let idFuser = null
                if (dayStart[0]?.data){
                    idFuser = dayStart[0]?.data.id
                } else {
                    idFuser = dayEnd[0]?.data.id
                }
                try {
                    const url = `${NET.APP_URL}/ivents/${idFuser}`
                    const response = await fetch(url, {
                        method: 'DELETE',
                        // mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            companies_id: fuser.companies_id
                        })
                    })
                    const data = await response.json()
                    if (response.status === 200) {
                        setIventsData(data.data)
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            setShowDeleteModal(false)
        } else {
            setShowDeleteModal(true)
            setDeleteData({
                dayStart,
                dayEnd,
                fuser
            })
        }
        
    }
    return (
        <div>
            
            <div>
                {iventsData.fusers.map((fuser) => {
                    let ivents = iventsData.ivents.filter(el => el.fuser_id === fuser.id)
                    let stateSchedule = false
                    let timeStartValue = false
                    let timeEndValue = false
                    let startIvent = false
                    return (
                        <div className={classes.tableBody__row}>
                            {YEAR[week].value.map((date, idx) => 
                                TIME_SHORT.map((t, id) => {
                                    if (id === 0) {
                                        timeStartValue = false
                                        timeEndValue = false
                                        startIvent = false
                                    }
                                    //Проверка даты календаря - даты события начальная дата
                                    let dayStart = ivents[0]?.ivents?.filter(iv => iv.data.date_start === date.date)
                                    
                                    //Проверка времени календарая - времени события
                                    let timeStart = dayStart?.filter(tm => tm.data.time_start === t)

                                    //Проверка даты календаря - даты события конечная дата
                                    let dayEnd = ivents[0]?.ivents?.filter(iv => iv.data.date_end === date.date)
                                    let timeEnd = dayEnd?.filter(tm => tm.data.time_end === t)

                                    //Изменение состояние событий расписания
                                    if (timeStart && timeStart.length > 0) {
                                        timeStartValue = timeStart
                                        timeEndValue = false
                                        stateSchedule = true
                                    } else if (timeEnd && timeEnd.length > 0) {
                                        timeStartValue = false
                                        timeEndValue = timeEnd
                                        stateSchedule = false
                                    }
                                    
                                    //Проверка посещения
                                    let ivent = false
                                    if (dayStart && dayStart.length > 0) {
                                        let iventArr = dayStart[0]?.ivents_fuser?.filter(dIv => dIv.date === date.date)
                                        // ТУТ НАДО ПРОДОЛЖИТЬ получаса
                                        ivent = iventArr?.filter(tmIv => (tmIv.time.substring(0,2) === t.substring(0,2)) && (((+tmIv.time.substring(3,5) >= +t.substring(3,5) && t.substring(3,5) === '30' && +tmIv.time.substring(3,5) > 30) || (+tmIv.time.substring(3,5) >= +t.substring(3,5) && t.substring(3,5) === '00' && +tmIv.time.substring(3,5) <= 30))))
                                        if (ivent && ivent.length > 0) {
                                            if ((iventArr.length % 2) === 0){
                                                // Здесь проверка - если первый элемент в паре событий, то старт +, если второй то старт - 
                                                let first = 1
                                                iventArr.map((ivArrElem, idx) => {
                                                    if (ivArrElem.id === ivent[0].id) {
                                                        first = idx + 1
                                                    }
                                                    // return ivArrElem
                                                })
                                                if (first === 1) {
                                                    startIvent = true
                                                } else {
                                                    startIvent = false
                                                }
                                            } else if (dayStart[0]?.data?.date_start !== dayStart[0]?.data?.date_end) {
                                                console.log(dayStart[0]?.data?.date_start, dayStart[0]?.data?.date_end)
                                                startIvent = true
                                            } else {
                                                console.log(iventArr)
                                            }
                                        }
                                    } else {
                                        let iventArr = dayEnd[0]?.ivents_fuser?.filter(dIv => dIv.date === date.date)
                                        ivent = iventArr?.filter(tmIv => tmIv.time.substring(0,2) === t.substring(0,2))
                                        if (ivent && ivent.length > 0) {
                                            startIvent = false
                                        }
                                    }
                                    return (
                                        <div key={`ivent${id}`} className={classes.tableBody__row__itemWrapper}>
                                            {
                                                (ivent && ivent?.length > 0) || startIvent ? <IndTableCell classes={classes} type="goodEvent" valueTime={ivent?.length ? ivent[0].time : false}/> : <div></div>
                                            }
                                            {
                                                ivent && ivent?.length > 0 && timeStartValue && timeStartValue.length > 0 ? <IndTableCell classes={classes} valueTime={ivent[0].time}/> : <div></div>
                                            }
                                            {
                                                ivent && ivent?.length > 0 && timeEndValue && timeEndValue.length > 0 && +ivent[0].time.substring(0,2) <= timeEndValue[0].data.time_end.substring(0,2) ? <IndTableCell classes={classes} valueTime={ivent[0].time}/> : <div></div>
                                            }
                                            {
                                                (timeStart && timeStart.length > 0) || (timeEnd && timeEnd.length > 0) || stateSchedule || (iventItem.fusers_id === fuser.id && iventItem.date_start === date.date && iventItem.time_start.substring(0,2) === t.substring(0,2)) || (iventItem.fusers_id === fuser.id && iventItem.date_end === date.date && iventItem.time_end.substring(0,2) === t.substring(0,2))  ? 
                                                    <div onClick={() => deleteEvent(dayStart, dayEnd, fuser)} className={[classes.tableBody__row__item, classes.tableBody__row__item_active].join(' ')}></div> :
                                                    <div onClick={() => addIvent(t, date, fuser)} className={classes.tableBody__row__item}></div>
                                            }
                                        </div>
                                    )                    
                                })
                            )}
                        </div>
                    )
                })}
            </div>
            {showModalLastTime && <ModalLastTime
                showModalLastTime={showModalLastTime}
                setShowModalLastTime={setShowModalLastTime}
                classes={classes}
            />}
            {showDeleteModal && <IndDeleteModal 
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                classes={classes}
                deleteEvent={deleteEvent}
                deleteData={deleteData}
            />}
        </div>
    )
}
export default IndTableBody