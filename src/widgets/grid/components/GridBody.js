import React from 'react'
import GridRow from './GridRow';

const GridBody = ({
    tbody,
    elems,
    styles,
    customStyles,
    config,
    gridHandlers
}) => {
    return (
        <div className={[styles.gridBody, customStyles?.gridWrapper].join(' ')}>
            {tbody.map((elem, idx) => (
                <GridRow
                    styles={styles}
                    elems={elems} 
                    elem={elem}
                    numberRow={idx}
                    key={`trow${idx}`}
                    config={config}
                    gridHandlers={gridHandlers}
                />
            ))}
        </div>
    )
}
export default GridBody