import React, {
    useState, useEffect, useMemo, useContext
} from 'react' 
import GridComponent from './../../../widgets/grid/GridComponent';
import classes from './../../../project/styles/views/group-styles.module.scss'
import NET from './../../../network';
import { getGridHandlers } from './initData';
import CreateModal from './components/CreateModal';
import CreateButton from './components/CreateButton';
import { getData } from '../../../common/utils';
import QrModal from './components/QrModal';
import DeleteModal from './components/DeleteModal';
import { getElems, getHead } from './utils';
import LoadMoney from './components/LoadMoney';
import ContextUsers from './../../../context/Users/ContextUsers';

const GroupView = ({
    role
}) => {
    // //TOKEN USER CONTEXT?
    // const [token, setToken] = useState('')
    // useEffect(() => {
    //     if (localStorage.getItem(token))
    //     setToken(localStorage.getItem(token))
    // }, [])
    // //END
    const [gridData, setGridData] = useState(null)
    
    const thead = useMemo(() => getHead(role), [role])
    const elems = useMemo(() => getElems(role), [role])
    
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
                    } else if (key === 'date_money') {
                        let value = elem[key]
                        if (elem[key] === 'all') {
                            value = 'Безстроково'
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
    const [showModalCreate, setShowModalCreate] = useState(false)
    const [showModalQr, setShowModalQr] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [activeId, setActiveId] = useState(1)
    const [dataItem, setDataItem] = useState({
        type_id: '1',
        companies_id: '1',
        email: 'Учасник',
        statusPay: '0',
        status: 'no-support',
        password: '111111'
    })
    const [createModalConfig, setCreateModalConfig] = useState({
        title: 'Створення користувача',
        type: 'create',
        btn: 'Створити'
    })
    const [activeFilter, setActiveFilter] = useState(1)
    const [reload, setReload] = useState(false)
    useEffect(() => {
		const fetchData = async () => {
			try {		
				const url = `${NET.APP_URL}/users?companies_id=${activeFilter}`

				const response = await fetch(url, {
					method: 'GET',
					// cors: 'cors',
					headers: {
						'Content-Type': 'application/json'
				      // 'Content-Type': 'application/x-www-form-urlencoded',
				  },
				})
                if (response.status === 200) {
                    const result = await response.json()
                    console.log(result)
                    setGridData(transformData(thead, result.data))
                }
				
			} catch (e) {
				console.log(e)
			}	
		}
	fetchData()
    return () => setReload(false)
	}, [activeFilter, showModalCreate, showModalDelete, setActiveFilter, setReload, reload, role])
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
                type_id: user.type_id,
                companies_id: user.companies_id,
                email: user.email,
                login: user.login,
                name: user.name,
                surname: user.surname,
                fullname: user.fullname,
                statusPay: user.statusPay,
                status: user.status,
                password: user.password,
                date: user.date,
                date_money: user.date_money,
                money: user.money,
                individual: user.individual
            })
            setShowModalCreate(true)
        }
    }
    const qrHandler = (id) => {
        setActiveId(id)
        setShowModalQr(true)
    }
    const deleteHandler = (id) => {
        setShowModalDelete(true)
        setActiveId(id)
    }
    const handlerShowCreate = () => {
        setDataItem({
            type_id: '1',
            companies_id: '1',
            email: 'Учасник',
            statusPay: '0',
            status: 'no-support',
            password: '111111',
            date_money: ''
        })
        setCreateModalConfig({
            title: 'Створення користувача',
            type: 'create',
            btn: 'Створити'
        })
        setShowModalCreate(true)
    }
    const gridHandlers = useMemo(() => getGridHandlers(
        updateHandler,
        qrHandler,
        deleteHandler
    ), [])
    const afterSuccessCreate = () => {
        setShowModalCreate(false)
        setDataItem({
            type_id: '1',
            companies_id: '1',
            email: 'Учасник',
            statusPay: '0',
            status: 'no-support',
            password: '111111',
            date_money: ''
        })
    }
    console.log(dataItem)
    if (!gridData) return null
    return (
        <div className={classes.wrapper}>
            {(role === 'editor' || role === 'super') && <CreateButton 
                classes={classes}
                title="Створити"
                handlerShowCreate={handlerShowCreate}
            />}
            {(role === 'money' || role === 'super') && <LoadMoney 
                classes={classes}
                setReload={setReload}
            />}
            <GridComponent 
                gridData={gridData}
                elems={elems}
                customStyles={classes}
                settings={{
                    //Включает порядковые номера у строк
                    counter: true,
                    net: NET,
                    //Включает блок фильтров и поиска
                    filter: true,
                    routeFilter: 'companies'
                }}
                gridHandlers={gridHandlers}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
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
            <QrModal 
                showModalQr={showModalQr}
                setShowModalQr={setShowModalQr}
                classes={classes}
                activeId={activeId}
            />
            <DeleteModal 
                showModalDelete={showModalDelete}
                setShowModalDelete={setShowModalDelete}
                activeId={activeId}
                classes={classes}
            />
        </div>
    )
}
export default GroupView