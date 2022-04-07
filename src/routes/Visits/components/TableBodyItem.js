import React, {
    useState
} from 'react'
import TableBodyItemActive from './TableBodyItemActive';

const TableBodyItem = ({
    have,
    classes,
    dayHave
}) => {
    
    // const start = JSON.parse(have ? have.start : [])
    return (
        <div>
            {have ? 
            <TableBodyItemActive 
                have={have}
                classes={classes}
                // show={show}
                // setShow={setShow}
                dayHave={dayHave}
            /> :
            <div className={classes.table__body__item}></div>}
        </div>
    )
}
export default TableBodyItem