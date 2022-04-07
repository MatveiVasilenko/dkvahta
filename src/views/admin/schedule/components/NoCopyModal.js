import React, {
    useState, useMemo
} from 'react'
import NET from '../../../../network';
import Modal from './../../../../widgets/modal/Modal';

const NoCopyModal = ({
    showModalNoCopy,
    setShowModalNoCopy,
    classes,
    valueData,
    setEventsData
}) => {
    
    return (
        <Modal
            showModal={showModalNoCopy}
            setShowModal={setShowModalNoCopy}
            title={`Попередження`}
        >
            <div>У періоді в який Ви робите копію - вже є розклад у обраних днях. Після підтверження операції новий розклад перезапише старий. Ви впевнені?</div>
            <div className={classes.deleteBtnWrapper}>
                <button className={classes.deleteBtnWrapper__btn} >Гаразд</button>
            </div>
        </Modal>
    )
}
export default NoCopyModal