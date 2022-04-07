import React from 'react'

const Image = ({
    dataItem,
    setDataItem,
    title,
    attribute,
    classes
}) => {
    return (
        <div className={classes.editor__item}>
            <div>{title}</div>
                <input type="file" value={dataItem.img} onChange={(e) => {
                    // const file = e.target.files[0];
                    setDataItem({
                        ...dataItem,
                        [attribute]: e.target.files[0]
                    })
                }}/>
        </div>
    )
}
export default Image