import React from 'react'
import Admin from '../../layouts/admin/Admin';
import CompaniesView from './../../views/admin/companies/CompaniesView';
import ContextUsers from './../../context/Users/ContextUsers';

const Collective = () => {
    const {stateMain} = React.useContext(ContextUsers)
    const role = stateMain?.auth?.type ? stateMain.auth.type : 'admin'
    return (
        <Admin 
            role={role}
            title="Керування колективами"
            >
            <CompaniesView role={role}/>
        </Admin>
    )
}
export default Collective