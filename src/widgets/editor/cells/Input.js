import React, {
    useEffect, useState
} from 'react'

const Input = ({
    title,
    placeholder,
    classes,
    dataItem,
    setDataItem,
    attribute,
    errors
}) => {
    // const [val, setVal] = useState()
    // useEffect(() => {
    //     if (dataItem[attribute]) {
    //         setVal(dataItem[attribute])
    //     }
    // }, [])
    return (
        <div className={classes.editor__item}>
            <div className={classes.editor__item__title}>
                {title}
            </div>
            <div className={errors && errors.length > 0 ? [classes.editor__item__input, classes.editor__input__error].join(' ') : classes.editor__item__input} >
                <input placeholder={placeholder} value={dataItem[attribute]} type="text" onChange={(e) => {
                    setDataItem({
                            ...dataItem,
                            [attribute]: e.target.value
                    })
                }} />
            </div>
            <div className={classes.editor__error}>
                {errors && errors.length > 0 && errors.map((err, idx) => (
                    <div key={`err${attribute}${idx}`}>{err}</div>
                ))}
            </div>
        </div>
    )
}
export default Input