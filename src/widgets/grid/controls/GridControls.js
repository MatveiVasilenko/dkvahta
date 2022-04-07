import React, {
    useState
} from 'react' 
import GridFilter from './GridFilter';
import { ExportCSV } from './excel/ExportCSV';

const GridControls = ({
    activeFilter,
    setActiveFilter,
    routeFilter,
    styles,
    net,
    gridData
}) => {
    const [filterParams, setFilterParams] = useState([])

    return (
        <div className={styles.gridControls}>
            <GridFilter
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                classes={styles}
                routeFilter={routeFilter}
                net={net}
                filterParams={filterParams}
                setFilterParams={setFilterParams}
            />
            <ExportCSV 
                csvData={gridData}
                fileName="excel-data"
                styles={styles}
                filterParams={filterParams}
                activeFilter={activeFilter}
            />
        </div>
    )
}
export default GridControls