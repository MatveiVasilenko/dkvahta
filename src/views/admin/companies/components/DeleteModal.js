import React, {
    useState, useMemo
} from 'react'
import Modal from '../../../../widgets/modal/Modal'
import { getFields } from './../utils';
import NET from './../../../../network';

const DeleteModal = ({
    showModalDelete,
    setShowModalDelete,
    activeId,
    classes
}) => {
    const deleteHandler = async () => {
        const url = `${NET.APP_URL}/companies/${activeId}`
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response)
        setShowModalDelete(false)
        return await res.json()
    }
    return (
        <Modal
            showModal={showModalDelete}
            setShowModal={setShowModalDelete}
            title="Видалити колектив(групу)"
        >
            <div className={classes.deleteBtnWrapper}>
                <button className={classes.deleteBtnWrapper__btn} onClick={deleteHandler}>Так</button>
                <button className={classes.deleteBtnWrapper__btn} onClick={() => setShowModalDelete(false)}>Ні</button>
            </div>
        </Modal>
    )
}
export default DeleteModal