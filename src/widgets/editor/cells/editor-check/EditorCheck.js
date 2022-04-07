import React, {
    useState, useEffect
} from 'react'
import { NET } from './../../../../network';

const EditorCheck = ({
    net,
    classes,
    options,
    dataItem,
    attribute,
    setDataItem,
    title, 
    link,
    url,
    errors
}) => {
    const [check, setCheck] = useState(false)
    const handleChange = () => {
        setCheck(!check)
        setDataItem({
            ...dataItem,
            [attribute]: !check
        })
    }
    useEffect(() => {
        if (dataItem[attribute]) {
            console.log(dataItem[attribute])
            setCheck(Boolean(dataItem[attribute]))
        }
    }, [dataItem, setDataItem])
    const handlerLink = () => {
        window.open(`${net.FRONT_URL}${url}`, '_blank')
    }
    return (
        <div style={{'margin-bottom': '16px'}}>
            <div style={{'margin-bottom': '0'}} className={classes.editor__checkWrapper} onClick={handleChange}>
                <div 
                    className={check ? [classes.editor__check, classes.editor__check__active].join(' ') : classes.editor__check}
                    >                    
                </div>
                <div className={classes.editor__checkTitle}>
                    <div>{title ? title : ''}</div>
                    <div 
                        className={classes.editor__checkTitle__link}
                        onClick={handlerLink}
                        >{link ? link: ''}</div>
                </div>
            </div>
            <div className={classes.editor__error}>
                {errors && errors.length > 0 && errors.map((err, idx) => (
                    <div key={`err${attribute}${idx}`}>{err}</div>
                ))}
            </div>
        </div>
    )
}
export default EditorCheck