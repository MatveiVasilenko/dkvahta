import React, {
    useState
} from 'react'
import YEAR from './../../../../time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'


const ScheduleFilterData = ({
    week, 
    setWeek,
    classes
}) => {
    const [disableBtn, setDisableBtn] = useState({
        next: false,
        prev: false
    })
    return (
            <div className={classes.filterWeeks}>
                <button 
                    className={classes.filterWeeksBtn}
                    onClick={() => {
                    if (week >= 1) {
                        setWeek(week - 1)
                        setDisableBtn({
                            ...disableBtn,
                            next: false
                        })
                    } else {
                        setDisableBtn({
                            ...disableBtn,
                            prev: true
                        })
                    }
                }} disabled={disableBtn.prev}><FontAwesomeIcon icon={faChevronLeft}/></button>
                <div className={classes.filterWeeksItem}>{YEAR[week].value[0].date}</div>
                <div>-</div>
                <div className={classes.filterWeeksItem}>{YEAR[week].value[YEAR[week].value.length - 1].date}</div>
                <button 
                    className={classes.filterWeeksBtn}
                    onClick={() => {
                    if (week < (YEAR.length - 1)) {
                        setWeek(week + 1)
                        setDisableBtn({
                            ...disableBtn,
                            prev: false
                        })
                    } else {
                        setDisableBtn({
                            ...disableBtn,
                            next: true
                        })
                    }
                }} disabled={disableBtn.next}><FontAwesomeIcon icon={faChevronRight}/></button>
            </div>       
    )
}
export default ScheduleFilterData