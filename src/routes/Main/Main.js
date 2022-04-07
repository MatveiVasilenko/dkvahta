import React from 'react'
import ContextUsers from './../../context/Users/ContextUsers';
import fetchData from './../../components/function/fetchData';
import Admin from '../../layouts/admin/Admin';
import MainView from './../../views/admin/main/MainView';


const Main = () => {
    const {stateMain, dispatchMain} = React.useContext(ContextUsers)
    const role = stateMain?.auth?.type ? stateMain.auth.type : 'admin'
    const name = stateMain?.auth?.name ? stateMain.auth.name : ''
 
    return (
        <Admin role={role}>
            <MainView 
                role={role}
                name={name}
                />
        </Admin>
    )
}
export default Main