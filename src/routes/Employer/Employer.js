import React from 'react'
import Navbar from '../../layouts/admin/Navbar';
import EmployerData from './../../modules/Employer/EmpolyerData';
import NET from './../../network';
import ContextUsers from './../../context/Users/ContextUsers';

const Employer = () => {
    const {stateMain, dispatchMain} = React.useContext(ContextUsers)
    const role = stateMain?.auth?.type ? stateMain.auth.type : 'admin'
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${NET.APP_URL}/eventsfusers`
                const response = await fetch(url, {
                    method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
                })
                const result = await response.json()
                
                dispatchMain({
                    type: "FETCH_EVENTS",
                    payload: result
                })
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()        
    }, [])
    return (
        <div style={{display: 'flex'}}>
            <Navbar />
            <EmployerData />
        </div>
    )
}
export default Employer