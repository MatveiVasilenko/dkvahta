import React from 'react'
import GridHeadItem from './GridHeadItem';

const GridHead = ({
    thead,
    styles,
    customStyles,
    config
}) => {
    console.log(thead)
    return (
        <div className={[styles.gridHead, customStyles?.gridHead].join(' ')}>
            {config.counter && <div style={{
                width: 30,
                'min-width': 30 
            }} className={[styles.gridHeadItem, customStyles?.gridHeadItem].join(' ')}>#</div>}
            {
                thead && thead.filter(el => el.alias !== 'id').filter(el => el.alias !== 'companies_id').map((el, idx) => (
                    <GridHeadItem
                        val={el.title}
                        width={el.width}
                        styles={styles}
                        customStyles={customStyles}
                        key={`headItem${idx}`}
                    />
                ))
            }
        </div>
    )
}
export default GridHead