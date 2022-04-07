import React from 'react'
import Admin from '../../layouts/admin/Admin';
import Navbar from '../../layouts/admin/Navbar';
import VisitsData from './modules/VisitsData';
import ContextUsers from './../../context/Users/ContextUsers';

const Visits = () => {
    const {stateMain} = React.useContext(ContextUsers)
    const role = stateMain?.auth?.type ? stateMain.auth.type : 'admin' 
    return (
        <Admin 
            role={role}
            title="Статистика відвідувань"
            >
            <VisitsData role={role}/>
        </Admin>
    )
}
export default Visits