import React, {
    useState, useEffect
} from 'react'
import classes from './../../../project/styles/views/ind_schedule-styles.module.scss'
import GridFilter from './../../../widgets/grid/controls/GridFilter';
import gridStyles from './../../../project/styles/widgets/grid-styles.module.scss'
import ScheduleFilterData from './../schedule/components/ScheduleFilterData';
import ScheduleCopy from './../schedule/components/ScheduleCopy';
import getWeek from './../../../components/function/getWeek';
import NET from './../../../network';
import { getData } from './../../../common/utils';
import IndTable from './components/IndTable';
import NoCopyModal from './components/NoCopyModal';
import IndScheduleCopy from './components/IndScheduleCopy';
import Loader from '../../../widgets/loader/Loader';
import IndScheduleLegend from './components/IndScheduleLegend';


const IndScheduleView = () => {
    const [activeFilter, setActiveFilter] = useState('1')
    const weeks = getWeek(4)
    const [week, setWeek] = useState(weeks)
    const [iventsData, setIventsData] = useState(false)

    useEffect(() => {
        (async () => {
            const data = await getData(`${NET.APP_URL}/ivents?companies_id=${activeFilter}`)
            setIventsData(data.data)
        })()
    }, [activeFilter])
    const [showModalNoCopy, setShowModalNoCopy] = useState(false)
    const [filterParams, setFilterParams] = useState([])


    return (
        <div className={classes.wrapper}>
            <div className={classes.head}>      
                <GridFilter 
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    classes={gridStyles}
                    compStyle={classes}
                    routeFilter="companies"
                    net={NET}
                    filterParams={filterParams}
                    setFilterParams={setFilterParams}
                />
                <ScheduleFilterData 
                    week={week}
                    setWeek={setWeek}
                    classes={classes}
                />
                <IndScheduleCopy
                    week={week}
                    companyId={activeFilter}
                    classes={classes}
                    iventsData={iventsData}
                    setIventsData={setIventsData}
                    // valueDate={valueDate}
                    // setValueDate={setValueDate}
                    // setShowModalLastTime={setShowModalLastTime}
                />
            </div>
            <IndScheduleLegend 
                classes={classes}
            />
            <div>
                {iventsData ? <IndTable 
                    classes={classes}
                    iventsData={iventsData}
                    week={week}
                    setIventsData={setIventsData}
                /> : <Loader />}
            </div>
            {showModalNoCopy && <NoCopyModal 
                showModalNoCopy={showModalNoCopy}
                setShowModalNoCopy={setShowModalNoCopy}
                classes={classes}
            />}
        </div>
    )
}
export default IndScheduleView