import React, {
    useState, useMemo
} from 'react'
import Modal from '../../../../widgets/modal/Modal'
import QRCode from './QRCode'

const QrModal = ({
    showModalQr,
    setShowModalQr,
    classes,
    activeId
}) => {
   
    return (
        <Modal
            showModal={showModalQr}
            setShowModal={setShowModalQr}
            title="Створення QR-коду"
        >
            <QRCode 
                id={activeId}
                setShowQrcode={setShowModalQr}
                classes={classes}
            />
        </Modal>
    )
}
export default QrModal