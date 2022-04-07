import React, {
    useState
} from 'react'
import FilterCompany from './../../../modules/GLOBAL/FilterCompany/FilterCompany';
import classes from '../visits.module.scss'
import gridStyles from './../../../widgets/grid/grid-styles.module.scss'
import { MOUNTH } from '../../../time';
import { getData } from './../../../common/utils';
import NET from './../../../network';
import GridFilter from './../../../widgets/grid/controls/GridFilter';
import { getDayWeek, optionsMonth, optionsYear } from './../initData';
import TableBodyItem from './../components/TableBodyItem';
const VisitsData = () => {
    const [company, setCompany] = React.useState(1)
    const now = new Date()
    const monthDefault = now.getMonth() + 1
    const yearDefault = now.getFullYear()
    const [monthFilter, setMonthFilter] = React.useState(`0${monthDefault}`)
    const [yearFilter, setYearFilter] = React.useState(`${yearDefault}`)
    //Preloader
    const [preload, setPreload] = React.useState(1)
    const [visitsData, setVisitsData] = useState({
        users: [],
        events: [],
        eventusers: []
    })
    const [filterCol, setFilterCol] = useState([])
    const [filterMonth, setFilterMonth] = useState([])
    const [filterYear, setFilterYear] = useState([])
    React.useEffect(() => {
        // console.log(stateMain.users)    
        // if (stateMain.users.length === 0) {
        //     fetchData(dispatchMain, setPreload)    
        // } else {
        //     setPreload(0)
        // }
        (async () => {
            const data = await getData(
                `${NET.APP_URL}/visits?companies_id=${company}&month=${monthFilter}&year=${yearFilter}`
            )
            setVisitsData({
                ...visitsData,
                users: data.data.users ? data.data.users : [],
                events: data.data.events ? data.data.events : [],
                eventusers: data.data.eventusers ? data.data.eventusers : []
            })
        })()
    }, [company, monthFilter, yearFilter])
    // Получаем пользователей в нужной компании
    const users = visitsData.users
    // Получаем события по выбранному месяцу
    let events = visitsData.events
    // Фильтрую только по ноябрю!
    console.log(monthFilter)
    events = events.filter(el => el.date.substr(5,2) === monthFilter)
    // const eventsUsers = visitsData. 
    const eventUsers = visitsData.eventusers
    if (!visitsData && !visitsData.users) return null
    return (
        <div className={classes.wrapper}>
            {/* <Preloader preload={preload}/> */}
            <div className={classes.headerWrapperFilter}>
                <div className={classes.headerWrapperFilter__item}>
                    <GridFilter
                        activeFilter={monthFilter}
                        setActiveFilter={setMonthFilter}
                        classes={gridStyles}
                        routeFilter="companies"
                        net={NET}
                        staticData={true}
                        options={optionsMonth}
                        filterParams={filterMonth}
                        setFilterParams={setFilterMonth}
                    />
                </div>
                <div className={classes.headerWrapperFilter__item}>
                    <GridFilter
                        activeFilter={yearFilter}
                        setActiveFilter={setYearFilter}
                        classes={gridStyles}
                        routeFilter="companies"
                        net={NET}
                        staticData={true}
                        options={optionsYear}
                        filterParams={filterYear}
                        setFilterParams={setFilterYear}
                    />
                </div>
                <div className={classes.headerWrapperFilter__item}>
                    <GridFilter
                        activeFilter={company}
                        setActiveFilter={setCompany}
                        classes={gridStyles}
                        routeFilter="companies"
                        net={NET}
                        filterParams={filterCol}
                        setFilterParams={setFilterCol}
                    />
                </div>
                <div className={classes.headerWrapperLegend}>
                    <div className={classes.headerWrapperLegend__item}>
                        <div className={[classes.headerWrapperLegend__item__cube, classes.headerWrapperLegend__item__cube_blue].join(' ')}></div>
                        <div>Відвідування без порушень</div>
                    </div>
                    <div className={classes.headerWrapperLegend__item}>
                        <div className={[classes.headerWrapperLegend__item__cube, classes.headerWrapperLegend__item__cube_yellow].join(' ')}></div>
                        <div>Вихід ще не зафіксований</div>
                    </div>
                    <div className={classes.headerWrapperLegend__item}>
                        <div className={[classes.headerWrapperLegend__item__cube, classes.headerWrapperLegend__item__cube_red].join(' ')}></div>
                        <div>Відвідування з порушеннями</div>
                    </div>
                </div>
            </div>
            <div className={classes.main}>
                <div>
                    <div className={classes.table__head__title}>ПІБ\Дата</div>
                    {/* Выводим список членов коллектива */}
                    <div className={classes.table__lisp}>
                        {users.map((user, index) => {
                            return (
                                <div key={`user${index}`}>{index + 1}. {user.surname} {user.name}</div>
                            )
                        })}
                    </div>
                </div>
                {/* Выводим даты и совпадение по датам */}
                <div className={classes.dates}>
                    {MOUNTH.filter(el => +el.year === +yearFilter).filter(el => +el.mounth === +monthFilter)[0].data.map((day, index) => {
                        let [dayHave] = events.filter((ev, index) => ev.date.substr(8,2) === day)
                        return (
                            dayHave ? (
                                <div>
                                    <div key={index} className={[classes.table__head__day, classes.table__head__day_active].join(' ')}>
                                        <div>
                                            <div className={classes.table__head__day__number}>{dayHave.date.substr(8,2)}</div>
                                            <div>{getDayWeek(MOUNTH.filter(el => +el.year === +yearFilter).filter(el => +el.mounth === +monthFilter)[0].dayWeek, index)}</div>
                                        </div>
                                        <div className={classes.table__head__date}>
                                            <div>{dayHave.start}</div>
                                            <div>{dayHave.end}</div>
                                        </div>
                                    </div>
                                    <div>
                                        {users.map((user, index) => {
                                            let have = eventUsers.filter(el => el.events_id === dayHave.id)
                                            if (have) {
                                                [have] = have.filter(el => el.fusers_id === user.id)
                                                
                                            } 
                                            return (
                                                <TableBodyItem 
                                                    have={have}
                                                    classes={classes}
                                                    dayHave={dayHave}
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                            ): (
                                <div>
                                    <div key={index} className={classes.table__head__day} style={{}}>
                                        <div className={classes.table__head__day__number}>
                                            {day}
                                        </div>
                                        <div>{getDayWeek(MOUNTH[Number(monthFilter)].dayWeek, index)}</div>
                                        <div className={classes.dates__time}>
                                            
                                        </div>
                                    </div>
                                    <div>
                                        {users.map((user, index) => {
                                            
                                            return (
                                                <div>
                                                    <div className={classes.table__body__item}></div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>
                                
                            )
                        
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default VisitsData