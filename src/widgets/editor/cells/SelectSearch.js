import React, {
    useState, useEffect
} from 'react'
import { getData } from '../../../common/utils'

const SelectSearch = ({
    title,
    placeholder,
    classes,
    dataItem,
    setDataItem,
    attribute,
    routeSearch,
    net
}) => {
    const [options, setOptions] = useState([])
    useEffect(() => {
        (async () => {
            const data = await getData(`${net.APP_URL}/${routeSearch}`)
            setOptions(data.data)
        })()
    }, [])
    return (
        <div className={classes.editor__item}>
            <div className={classes.editor__item__title}>
                {title}
            </div>
            <select value={dataItem[attribute]} className={classes.editor__item__select} onChange={(e) => {
                    setDataItem({
                            ...dataItem,
                            [attribute]: e.target.value
                    })
                }} >
                    {/* <option>Выберите роль</option> */}
                {
                    options.map((elem, idx) => (
                        <option key={`opt${idx}`} value={elem.id}>{elem.title}</option>
                    ))
                }
            </select>
        </div>
    )
}
export default SelectSearch