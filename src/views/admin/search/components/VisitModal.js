import React, {
    useState, useMemo
} from 'react'
import Modal from '../../../../widgets/modal/Modal'
import NET from '../../../../network';
import Select from './../../../../widgets/editor/cells/Select';

const VisitModal = ({
    showModalVisit,
    setShowModalVisit,
    activeId,
    classes
}) => {
    const [success, setSuccess] = useState(false)
    const [statusSuccess, setStatusSuccess] = useState('')
    const [dataItem, setDataItem] = useState({
        text: 'Забув картку'
    })
    const options = [
        {
            value: 'forget',
            alias: 'Забув картку'
        },
        {
            value: 'no-card',
            alias: 'Немає картки'
        },
    ]

    const scanningFunc = async () => {
        console.log(activeId)
        if (activeId) {
            const time = new Date();
            const year = time.getFullYear()
            const day = String(time.getDate()).length === 1 ? '0' + String(time.getDate()) : String(time.getDate())
            const month = String(time.getMonth() + 1).length === 1 ? '0' + String(time.getMonth() + 1) : String(time.getMonth() + 1)
            const hour = String(time.getHours()).length === 1 ? '0' + String(time.getHours()) : String(time.getHours())
            const minutes = String(time.getMinutes()).length === 1 ? '0' + String(time.getMinutes()) : String(time.getMinutes())
            const url = `${NET.APP_URL}/employer`
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: activeId,
                    date: `${year}-${month}-${day}`,
                    time: `${hour}-${minutes}`,
                    text: dataItem.text
                })
            }).then(async (response) => {
                if (response.status === 200) {
                    const result = await response.json()
                    setShowModalVisit(false)
                    setSuccess(true)
                    setStatusSuccess(result.text)
                } else if (response.status === 404) {
                   
                }
            })          
        }
    }
    return (
        <>
            <Modal
                showModal={showModalVisit}
                setShowModal={setShowModalVisit}
                title="Відмітити користувача"
            >
                <div className={classes.returnWrapper}>
                    <Select
                        title="Оберіть причину відсутності картки"
                        dataItem={dataItem}
                        setDataItem={setDataItem}
                        classes={classes}
                        options={options}
                    />
                </div>
                <div className={classes.deleteBtnWrapper}>
                    <button className={classes.deleteBtnWrapper__btn} onClick={scanningFunc}>Так</button>
                    <button className={classes.deleteBtnWrapper__btn} onClick={() => setShowModalVisit(false)}>Ні</button>
                </div>
            </Modal>

            {success && <Modal
            showModal={success}
            setShowModal={setSuccess}
            title="Успіх"
        >
            <div>{statusSuccess}</div>
            <div className={classes.deleteBtnWrapper}>
                <button className={classes.deleteBtnWrapper__btn} onClick={() => setSuccess(false)}>OK</button>
            </div>
        </Modal>}
        
        </>
    )
}
export default VisitModal