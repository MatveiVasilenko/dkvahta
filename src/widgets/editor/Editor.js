import React, {
    useState,useEffect
} from 'react' 

import classes from './editor.module.scss';

import EditorSwitcher from './EditorSwitcher'

// react-calendar
// react-phone-input-2
const Editor = ({
    route,
    fields,
    dataItem,
    setDataItem,
    afterSuccess,
    net,
    createModalConfig,
}) => {
    // Data for new news
    const [errorData, setDataError] = useState({})
    //TOKEN USER CONTEXT?
    const [token, setToken] = useState('')
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }
    }, [])
    //END
    const create = async () => {
        // setPreload(1)
        
            try {
                //Блок формирования отправки данных картинки и текста
                let formData = new FormData();
                //Перебор объекта отправки - добавление ключей и значений
                for (let key in dataItem) {
                    formData.append(key, dataItem[key])
                }
                const url = `${net.APP_URL}/${route}`
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        //Заголовки не отправляем вообще никакие)
                        // 'Accept': 'application/json',
                        // 'Content-Type': 'multipart/form-data',
                        // 'Content-Type': false,
                        // "processData": false
                    },
                    body: formData
                })
                if (response.status === 200) {
                    const result = await response.text()
                    afterSuccess()
                } else if (response.status === 401 || response.status === 422) {
                    const errors = await response.json()
                    setDataError(errors)
                }
                
               
            } catch (e) {
                console.log(e)
            }
    }

    const update = async () => {
            try {
                //Блок формирования отправки данных картинки и текста
                let formData = new FormData();
                //Перебор объекта отправки - добавление ключей и значений
                for (let key in dataItem) {
                    formData.append(key, dataItem[key])
                }
                const url = `${net.APP_URL}/${route}/${dataItem.id}`
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                        //Заголовки не отправляем вообще никакие)
                        // 'Accept': 'application/json',
                        // 'Content-Type': 'multipart/form-data',
                        // 'Content-Type': false,
                        // "processData": false
                    },
                    body: formData
                })
                if (response.status === 200) {
                    const result = await response.json()
                    
                    afterSuccess()
                } else if (response.status === 401 || response.status === 422) {
                    const errors = await response.json()
                    setDataError(errors)
                }
                
            } catch (e) {
                console.log(e)
            }
        // }
    }

    
    return (
        <div className={classes.editor}>
            {
                fields.map((itemEditor, idx) => (
                    <EditorSwitcher 
                        key={`item${idx}`}
                        itemEditor={itemEditor}
                        classes={classes}
                        dataItem={dataItem}
                        setDataItem={setDataItem}
                        errorData={errorData}
                        net={net}
                    />
                ))
            }

            {/* <div className={classes.editor__item}>
                <div className={classes.editor__item__title}>
                    Краткое описание
                </div>
                <div className={classes.editor__item__input}>
                    <textarea rows="3" value={dataItem.subtitle} type="text" onChange={(e) => {
                        setDataItem({
                            ...dataItem,
                            subtitle: e.target.value
                        })
                    }} />
                </div>
            </div> */}

            
        <div className={classes.editor__wrapper__button}>
            <button className={classes.editor__button} onClick={createModalConfig.type === 'create' ? create : update}>{createModalConfig.btn}</button>
        </div>
        </div>
    )
}
export default Editor