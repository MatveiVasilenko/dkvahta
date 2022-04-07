import classes from './navbar.module.scss'
import React, {
    useState
} from 'react'
import { Link, Redirect } from 'react-router-dom';
import { faLandmark, faClock, faListOl, faUserFriends, faUserCog, faTrash, faSignOutAlt, faSearch, faRss} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Navbar = ({
    role
}) => {
    const [exit, setExit] = useState(true)
    const handlerExit = () => {
        localStorage.setItem('token', '')
        setExit(false)
    }
    return (
        <div className={classes.navbar}>
            {/* <div style={{padding: '0 20px'}}>
                <img style={{width: "100%"}} src={`${NET.WEB_URL}/storage/logo.png`} />
            </div> */}
            <div className={classes.link}>
                <Link to="/general">
                    <FontAwesomeIcon icon={faLandmark}/>
                </Link>
            </div>
            {(role === 'editor' || role === 'super') && <div className={classes.link}>
                <Link to="/schedule">
                    <FontAwesomeIcon icon={faClock}/>
                </Link>
            </div>}
            {(role === 'editor' || role === 'super') && <div className={classes.link}>
                <Link to="/ind_schedule">
                    <FontAwesomeIcon icon={faClock}/>
                </Link>
            </div>}
            {(role === 'editor' || role === 'super' || role === 'money') && <div className={classes.link}>
                <Link to="/visits">
                    <FontAwesomeIcon icon={faListOl}/>
                </Link>
            </div>}
            <div className={classes.link}>
                <Link to="/collective">
                    <FontAwesomeIcon icon={faUserFriends}/>
                </Link>
            </div>
            {(role === 'editor' || role === 'super') && <div className={classes.link}>
                <Link to="/companies">
                    <FontAwesomeIcon icon={faUserCog}/>
                </Link>
            </div>}
            {<div className={classes.link}>
                <Link to="/search">
                    <FontAwesomeIcon icon={faSearch}/>
                </Link>
            </div>}
            {(role === 'editor' || role === 'super' || role === 'money') && <div className={classes.link}>
                <Link to="/actions">
                    <FontAwesomeIcon icon={faRss}/>
                </Link>
            </div>}
            {(role === 'editor' || role === 'super') && <div className={classes.link}>
                <Link to="/trash">
                    <FontAwesomeIcon icon={faTrash}/>
                </Link>
            </div>}
            {exit ? <div 
                    className={classes.link}
                    onClick={handlerExit}
                    >
                <div>
                    <FontAwesomeIcon icon={faSignOutAlt}/>
                </div>
            </div> : <Redirect to="/" />}
        </div>
    )
}
export default Navbar