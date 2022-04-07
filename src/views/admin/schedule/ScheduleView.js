import React, {
    useState, useEffect
} from 'react'
import GridFilter from '../../../widgets/grid/controls/GridFilter'
import gridStyles from './../../../project/styles/widgets/grid-styles.module.scss'
import classes from './../../../project/styles/views/schedule-styles.module.scss'
import NET from './../../../network';
import getWeek from './../../../components/function/getWeek';
import ScheduleFilterData from './components/ScheduleFilterData';
import ScheduleCopy from './components/ScheduleCopy';
import ScheduleTable from './components/ScheduleTable';
import Loader from '../../../widgets/loader/Loader';
import { getData } from './../../../common/utils';
import NoCopyModal from './components/NoCopyModal';
import ModalLastTime from './components/ModalLastTime';
import YEAR from '../../../time';

const ScheduleView = () => {
    const [activeFilter, setActiveFilter] = useState('1')
    const weeks = getWeek(4)
    const [week, setWeek] = useState(weeks)
    const [eventsData, setEventsData] = useState(false)
    const [showModalLastTime, setShowModalLastTime] = useState(false)
    const [filterParams, setFilterParams] = useState([])

    useEffect(() => {
        (async () => {
            const data = await getData(`${NET.APP_URL}/events?companies_id=${activeFilter}`)
            setEventsData(data.data)
        })()
    }, [activeFilter])
    const sendCopyPeriod = async () => {
        
    }
    const [valueDate, setValueDate] = useState({
        period: YEAR[week - 1].value.map(el => el.date),
        nextPeriod: YEAR[week].value.map(el => el.date),
        companies_id: activeFilter
    })
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
                <ScheduleCopy 
                    week={week}
                    companyId={activeFilter}
                    classes={classes}
                    eventsData={eventsData}
                    setEventsData={setEventsData}
                    valueDate={valueDate}
                    setValueDate={setValueDate}
                    setShowModalLastTime={setShowModalLastTime}
                />
            </div>
            {eventsData ? <ScheduleTable 
                classes={classes}
                week={week}
                eventsData={eventsData}
                activeFilter={activeFilter}
                setEventsData={setEventsData}
                setShowModalLastTime={setShowModalLastTime}
            />: <Loader />}
            {showModalLastTime && <ModalLastTime
                showModalLastTime={showModalLastTime}
                setShowModalLastTime={setShowModalLastTime}
                classes={classes}
            />}
        </div>
    )
}
export default ScheduleView