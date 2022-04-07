import React, {
    useState, useEffect
} from 'react'
import Modal from '../../../../widgets/modal/Modal'
import NET from '../../../../network';
import SelectSearch from './../../../../widgets/editor/cells/SelectSearch';

const ReturnModal = ({
    showModalReturn,
    setShowModalReturn,
    activeId,
    classes,
    activeCompanyId,
    setQs
}) => {
    const [dataItem, setDataItem] = useState({
        companies_id: activeCompanyId
    })
    useEffect(() => {
        setDataItem({
            companies_id: activeCompanyId
        })
    }, [activeCompanyId])
    const returnHandler = async () => {
        const url = `${NET.APP_URL}/fusers-return/${activeId}`
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataItem)
        }).then(response => response)
        setQs('')
        setShowModalReturn(false)
        return await res.json()
    }
    return (
        <Modal
            showModal={showModalReturn}
            setShowModal={setShowModalReturn}
            title="Відновити користувача"
        >
            <div className={classes.returnWrapper}>
                <SelectSearch 
                    title="Оберіть колектив(групу)"
                    dataItem={dataItem}
                    setDataItem={setDataItem}
                    classes={classes}
                    attribute="companies_id"
                    routeSearch="companies"
                    net={NET}
                />
            </div>
            <div className={classes.deleteBtnWrapper}>
                <button className={classes.deleteBtnWrapper__btn} onClick={returnHandler}>Так</button>
                <button className={classes.deleteBtnWrapper__btn} onClick={() => setShowModalReturn(false)}>Ні</button>
            </div>
        </Modal>
    )
}
export default ReturnModal