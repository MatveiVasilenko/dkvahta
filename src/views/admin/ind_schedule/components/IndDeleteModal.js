import React from 'react' 
import Modal from './../../../../widgets/modal/Modal';

const IndDeleteModal = ({
    showDeleteModal,
    setShowDeleteModal,
    classes,
    deleteData,
    deleteEvent
}) => {
    console.log(deleteData)
    return (
        <Modal
            showModal={showDeleteModal}
            setShowModal={setShowDeleteModal}
            title={`Видаліти період`}
        >
            <div></div>
            <div className={classes.deleteBtnWrapper}>
                <button className={classes.deleteBtnWrapper__btn} onClick={() => deleteEvent(deleteData.dayStart, deleteData.dayEnd, deleteData.fuser)}>Так</button>
                <button className={classes.deleteBtnWrapper__btn} onClick={() => setShowDeleteModal(false)}>Ні</button>
            </div>
        </Modal>
    )
}
export default IndDeleteModal