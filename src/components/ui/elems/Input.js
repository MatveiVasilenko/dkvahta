import React from 'react'
import classes from './../../../project/styles/ui-styles.module.scss'

const Input = ({
    value,
    setValue,
    placeholder,
    name,
    type
}) => {
    return (
        <div className={classes.inputWrapper}>
            <input 
                className={classes.input}
                placeholder={placeholder}
                value={value[name]} 
                onChange={(e) => {
                    setValue({
                        ...value,
                        [name]: e.target.value
                    })
                }} 
                type={type}
            />
         </div>
    )
}
export default Input