import React from 'react'
import { faTimes} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ModalHeader = ({
    title,
    classes,
    closeModal
}) => {
    return (
        <div className={classes.modal__header}>
            <div className={classes.modal__title}>{title}</div>
            <div
                className={classes.modal__header__close}
                onClick={closeModal}
            >
                <FontAwesomeIcon icon={faTimes}/>
            </div>
        </div>
    )
}
export default ModalHeader