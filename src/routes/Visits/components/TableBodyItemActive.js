import React, {
    useState
} from 'react'

const TableBodyItemActive = ({
    have,
    classes,
    dayHave
}) => {
    const [show, setShow] = useState(false)
    const [warning, setWarning] = useState([])
    const start = have.start.length > 5 ? JSON.parse(have.start) : have.start
    const colorRed = 'rgb(204, 58, 58)'
    const colorBg = () => {
        if (Array.isArray(start)) {
            if (start.length % 2) {
                return '#e5ff00'
            } else {
                const hourStartStatic = Number(dayHave.start.substr(0, 2))
                const minuteStartStatic = Number(dayHave.start.substr(3, 2))
                const hourStartReal = Number(start[0].substr(0, 2))
                const minuteStartReal = Number(start[0].substr(3, 2))

                const hourEndStatic = Number(dayHave.end.substr(0, 2))
                const minuteEndStatic = Number(dayHave.end.substr(3, 2))
                const hourEndReal = Number(start[start.length -1].substr(0, 2))
                const minuteEndReal = Number(start[start.length - 1].substr(3, 2))

                if (hourStartStatic < hourStartReal) {
                    // setWarning(['Опоздание'])
                    return colorRed
                } else if (hourStartStatic === hourStartReal) {
                    if (minuteStartStatic < minuteStartReal) {
                        return colorRed
                    }                    
                } else {
                    if (hourEndStatic > hourEndReal) {
                        return colorRed
                    } else if (hourEndStatic === hourEndReal) {
                        if (minuteEndStatic > minuteEndReal) {
                            return colorRed
                        }
                        return 'rgb(191, 190, 255)'
                    }
                }
                return 'rgb(191, 190, 255)'
            }
        } else {
            return 'rgb(191, 190, 255)'
        }
    }
    return (
        <div 
            className={[classes.table__body__item, classes.table__body__item_active].join(' ')}
            onClick={() => setShow(!show)}
            style={{
                background: colorBg()
            }}
            >
            <div className={show ? 
                    [classes.table__body__item__info, classes.table__body__item__info_active].join(' '):
                    classes.table__body__item__info}
            >
                {Array.isArray(start) ? 
                    <div className={classes.table__body__info}>
                        <div className={classes.table__body__info__head}>
                            <div className={classes.table__body__info__head__item}>Прихід</div>
                            <div className={classes.table__body__info__head__item}>Вихід</div>
                        </div>
                        <div className={classes.table__body__info__body}>
                            {JSON.parse(have.start).map((el, idx) => (
                                <div
                                    // style={{
                                    //     color: idx === 0 && badStart ? colorRed : '#000'
                                    // }}
                                    className={classes.table__body__info__body__item} key={`have${idx}`}>
                                        {el}
                                </div>
                            ))}
                        </div>
                        <div>
                            {/* {warning.map((el, idx) => (
                                <div key={`warning${idx}`}>{el}</div>
                            ))} */}
                        </div>
                    </div> :
                    <div className={classes.table__body__item__info_old}>
                        <div>{have.start}</div>
                        <div>{have.end}</div>
                    </div>
                }
            </div>
        </div>
    )
}
export default TableBodyItemActive