import React, {
    useState, useMemo
} from 'react'
import Modal from './../../../../widgets/modal/Modal';

const NoCopyModal = ({
    showModalNoCopy,
    setShowModalNoCopy,
    classes
}) => {
    return (
        <Modal
            showModal={showModalNoCopy}
            setShowModal={setShowModalNoCopy}
            title={`Попередження`}
        >
            <div>Нажаль немає можливості скопіювати період, тому що у вибраному періоді вже є події. Оберіть наступний період.</div>
            <div className={classes.deleteBtnWrapper}>
                <button className={classes.deleteBtnWrapper__btn} onClick={() => setShowModalNoCopy(false)}>Гаразд</button>
            </div>
        </Modal>
    )
}
export default NoCopyModal