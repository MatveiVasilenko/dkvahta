import React, {
    useState
} from 'react'
import NET from './../../../../network';

const LoadMoney = ({
    setReload,
    classes
}) => {
    const [excelData, setExcelData] = useState(null)
    const [statusLoad, setStatusLoad] = useState(null)
    const loadExcel = (e) => {
        if (e.target.files[0]) {
            setExcelData(e.target.files[0])
        }
    }
    const loadData = async () => {
        if (excelData) {
            const formData = new FormData()
            formData.append('excel', excelData)
            const url = `${NET.APP_URL}/import-money`
            setStatusLoad('processing')
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
            const result = await response.json()
            if (result.message === 'import successfully') {
                setReload(true)
                setStatusLoad('loaded')
                console.log('asd')
            } else {
                setStatusLoad('error')
            }
        }
    }
    return (
        <div className={classes.money}>
            <div className={classes.money__title}>Завантажити актуальні рахунки</div>
            <div>
                <input type="file" onChange={loadExcel}/>
                {excelData && <button className={classes.buttonWrapper__btn} onClick={loadData} type="button">Завантажити</button>}
            </div>
            <div className={classes.money__info}>
                {statusLoad === 'processing' ? 
                    'Файл завантажується. Зачекайте будь-ласка близько 1 хвилини, та не перезавантажуйте сторінку' 
                    : statusLoad === 'loaded' ? 'Файл завантажено' : statusLoad === 'error' ? <div>
                        Є помилка у вхідних даних. Перевірте: 
                        <ol>
                            <li>Чи була видалена шапка в таблиці</li>
                            <li>Чи був видалена остання строка з підсумовуванням</li>
                            <li>Чи був переведений формат стовпця с сумою до формату "Текст"</li>
                        </ol> 
                    </div>: <></>
                }
            </div>
        </div>
    )
}
export default LoadMoney