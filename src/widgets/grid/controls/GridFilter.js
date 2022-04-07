import React, {
    useState, useEffect
} from 'react'
import { getData } from '../../../common/utils'

const GridFilter = ({
    activeFilter,
    setActiveFilter,
    classes,
    compStyle,
    routeFilter,
    net,
    staticData = false,
    options = [],
    setFilterParams,
    filterParams
}) => {

    useEffect(() => {
        staticData ? 
            setFilterParams(options) :
        (async () => {
            const data = await getData(`${net.APP_URL}/${routeFilter}`)
            setFilterParams(data.data)
        })()
    }, [])
    return (
        <select className={[classes.gridFilter, compStyle?.gridFilter].join(' ')} value={activeFilter} onChange={(e) => {
            setActiveFilter(e.target.value)
        }}>
            {filterParams && filterParams.map((el, idx) => (
                <option value={el.id} key={`opti${idx}`}>{el.title}</option>
            ))}
        </select>
    )
}
export default GridFilter