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
        setState(document.querySelector('canvas').toDataURL())
        setShow(true)
    }, [])
    
    if (String(id).length === 1) {
        id = `00${id}`
    } else if(String(id).length === 2) {
        id = `0${id}`
    } 
    return (
        <div className={classes.qrWrapper}>
            <QR 
                value={`https://101${id}`}
                size={200}
            />
            {show ? <a className={classes.qrWrapper__btn} href={state} download onClick={() => {
                setShowQrcode(false)
            }}>Загрузить</a>: <></>}
            {/* {show ? <button onClick={downloadCode}>Загрузить</button>: <></>} */}
        </div>
       
         
    )
}
export default QRCode