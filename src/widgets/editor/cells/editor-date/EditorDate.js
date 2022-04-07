import React, {
    useState, useEffect
} from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const EditorDate = ({
    title,
    placeholder,
    classes,
    dataItem,
    setDataItem,
    attribute,
    errors,
    config = {
        allPeriod: false
    }
}) => {
    const [showCalendar, setShowCalendar] = useState(false)
    const [showModule, setShowModule] = useState(true)
    const [check, setCheck] = useState(false)
    const handleChange = () => {
        setCheck(!check)
        if (!check) {
            setShowModule(false)
            setDataItem({
                ...dataItem,
                [attribute]: 'all'
            })
        } else {
            setShowModule(true)
            setDataItem({
                ...dataItem,
                [attribute]: ''
            })
        }
    }
    useEffect(() => {
        console.log(dataItem[attribute])
        if (dataItem[attribute] === 'all') {
            setShowModule(false)
            setCheck(true)
        }
    }, [])
    return (
        <div className={classes.editor__item}>
            <div className={classes.editor__item__title}>
                {title}
            </div>
            {showModule && <div className={errors && errors.length > 0 ? [classes.editor__item__input, classes.editor__input__error].join(' ') : classes.editor__item__input} >
                <input placeholder={placeholder} value={dataItem[attribute]} type="text" onClick={(e) => {
                    setShowCalendar(true)
                }} />
            </div>}
            {showCalendar ? <div>
                <Calendar
                    onChange={(e) => {
                        const date = new Date(e)
                        const day = String(date.getDate()).length < 2 ? `0${date.getDate()}` : date.getDate()
                        const month = String(date.getMonth()).length < 2 ? `0${date.getMonth()}` : date.getMonth()
                        const year = date.getFullYear()
                        setDataItem({
                            ...dataItem,
                            [attribute]: `${day}-${month}-${year}`
                        })
                        setShowCalendar(false)
                    }}
                    // value={}
                />
            </div> : <></>}
            <div className={classes.editor__error}>
                {errors && errors.length > 0 && errors.map((err, idx) => (
                    <div key={`err${attribute}${idx}`}>{err}</div>
                ))}
            </div>
            {config.allPeriod && <div>
                    <div style={{'margin': '12px 0'}} className={classes.editor__checkWrapper} onClick={handleChange}>
                    <div 
                        className={check ? [classes.editor__check, classes.editor__check__active].join(' ') : classes.editor__check}
                        >                    
                    </div>
                    <div className={classes.editor__checkTitle}>
                        <div>{config?.textAllPeriod}</div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
export default EditorDate