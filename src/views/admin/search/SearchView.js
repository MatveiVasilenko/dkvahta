import React, {
    useState, useMemo
} from 'react' 
import classes from './../../../project/styles/views/search-styles.module.scss'
import NET from './../../../network';
import { getGridHandlers } from './initData';
import Input from './../../../widgets/editor/cells/Input';
import GridComponent from './../../../widgets/grid/GridComponent';
import VisitModal from './components/VisitModal';
import { getData } from './../../../common/utils';
import CreateModal from './../group/components/CreateModal';

const SearchView = ({
    role
}) => {
    const thead = [
        {
            title: 'ID',
            alias: 'id',
            width: 50
        },
        {
            title: 'Табель',
            alias: 'card_id',
            width: 70
        },
        {
            title: 'Аватар',
            alias: 'image',
            width: 70
        },
        {
            title: 'Колектив',
            alias: 'title',
            width: 200
        },
        {
            title: 'Прізвище',
            alias: 'surname',
            width: 100
        },
        {
            title: "Ім'я",
            alias: 'name',
            width: 100
        },
        {
            title: "По-батькові",
            alias: 'fullname',
            width: 120
        },
        {
            title: 'Дата',
            alias: 'date',
            width: 100
        },
        {
            title: 'Телефон',
            alias: 'login',
            width: 150
        },
        // {
        //     title: 'Оплата',
        //     alias: 'statusPay',
        //     width: 100
        // },
        // {
        //     title: 'Пільги',
        //     alias: 'status',
        //     width: 70
        // },
        {
            title: 'Дії',
            alias: 'buttons',
            width: 150
        }
    ]
    const elems = [
        {
            name: 'id',
            type: 'text',
            value: 'value',
            width: 50
            
        },
        {
            name: 'card_id',
            type: 'text',
            value: 'value',
            width: 70
            
        },
        {
            name: 'image',
            type: 'image',
            value: 'value',
            width: 70
        },
        {
            name: 'title',
            type: 'text',
            value: 'value',
            width: 200
        },
        {
            name: 'surname',
            type: 'text',
            value: 'value',
            width: 100
        },
        {
            name: 'name',
            type: 'text',
            value: 'value',
            width: 100
        },
        {
            name: 'fullname',
            type: 'text',
            value: 'value',
            width: 120
        },
        {
            name: 'date',
            type: 'text',
            value: 'value',
            width: 100
        },
        {
            name: 'login',
            type: 'text',
            value: 'value',
            width: 150
        },
        // {
        //     name: 'statusPay',
        //     type: 'text',
        //     value: 'value',
        //     width: 100
        // },  
        // {
        //     name: 'status',
        //     type: 'text',
        //     value: 'value',
        //     width: 70
        // },  
        {
            name: 'buttons',
            type: 'buttons',
            value: ['return'],
            width: 150
        }     
    ]

    const transformData = (head, body) => {
        const header = head && head.map(el => el.alias)

        const boder = body.map((elem) => {
            let accum = {}
            header.map((headItem) => {
                Object.keys(elem).map((key) => {
                    if (key === 'status') {
                        let value = ''
                        if (elem[key] === 'no-support') {
                            value = 'немає'
                        } else if (elem[key] === 'support') {
                            value = '100%'
                        } else if (elem[key] === 'support50') {
                            value = '50%'
                        }
                        return accum[key] = value
                    } else if (key === 'statusPay') {
                        let value = ''
                        if (elem[key] === '0') {
                            value = 'не опл.'
                        } else if (elem[key] === '1') {
                            value = 'розгляд'
                        } else if (elem[key] === '2') {
                            value = 'опл.'
                        }
                return accum[key] = value
                    } else if (headItem === key) {
                        accum[key] = elem[key]
                    }
                })
            })
            return accum
        })
        return {
            header: head,
            boder
        }
    }
    const [gridData, setGridData] = useState(null)
    const [activeId, setActiveId] = useState(1)
    const [showModalVisit, setShowModalVisit] = useState(false)
    const [searchText, setSearchText] = useState(false)
    const [qs, setQs] = useState('')
    const [showModalCreate, setShowModalCreate] = useState(false)
    const [dataItem, setDataItem] = useState({

    })
    const searchHandler = async (q) => {
        setQs(q)
        if (q.length > 1) {
            const data = await getData(
                `${NET.APP_URL}/search?q=${q}`
            )
            if (data.data === 'Пошук не дав результатів') {
                setSearchText(data.data)
                setGridData(null)
            } else {
                setSearchText(false)
                setGridData(transformData(thead, data.data))
            }
        }
    }
    const [createModalConfig, setCreateModalConfig] = useState({
        title: 'Створення користувача',
        type: 'create',
        btn: 'Створити'
    })
    const returnHandler = (id) => {
        setShowModalVisit(true)
        setActiveId(id)
    } 

    const updateHandler = async (id) => {
        setCreateModalConfig({
            title: 'Редагування користувача',
            type: 'edit',
            btn: 'Редагувати'
        })
        const url = `${NET.APP_URL}/users/${id}`
        const data = await getData(url)
        if (data) {
            const user = data.data
            setDataItem({
                id: user.id,
                card_id: user.card_id,
                type_id: user.id,
                companies_id: user.companies_id,
                email: user.email,
                login: user.login,
                name: user.name,
                surname: user.surname,
                fullname: user.fullname,
                statusPay: user.statusPay,
                status: user.status,
                password: user.password,
                date: user.date
            })
            setShowModalCreate(true)
        }
    }

    const afterSuccessCreate = () => {
        setShowModalCreate(false)
        searchHandler(qs)
        setDataItem({
            type_id: '1',
            companies_id: '1',
            email: 'Учасник',
            statusPay: '0',
            status: 'no-support',
            password: '111111'
        })
        setGridData(null)
    }

    const gridHandlers = useMemo(() => getGridHandlers(
        returnHandler,
        updateHandler,
        role
    ), [])

    return (
        <div className={classes.wrapper}>
            <div className={classes.input}>
                <input
                    onChange={(e) => searchHandler(e.target.value)}
                    placeholder="Пошук по-батькові, імені"
                    value={qs}
                    />
            </div>
            {searchText && <div className={classes.input__error}>{searchText}</div>}
            {gridData && <div>
                <GridComponent 
                    gridData={gridData}
                    elems={elems}
                    customStyles={classes}
                    settings={{
                        //Включает порядковые номера у строк
                        counter: true,
                        net: NET,
                        //Включает блок фильтров и поиска
                        filter: false
                    }}
                    gridHandlers={gridHandlers}
                />
                <CreateModal 
                    showModalCreate={showModalCreate}
                    setShowModalCreate={setShowModalCreate}
                    dataItem={dataItem}
                    setDataItem={setDataItem}
                    afterSuccess={afterSuccessCreate}
                    createModalConfig={createModalConfig}
                    role={role}
                />
                <VisitModal 
                    showModalVisit={showModalVisit}
                    setShowModalVisit={setShowModalVisit}
                    activeId={activeId}
                    classes={classes}
                />
            </div>}
        </div>
    )
}
export default SearchView