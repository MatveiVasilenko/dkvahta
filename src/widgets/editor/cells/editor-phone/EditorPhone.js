import React from 'react'
import PhoneInput from 'react-phone-input-2'

const EditorPhone = ({
    title,
    placeholder,
    classes,
    dataItem,
    setDataItem,
    attribute,
    errors
}) => {
    return (
        <div className={classes.editor__item}>
            <div className={classes.editor__item__title}>
                {title}
            </div>
            <div className={errors && errors.length > 0 ? [classes.editor__item__input, classes.editor__input__error].join(' ') : classes.editor__item__input} >
                <PhoneInput 
                    country={'ua'} 
                    placeholder={placeholder} 
                    value={dataItem[attribute]} 
                    onChange={(e) => {
                        setDataItem({
                            ...dataItem,
                            [attribute]: e
                        })
                    }}
                />
            </div>
            <div className={classes.editor__error}>
                {errors && errors.length > 0 && errors.map((err, idx) => (
                    <div key={`err${attribute}${idx}`}>{err}</div>
                ))}
            </div>
        </div>
    )
}
export default EditorPhone