import React, {
    useState
} from 'react'

const IndTableCell = ({
    classes,
    valueTime,
    type
}) => {
    const [show, setShow] = useState(false)
    return (
        <div
            className={type === 'goodEvent' ? classes.tableBody__row__item__ivent : [classes.tableBody__row__item__ivent, classes.tableBody__row__item__ivent_warning].join(' ')}
            onMouseEnter={() => {
                valueTime && setShow(true)
            }}
            onMouseLeave={() => setShow(false)}
            >
            {show && <div className={classes.tableBody__row__item__ivent__info}>{valueTime}</div>}
        </div>
    )
}
export default IndTableCell