import React from 'react'

const GridHeadItem = ({
    val,
    width,
    styles,
    customStyles
}) => {
    return (
        <div style={{
            width: width || 150,
            'min-width': width || 150,
        }} className={[styles.gridHeadItem, customStyles?.gridHeadItem].join(' ')}>{val}</div>
    )
}
export default GridHeadItem