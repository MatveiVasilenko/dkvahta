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
    createModalConfig
}) => {
    const fields = useMemo(() => getFields(), [showModalCreate])
    
    // const afterSuccess = () => {
    //     console.log('Success')
    // }

    return (
        <Modal
            showModal={showModalCreate}
            setShowModal={setShowModalCreate}
            title={createModalConfig.title}
        >
            <Editor 
                fields={fields.fields}
                dataItem={dataItem}
                setDataItem={setDataItem}
                route={'companies'}
                afterSuccess={afterSuccess}
                net={NET}
                createModalConfig={createModalConfig}
            />
        </Modal>
    )
}
export default CreateModal