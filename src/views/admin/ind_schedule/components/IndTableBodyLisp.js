import React from 'react'

const IndTableBodyLisp = ({
    classes,
    iventsData
}) => {
    return (
        <div className={classes.tableBody__lisp}>
            {iventsData.fusers.map((fuser, idx) => {
                return (
                    <div className={classes.tableBody__lisp__item}>{idx + 1}. {fuser.surname} {fuser.name}</div>
                )
            })}
        </div>
    )
}
export default IndTableBodyLisp