import React from 'react'

const Image = ({
    value,
    name,
    width,
    styles,
    customStyles,
    net
}) => {
    return (
        <div style={{
            width: width,
            'min-width': width 
        }} className={[styles.gridRowItem, customStyles?.gridRowItem].join(' ')}>
            <div style={{background: name ? 'transparent' : '#ccc'}} className={styles.gridImage}>
                {name ? <img className={styles.gridImageItem} src={`${net.WEB_URL}/storage/${name.substring(6,40)}`} />:
                <div></div>}
            </div>
        </div>
    )
}
export default Image