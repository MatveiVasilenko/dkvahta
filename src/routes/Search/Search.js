import React from 'react'
import Admin from '../../layouts/admin/Admin';
import ContextUsers from './../../context/Users/ContextUsers';
import SearchView from './../../views/admin/search/SearchView';

const Search = () => {
    const {stateMain} = React.useContext(ContextUsers)
    const role = stateMain?.auth?.type ? stateMain.auth.type : 'admin' 
    return (
        <Admin 
            role={role}
            title="Пошук користувачів"
            >
            <SearchView role={role}/>
        </Admin>
    )
}
export default Search