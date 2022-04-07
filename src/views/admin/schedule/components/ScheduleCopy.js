import React, {
    useState, useEffect
} from 'react'
import YEAR from './../../../../time';
import NET from './../../../../network';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy} from '@fortawesome/free-solid-svg-icons'
import Modal from '../../../../widgets/modal/Modal';

const ScheduleCopy = ({
    week,
    companyId,
    classes,
    eventsData,
    setEventsData,
    setValueDate,
    valueDate,
    setShowModalLastTime
}) => {
    useEffect(() => {
        setValueDate({
            period: YEAR[week - 1].value.map(el => el.date),
            nextPeriod: YEAR[week].value.map(el => el.date),
            companies_id: companyId
        })
    }, [week, companyId])
    const [showModalNoCopy, setShowModalNoCopy] = useState(false)

    
    const handleCopy = async (type) => {
        let dataValueDate = valueDate
        if (type === 'mounth') {
            let period = []
            let nextPeriod = []
            for(let i = 0; i < 4; i++) {
                YEAR[week - 1].value.map(el => {
                    period.push(el.date)
                })
                YEAR[week + i].value.map(el => {
                    nextPeriod.push(el.date)
                })
            }
            dataValueDate = {
                period,
                nextPeriod,
                companies_id: companyId
            }
        }
        const dateRequest = new Date(dataValueDate.nextPeriod[0])
        let dateNow = new Date()
        dateNow.setDate(dateNow.getDate() - 1);
        //Тут можно скинуть на > для снятия защиты
        if (dateRequest <= dateNow) {
            setShowModalLastTime(true)
        } else {
            let canCopy = true
            eventsData.map((ev) => {
                dataValueDate.nextPeriod.map((val) => {
                    if (ev.date === val) {
                        canCopy = false
                    }
                })
            })
            if (canCopy) {
                try {
                    const url = `${NET.APP_URL}/events/copy`
                    const response = await fetch(url, {
                        method: 'POST',
                        // mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataValueDate)
                    })
                    const data = await response.json()
                    setEventsData(data.data)
                } catch (e) {
                    console.log(e)
                }
            } else {
                console.log(dataValueDate)
                setShowModalNoCopy(true)
            }
        }
        
        
    }
    const sendCopyPeriod = async () => {
        setShowModalNoCopy(false)
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
            const data = await response.json()
            setEventsData(data.data)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className={classes.filterCopy}>
            <div onClick={handleCopy} className={classes.filterCopyItem}>
                <button 
                    className={classes.filterCopyBtn}
                    >
                    <FontAwesomeIcon icon={faCopy}/>                
                </button>
                <div>Тиждень</div>
            </div>
            <div onClick={() => handleCopy('mounth')} className={classes.filterCopyItem}>
                <button 
l                    className={classes.filterCopyBtn}
                    >
                    <FontAwesomeIcon icon={faCopy}/>                
                </button>
                <div>Місяць</div>
            </div>
            {showModalNoCopy && <Modal
                showModal={showModalNoCopy}
                setShowModal={setShowModalNoCopy}
                title={`Попередження`}
            >
                <div className={classes.modalScheduleBody}>У періоді в який Ви робите копію - вже є розклад у обраних днях. Після підтверження операції новий розклад перезапише старий. Ви впевнені?</div>
                <div className={classes.deleteBtnWrapper}>
                    <button className={classes.deleteBtnWrapper__btn} onClick={sendCopyPeriod}>Скопіювати</button>
                    <button className={classes.deleteBtnWrapper__btn} onClick={() => setShowModalNoCopy(false)}>Відмініти</button>
                </div>
            </Modal>}
        </div>
    )
}
export default ScheduleCopy