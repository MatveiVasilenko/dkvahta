import React from 'react'

const Select = ({
    title,
    placeholder,
    classes,
    dataItem,
    setDataItem,
    attribute,
    options
}) => {
    return (
        <div className={classes.editor__item}>
            <div className={classes.editor__item__title}>
                {title}
            </div>
            <select value={dataItem[attribute]} className={classes.editor__item__select} onChange={(e) => {
                    setDataItem({
                            ...dataItem,
                            [attribute]: e.target.value
                    })
                }} >
                    {/* <option>Выберите роль</option> */}
                {
                    options.map((elem, idx) => (
                        <option key={`opt${title, idx}`} value={elem.value}>{elem.alias}</option>
                    ))
                }
            </select>
        </div>
    )
}
export default Select