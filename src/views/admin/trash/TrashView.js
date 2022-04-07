import React, {
    useState, useEffect, useMemo
} from 'react' 
import GridComponent from './../../../widgets/grid/GridComponent';
import classes from './../../../project/styles/views/group-styles.module.scss'
import NET from './../../../network';
import { getGridHandlers } from './initData';
import ReturnModal from './components/ReturnModal';
import { getData } from '../../../common/utils';
import { getGridTrash } from './../../../common/gridgenerator';

const TrashView = ({
    company
}) => {
    const gridRating = useMemo(() => getGridTrash(), [])
    
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
    const [showModalReturn, setShowModalReturn] = useState(false)
    const [activeId, setActiveId] = useState(1)
    const [activeCompanyId, setActiveCompanyId] = useState(1)
    const [activeFilter, setActiveFilter] = useState(1)
    const [searchText, setSearchText] = useState(false)
    const [qs, setQs] = useState('')
    
    useEffect(() => {
		const fetchData = async () => {
			try {		
				const url = `${NET.APP_URL}/users-trash`

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
                    setGridData(transformData(gridRating.thead, result.data))
                }
				
			} catch (e) {
				console.log(e)
			}	
		}
        if (!showModalReturn) {
            fetchData()            
        }
	}, [showModalReturn])

    const returnHandler = (id, elem) => {
        setActiveCompanyId(elem.companies_id === 9999 ? 1 : elem.companies_id)
        setShowModalReturn(true)
        setActiveId(id)
    }    
    const gridHandlers = useMemo(() => getGridHandlers(
        returnHandler
    ), [])

    const searchHandler = async (q) => {
        setQs(q)
        if (q.length > 1) {
            const data = await getData(
                `${NET.APP_URL}/search?q=${q}&trash=9999`
            )
            if (data.data === 'Пошук не дав результатів') {
                setSearchText(data.data)
                setGridData(null)
            } else {
                setSearchText(false)
                setGridData(transformData(gridRating.thead, data.data))
            }
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.input}>
                <input
                    onChange={(e) => searchHandler(e.target.value)}
                    placeholder="Пошук по-батькові, імені"
                    value={qs}
                    />
            </div>
            {searchText && <div>{searchText}</div>}
            {gridData && <GridComponent 
                gridData={gridData}
                elems={gridRating.elems}
                customStyles={classes}
                settings={{
                    //Включает порядковые номера у строк
                    counter: true,
                    net: NET,
                    //Включает блок фильтров и поиска
                    filter: false,
                    routeFilter: 'companies'
                }}
                gridHandlers={gridHandlers}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
            />}
            <ReturnModal 
                showModalReturn={showModalReturn}
                setShowModalReturn={setShowModalReturn}
                activeId={activeId}
                classes={classes}
                activeCompanyId={activeCompanyId}
                setGridData={setGridData}
                setQs={setQs}
            />
        </div>
    )
}
export default TrashView