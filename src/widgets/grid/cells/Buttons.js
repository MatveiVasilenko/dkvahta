import React from 'react'
import { faEdit, faEye, faQrcode, faTrash, faUndo} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Buttons = ({
    idRow,
    value,
    gridHandlers,
    styles,
    elem
}) => {
    const buttons = Object.keys(gridHandlers || {})
    
    return (
        <div className={styles.buttonWrapper}>
            {buttons.map((button) => (
                <div className={styles.buttonWrapperItem} onClick={() => gridHandlers[button](idRow, elem)}>
                    <FontAwesomeIcon icon={
                        button === 'update' ?
                            faEdit : button === 'qr'?
                            faQrcode : button === 'delete' ?
                            faTrash : button === 'return' ?
                            faUndo : button === 'show' ?
                            faEye : ''
                    } />
                </div>
            ))}
        </div>
    )
}
export default Buttons