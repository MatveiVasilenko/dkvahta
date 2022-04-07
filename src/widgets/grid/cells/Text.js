import React from 'react'

const Text = ({
    value,
    name,
    width,
    styles,
    customStyles
}) => {
    return (
        <div style={{
            width: width,
            'min-width': width 
        }} className={[styles.gridRowItem, customStyles?.gridRowItem].join(' ')}>
            <div>{name}</div>
        </div>
    )
}
export default Text