import React from 'react'

const Check = ({
    value,
    styles,
    customStyles
}) => {
    console.log(value)
    return (
        <div className={[styles.gridRowItem, customStyles?.gridRowItem].join(' ')}>
            <div>{value === 'true' ? 'Да' : 'Нет'}</div>
        </div>
    )
}
export default Check