import React, {
    useState, useMemo
} from 'react'
import Editor from '../../../../widgets/editor/Editor'
import Modal from '../../../../widgets/modal/Modal'
import NET from '../../../../network';
// import { getFields } from './../utils';

const ShowModalInfo = ({
    showModal,
    setShowModal,
    dataItem,
    setDataItem,
    createModalConfig,
    role,
}) => {
    // const fields = useMemo(() => getFields(role), [])
    
    // const afterSuccess = () => {
    //     console.log('Success')
    // }
    const output = dataItem.action ? JSON.parse(dataItem.action).output : false
    const oldValue = dataItem.action ? JSON.parse(dataItem.action).oldValue : false
    return (
        <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            title={createModalConfig.title}
        >
            <div style={{
                width: '400px'
            }}>
                <div style={{
                    marginBottom: 12
                }}>
                    <div style={{
                            fontSize: 20,
                            fontWeight: 500,
                            marginBottom: 10
                        }}>Вхідні дані</div>
                    {output && Object.keys(output).map((el) => (
                        <div style={{
                            display: 'flex'
                        }}>
                            <div style={{
                                fontWeight: '700',
                                marginRight: '12px'
                            }}>{el}:</div>
                            <div>{output[el]}</div>
                        </div>
                    ))}
                </div>
                <div style={{
                    marginBottom: 12
                }}>
                    <div style={{
                            fontSize: 20,
                            fontWeight: 500,
                            marginBottom: 10
                        }}>До редагування</div>
                    {oldValue && Object.keys(oldValue).map((el) => (
                        <div style={{
                            display: 'flex'
                        }}>
                            <div style={{
                                fontWeight: '700',
                                marginRight: '12px'
                            }}>{el}:</div>
                            <div>{oldValue[el]}</div>
                        </div>
                    ))}
                </div>
                
            </div>
        </Modal>
    )
}
export default ShowModalInfo