import React from 'react'
import classes from './../../../project/styles/ui-styles.module.scss'

const Button = ({
    text,
    onClick
}) => {
    return (
        <div className={classes.buttonWrapper}>
            <button
                className={classes.button}
                onClick={onClick}
            >
                {text}
            </button>
         </div>
    )
}
export default Button