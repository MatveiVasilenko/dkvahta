import React, {
    useState, useEffect
} from 'react'
import YEAR from '../../../../time';
import NET from '../../../../network';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy} from '@fortawesome/free-solid-svg-icons'

const IndScheduleCopy = ({
    week,
    companyId,
    classes,
    iventsData,
    setIventsData,
    setShowModalNoCopy
}) => {
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
    const handleCopy = async (type) => {
        let dataValueDate = valueDate
        if (type === 'mounth') {
            let period = []
            let nextPeriod = []
            for(let i = 0; i < 4; i++) {
                YEAR[week - 4 + i].value.map(el => {
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
        console.log(iventsData)
        let canCopy = true
        // iventsData.map((ev) => {
        //     dataValueDate.nextPeriod.map((val) => {
        //         if (ev.date === val) {
        //             canCopy = false
        //         }
        //     })
        // })
        if (canCopy) {
            try {
                const url = `${NET.APP_URL}/ivents/copy`
                const response = await fetch(url, {
                    method: 'POST',
                    // mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataValueDate)
                })
                const data = await response.json()
                setIventsData(data.data)
            } catch (e) {
                console.log(e)
            }
        } else {
            setShowModalNoCopy(true)
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
        </div>
    )
}
export default IndScheduleCopy