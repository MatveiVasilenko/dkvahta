import React from 'react' 
import ContextUsers from './../../../context/Users/ContextUsers';

const FilterCompany = ({setCompany}) => {
    const {stateMain} = React.useContext(ContextUsers)
    return (
        <select onChange={(e) => {
            setCompany(e.target.value)
        }}>
            {stateMain.companies.map((elem, index) => {
                return (
                <option key={index} value={elem.id}>{elem.title}</option>
                )
            })}
        </select>
    )
}
export default FilterCompany