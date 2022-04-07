import React, {
    useState, useEffect, useMemo
} from 'react' 
import GridComponent from './../../../widgets/grid/GridComponent';
import classes from './../../../project/styles/views/companies-styles.module.scss'
import NET from './../../../network';
import { getGridHandlers } from './initData';
import CreateModal from './components/CreateModal';
import CreateButton from './components/CreateButton';
import { getData } from '../../../common/utils';
import QrModal from './components/QrModal';
import DeleteModal from './components/DeleteModal';

const CompaniesView = ({
    company
}) => {
    const thead = [
        {
            title: 'ID',
            alias: 'id',
            width: 50
        },
        {
            title: 'Назва',
            alias: 'title',
            width: 150
        },   
        {
            title: 'Вартість',
            alias: 'price',
            width: 100
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
            name: 'title',
            type: 'text',
            value: 'value',
            width: 150
        },
        {
            name: 'price',
            type: 'text',
            value: 'value',
            width: 100
        },            
        {
            name: 'buttons',
            type: 'buttons',
            value: ['update', 'delete'],
            width: 150
        }     
    ]
    const transformData = (head, body) => {
        const header = head && head.map(el => el.alias)

        const boder = body.map((elem) => {
            let accum = {}
            header.map((headItem) => {
                Object.keys(elem).map((key) => {
                    if (headItem === key) {
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
    const [showModalCreate, setShowModalCreate] = useState(false)
    const [showModalQr, setShowModalQr] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [activeId, setActiveId] = useState(1)
    const [dataItem, setDataItem] = useState({
        desc: 'Desc',
        type: 'col'
    })
    const [createModalConfig, setCreateModalConfig] = useState({
        title: 'Створення коллективу(групи)',
        type: 'create',
        btn: 'Створити'
    })

    
    useEffect(() => {
		const fetchData = async () => {
			try {		
				const url = `${NET.APP_URL}/companies`

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
	}, [company, showModalCreate, showModalDelete])
    const updateHandler = async (id) => {
        setCreateModalConfig({
            title: 'Редагування коллективу(групи)',
            type: 'edit',
            btn: 'Редагувати'
        })
        const url = `${NET.APP_URL}/companies/${id}`
        const data = await getData(url)
        if (data) {
            const company = data.data
            setDataItem({
                id: company.id,
                title: company.title,
                desc: company.desc,
                type: company.type,
                price: company.price
            })
            setShowModalCreate(true)
        }
    }
    const deleteHandler = (id) => {
        setShowModalDelete(true)
        setActiveId(id)
    }
    const handlerShowCreate = () => {
        setCreateModalConfig({
            title: 'Створення коллективу(групи)',
            type: 'create',
            btn: 'Створити'
        })
        setShowModalCreate(true)
    }
    const gridHandlers = useMemo(() => getGridHandlers(
        updateHandler,
        deleteHandler
    ), [])
    const afterSuccessCreate = () => {
        setShowModalCreate(false)
        setDataItem({
            desc: 'Desc',
            type: 'col'
        })
    }
    if (!gridData) return null
    return (
        <div className={classes.wrapper}>
            <CreateButton 
                classes={classes}
                title="Створити"
                handlerShowCreate={handlerShowCreate}
            />
            <div className={classes.textMessage}>Якщо колектив займається безкоштовно - укажіть вартість 0</div>
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
            <CreateModal 
                showModalCreate={showModalCreate}
                setShowModalCreate={setShowModalCreate}
                dataItem={dataItem}
                setDataItem={setDataItem}
                afterSuccess={afterSuccessCreate}
                createModalConfig={createModalConfig}
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
export default CompaniesView