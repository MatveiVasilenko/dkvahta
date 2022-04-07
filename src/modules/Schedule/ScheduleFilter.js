import React from 'react'
import ContextUsers from './../../context/Users/ContextUsers';

const ScheduleFilter = ({setCompanyId}) => {
    const {stateMain} = React.useContext(ContextUsers)

    return (
        <select onChange={(e) => {
            setCompanyId(Number(e.target.value))
        }}>
            {stateMain.companies.map((elem, index) => {
                return (
                <option key={index} value={elem.id}>{elem.title}</option>
                )
            })}
        </select>
    )
}
export default ScheduleFilter