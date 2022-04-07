import React, {
    useState, useMemo
} from 'react'
import Modal from './../../../../widgets/modal/Modal';

const ModalLastTime = ({
    showModalLastTime,
    setShowModalLastTime,
    classes
}) => {
    return (
        <Modal
            showModal={showModalLastTime}
            setShowModal={setShowModalLastTime}
            title={`Попередження`}
        >
            <div className={classes.modalScheduleBody}>Нажаль немає можливості виконати дію, тому що обраний період вже у минулому часі. Оберіть майбутню дату</div>
            <div className={classes.deleteBtnWrapper}>
                <button className={classes.deleteBtnWrapper__btn} onClick={() => setShowModalLastTime(false)}>Гаразд</button>
            </div>
        </Modal>
    )
}
export default ModalLastTime