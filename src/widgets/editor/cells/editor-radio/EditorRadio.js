import React, {
    useState
} from 'react' 

const EditorRadio = ({
    classes,
    options,
    dataItem,
    attribute,
    setDataItem,
    title
}) => {
    const [active, setActive] = useState(0)
    const handleChange = (e, idx) => {
        setActive(idx)
        console.log(e.target.value)
        setDataItem({
            ...dataItem,
            [attribute]: e.target.value
        })
    }
    return (
        <div className={classes.editor__item}>
            <div className={classes.editor__item__title}>{title}</div>
            {options.map((opt, idx) => (
                <div>
                    <input checked={idx === active ? true : false} value={opt.value} onChange={(e) => handleChange(e, idx)} name={attribute} id={`radioElem${idx}`} type="radio"/>
                    <label for={`radioElem${idx}`}>{opt.alias}</label>
                </div>
            ))}
        </div>
    )
}
export default EditorRadio