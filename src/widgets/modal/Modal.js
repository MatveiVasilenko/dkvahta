import React from 'react'
import classes from './modal-styles.module.scss'
import ModalHeader from './ModalHeader'

const Modal = ({
    children,
    showModal,
    setShowModal,
    title,
    funcCloseModal = false
}) => {
    const closeModal = () => {
        setShowModal(false)
        if (funcCloseModal) {
            funcCloseModal()
        }
    }
    return (
        <div className={showModal ? [classes.modalWrapper, classes.modalWrapper__active].join(' ') : classes.modalWrapper}>
            <ModalHeader 
                classes={classes}
                title={title}
                closeModal={closeModal}
            />
            {children}
        </div>
    )
}
export default Modal