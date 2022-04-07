import React from 'react'

const Error = ({
    classes,
    text
}) => {
    return (
        <div className={classes.error}>
            <div>{text}</div>
        </div>
    )
}
export default Error