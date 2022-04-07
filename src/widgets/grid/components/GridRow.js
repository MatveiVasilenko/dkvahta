import React from 'react'
import GridSwitcher from './../GridSwitcher';

const GridRow = ({
    elems,
    elem,
    styles,
    numberRow,
    customStyles,
    config,
    gridHandlers
}) => {
    return (
        <div className={[styles.gridRow, customStyles?.gridWrapper].join(' ')}>
            {config.counter &&<div style={{
                width: 30,
                'min-width': 30 
            }} className={[styles.gridRowItem, customStyles?.gridRowItem].join(' ')}>{numberRow + 1}</div>}
            {
                elems.filter(el => el.name !== 'id').filter(el => el.name !== 'companies_id').map((cell, idx) => (
                    <GridSwitcher 
                        styles={styles}
                        key={`switchGrid${idx}`}
                        type={cell.type || 'text'}
                        name={elem[cell.name] || ''}
                        value={elem[cell.value] || ''}
                        width={cell.width || 150}
                        gridHandlers={gridHandlers[cell.name]}
                        idRow={elem.id}
                        net={config.net}
                        elem={elem}
                    />
                ))
            }
        </div>
    )
}
export default GridRow