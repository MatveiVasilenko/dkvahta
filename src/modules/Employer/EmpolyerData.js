import React from 'react'
import ContextUsers from './../../context/Users/ContextUsers';
import NET from './../../network';

const EmployerData = () => {
    const [img, setImg] = React.useState('')
    const {stateMain} = React.useContext(ContextUsers)
    return (
        <>
            <input type="file" onChange={async (e) => {
                let formData = new FormData()
                formData.append('file', e.target.files[0], 'file.jpg')
                
                const response = await fetch(`https://www.hcmariupol.com.ua/api/data`, {
                    method: "POST",
                    headers: {
                        "Accept": "text/html",
                        'Content-Type': 'application/json'
                    },
                    // body: formData
                })
                const result = await response.json()
                console.log(result)
            }}/>
        </>
    )
}
export default EmployerData