import React from 'react'
import QR from 'qrcode.react'

const QRCode = ({
    id, 
    setShowQrcode,
    classes
}) => {
    const [state, setState] = React.useState(false)
    const [show, setShow] = React.useState(false)
    React.useEffect(() => {        
        setShow(true)
    }, [setShowQrcode])
    
    if (String(id).length === 1) {
        id = `000${id}`
    } else if(String(id).length === 2) {
        id = `00${id}`
    } else if(String(id).length === 3) {
        id = `0${id}`
    } 
    return (
        <div className={classes.qrWrapper}>
            <QR 
                value={`https://20${id}`}
                size={200}
            />
            {show ? <a className={classes.qrWrapper__btn} href={state} download onClick={() => {
                setState(document.querySelector('canvas').toDataURL())
                setShowQrcode(false)
            }}>Загрузить</a>: <></>}
            {/* {show ? <button onClick={downloadCode}>Загрузить</button>: <></>} */}
        </div>
       
         
    )
}
export default QRCode