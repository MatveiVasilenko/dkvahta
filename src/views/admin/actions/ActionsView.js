import React, {
    useState, useEffect, useMemo
} from 'react' 
import GridComponent from './../../../widgets/grid/GridComponent';
import classes from './../../../project/styles/views/companies-styles.module.scss'
import NET from './../../../network';
import { getGridHandlers } from './initData';
import { getData } from '../../../common/utils';
import ShowModalInfo from './components/ShowModalInfo';

const ActionsView = ({

}) => {
    const thead = [
        {
            title: 'ID',
            alias: 'id',
            width: 50
        },
        {
            title: 'Творець діі',
            alias: 'user',
            width: 200
        },   
        {
            title: 'Тип дії',
            alias: 'type',
            width: 150
        },  
        {
            title: 'Точка діі',
            alias: 'action',
            width: 200
        }, 
        {
            title: 'Час діі',
            alias: 'created_at',
            width: 150
        },    
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
            name: 'user',
            type: 'text',
            value: 'value',
            width: 200
        },
        {
            name: 'type',
            type: 'text',
            value: 'value',
            width: 150
        },
        {
            name: 'action',
            type: 'text',
            value: 'value',
            width: 200
        }, 
        {
            name: 'created_at',
            type: 'text',
            value: 'value',
            width: 150
        },             
        {
            name: 'buttons',
            type: 'buttons',
            value: ['show'],
            width: 150
        }     
    ]
    const transformData = (head, body) => {
        const header = head && head.map(el => el.alias)

        const boder = body.map((elem) => {
            let accum = {}
            header.map((headItem) => {
                Object.keys(elem).map((key) => {
                    if (key === 'user') {
                        const user = JSON.parse(elem[key])
                        let value  = user?.name + ' ' + user?.surname
                        return accum[key] = value
                    } else if (key === 'type') {
                        let value = ''
                        if (elem[key] === 'update_user') {
                            value = 'Редагування користувача'
                        } else if (elem[key] === 'delete_user') {
                            value = 'Видалення користувача'
                        }
                        return accum[key] = value
                    } else if (key === 'created_at') {
                        let value = elem[key]
                        let date = new Date(value)
                        return accum[key] = date.toString().slice(0, 25)
                    } else if (key === 'action') {
                        let action = JSON.parse(elem[key])
                        let value = action.input ? action.input.name + ' ' + action.input.surname : ''
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
    const [showModal, setShowModal] = useState(false)
    const [createModalConfig, setCreateModalConfig] = useState({})
    const [dataItem, setDataItem] = useState({
        desc: 'Desc',
        type: 'col'
    })

    
    useEffect(() => {
		const fetchData = async () => {
			try {		
				const url = `${NET.APP_URL}/actions`

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
	}, [])
    const showHandler = async (id) => {
        setShowModal(true)
        setCreateModalConfig({
            title: 'Структура діі',
            type: 'show',
            btn: 'Закрыть'
        })
        const url = `${NET.APP_URL}/actions/${id}`
        const data = await getData(url)
        if (data) {
            const action = data.data
            setDataItem(action)
        }
    }
    const gridHandlers = useMemo(() => getGridHandlers(
        showHandler,
    ), [])
    if (!gridData) return null
    return (
        <div className={classes.wrapper}>
            {/* <CreateButton 
                classes={classes}
                title="Створити"
                handlerShowCreate={handlerShowCreate}
            />
            <div className={classes.textMessage}>Якщо колектив займається безкоштовно - укажіть вартість 0</div> */}
            <GridComponent 
                gridData={gridData}
                elems={elems}
                customStyles={classes}
                settings={{
                    //Включает порядковые номера у строк
                    counter: true
                }}
                gridHandlers={gridHandlers}
            />
            <ShowModalInfo
                showModal={showModal}
                setShowModal={setShowModal}
                dataItem={dataItem}
                setDataItem={setDataItem}
                createModalConfig={createModalConfig}
            />
        </div>
    )
}
export default ActionsView