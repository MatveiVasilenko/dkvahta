import React, {
    useState, useMemo
} from 'react'
import NET from './../../../../network';
import Modal from './../../../../widgets/modal/Modal';

const DeleteModal = ({
    showModalDelete,
    setShowModalDelete,
    activeId,
    classes,
    data,
    setEventsData
}) => {
    const deleteHandler = async () => {
        const url = `${NET.APP_URL}/events/${activeId}`
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                companies_id: data?.companies_id
            })
        }).then(response => response)
        const result =  await res.json()
        if (res.status === 200) {
            setEventsData(result.data)
            setShowModalDelete(false)
        }
    }
    return (
        <Modal
            showModal={showModalDelete}
            setShowModal={setShowModalDelete}
            title={`Видаліти період`}
        >
            <div>{data?.date} з {data?.start} до {data?.end}</div>
            <div className={classes.deleteBtnWrapper}>
                <button className={classes.deleteBtnWrapper__btn} onClick={deleteHandler}>Так</button>
                <button className={classes.deleteBtnWrapper__btn} onClick={() => setShowModalDelete(false)}>Ні</button>
            </div>
        </Modal>
    )
}
export default DeleteModal