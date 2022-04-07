import React from 'react'
import YEAR from './../../time';

const ScheduleFilterData = ({week, setWeek}) => {
    const [disableBtn, setDisableBtn] = React.useState({
        next: false,
        prev: false
    })

    return (
        <div>
            <div>Выбрать неделю</div>
            <button onClick={() => {
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
            }} disabled={disableBtn.prev}>Прошедшая</button>
            <button onClick={() => {
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
            }} disabled={disableBtn.next}>Следующая</button>
        </div>
    )
}
export default ScheduleFilterData