import React from 'react'

const CreateButton = ({
    title,
    classes,
    handlerShowCreate
}) => {
    return (
        <div
            onClick={handlerShowCreate}
            className={classes.buttonWrapper}>
            <div className={classes.buttonWrapper__btn}>{title}</div>
        </div>
    )
}
export default CreateButton