import React from 'react'
import Admin from '../../layouts/admin/Admin';
import GroupView from './../../views/admin/group/GroupView';
import ContextUsers from './../../context/Users/ContextUsers';

const Collective = () => {
    const {stateMain} = React.useContext(ContextUsers)
    const role = stateMain?.auth?.type ? stateMain.auth.type : 'admin'
    return (
        <Admin 
            role={role}
            title="Колективи"
            >
            <GroupView 
                role={role}
                
                />
        </Admin>
    )
}
export default Collective