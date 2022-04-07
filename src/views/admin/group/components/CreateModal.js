import React, {
    useState, useMemo
} from 'react'
import Editor from '../../../../widgets/editor/Editor'
import Modal from '../../../../widgets/modal/Modal'
import NET from './../../../../network';
import { getFields } from './../utils';

const CreateModal = ({
    showModalCreate,
    setShowModalCreate,
    dataItem,
    setDataItem,
    afterSuccess,
    createModalConfig,
    role,
}) => {
    const fields = useMemo(() => getFields(role), [showModalCreate, setShowModalCreate])
    
    const funcCloseModal = () => {
        setDataItem({
            type_id: '1',
            companies_id: '1',
            email: 'Учасник',
            statusPay: '0',
            status: 'no-support',
            password: '111111',
            date_money: ''
        })
    }    
    
    return (
        <Modal
            showModal={showModalCreate}
            setShowModal={setShowModalCreate}
            title={createModalConfig.title}
            funcCloseModal={funcCloseModal}
        >
            <Editor 
                fields={fields.fields}
                dataItem={dataItem}
                setDataItem={setDataItem}
                route={createModalConfig.type === 'create' ? 'createfusers' : 'updatefusers'}
                afterSuccess={afterSuccess}
                net={NET}
                createModalConfig={createModalConfig}
            />
        </Modal>
    )
}
export default CreateModal