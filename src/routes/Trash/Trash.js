import React from 'react'
import Admin from '../../layouts/admin/Admin';
import TrashView from '../../views/admin/trash/TrashView';
import ContextUsers from './../../context/Users/ContextUsers';


const Trash = () => {  
    const {stateMain} = React.useContext(ContextUsers)
    const role = stateMain?.auth?.type ? stateMain.auth.type : 'admin'   
    return (
        <Admin 
            role={role}
            title="Корзина"
            >
            <TrashView role={role}/>
        </Admin>
    )
}
export default Trash