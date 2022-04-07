import React from 'react'
import classes from './preloader.module.scss'

const Preloader = ({preload}) => {
    return (
        <div style={{opacity: preload}} className={classes.preloader}></div>
    )
}
export default Preloader