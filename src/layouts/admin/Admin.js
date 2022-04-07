import React from 'react'
import Scan from '../../widgets/scan/Scan';
import Navbar from './Navbar';
import classes from './../../project/styles/layouts/admin-styles.module.scss'
const Admin = ({
    children,
    role,
    title
}) => {
    return (
        <div className={classes.adminContainer}>
            <div className={classes.adminContainerNavbar}>
                <Navbar role={role}/>
            </div>
            <div className={role === 'admin' ? classes.adminContainerBody : classes.adminContainerBodyAdmin}>
                <div className={classes.adminContainerTitle}>{title}</div>
                {children}
            </div>
            {role === 'admin' && <div className={classes.adminContainerScan}>
                <Scan />
            </div>}
        </div>
    )
}
export default Admin