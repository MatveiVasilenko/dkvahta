import React from 'react'
import Admin from '../../layouts/admin/Admin';
import ContextUsers from './../../context/Users/ContextUsers';
import ActionsView from './../../views/admin/actions/ActionsView';

const Actions = () => {
    const {stateMain} = React.useContext(ContextUsers)
    const role = stateMain?.auth?.type ? stateMain.auth.type : 'admin'
    return (
        <Admin 
            role={role}
            title="Дії"
            >
            <ActionsView 
                role={role}
                />
        </Admin>
    )
}
export default Actions