import React from 'react'
import ContextUsers from '../../context/Users/ContextUsers';
import Admin from '../../layouts/admin/Admin';
import IndScheduleView from './../../views/admin/ind_schedule/IndScheduleView';


const IndSchedule = () => {
    const {stateMain} = React.useContext(ContextUsers)
    const role = stateMain?.auth?.type ? stateMain.auth.type : 'admin'    
    return (
        <Admin
            title="Індивідуальний розклад" 
            role={role}
            >
            <IndScheduleView role={role}/>
        </Admin>
    )
}
export default IndSchedule