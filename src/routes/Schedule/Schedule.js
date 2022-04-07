import React from 'react'
import Navbar from '../../layouts/admin/Navbar';
import ContextUsers from './../../context/Users/ContextUsers';
import NET from './../../network';
import ScheduleData from '../../modules/Schedule/ScheduleData';
import Admin from '../../layouts/admin/Admin';
import ScheduleView from './../../views/admin/schedule/ScheduleView';


const Schedule = () => {
    const {stateMain} = React.useContext(ContextUsers)
    const role = stateMain?.auth?.type ? stateMain.auth.type : 'admin'    
    return (
        <Admin role={role}>
            <ScheduleView role={role}/>
            {/* <ScheduleData role={role}/> */}
        </Admin>
    )
}
export default Schedule