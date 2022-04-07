import React from 'react'
import YEAR, { TIME_SHORT } from './../../../../time';

const IndTableHead = ({
    classes,
    week
}) => {
    return (
        <div className={classes.tableHead}>
            {/* <div className={classes.tableHead__info}>
                <div className={classes.tableHead__info__week}>День тиждня</div>
                <div className={classes.tableHead__info__day}>Час</div>
            </div> */}
            <div>
                <div className={classes.tableHead__weeks}>
                    {YEAR[week].value.map((day) => {
                        return <div className={classes.tableHead__weeks__item}>{day.date}</div>
                    })}
                </div>
                <div className={classes.tableHead__days}>
                    {YEAR[week].value.map((day) => 
                        TIME_SHORT.map((t) => {
                            if (t.charAt(3) === '0') {
                                return <div style={{
                                    'font-weight': '700'
                                }} className={classes.tableHead__days__item}>{t.substring(0, 2)}</div>
                            } else {
                                return <div className={classes.tableHead__days__item}>{t}</div>
                            } 
                        })
                    )}
                </div>
            </div>
        </div>
    )
}
export default IndTableHead