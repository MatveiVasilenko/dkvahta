import React, {
    useState, useRef, useEffect, useMemo, useCallback
} from 'react'
import classes from './../../project/styles/widgets/scan-styles.module.scss'
import ScanPeople from './ScanPeople'
import NET from './../../network';

const Scan = () => {
    const [dataShow, setDataShow] = useState(false)
    const [people, setPeople] = useState({})
    const [value, setValue] = useState('')

    const scanningFunc = async (val) => {
        //срезаем получаемый код пользователя (значение 11)
        let oldCode = val.substr(9,1)
        let code = val.slice(11)
        console.log(code)
        if (code) {
            // Блок убирающий нули из получаемого кода пользователя
            const first = Number(code.substr(0,1))
            const second = Number(code.substr(1,1))
            const third = Number(code.substr(2,1))
            if ((first === 0) || (first === 1 && oldCode === '1')) {
                code = code.slice(1)
                if(second === 0) {
                    code = code.slice(1)
                    if (third === 0) {
                        code.slice(1)
                    }
                }
            }
            //End
            const time = new Date();
            const year = time.getFullYear()
            const day = String(time.getDate()).length === 1 ? '0' + String(time.getDate()) : String(time.getDate())
            const month = String(time.getMonth() + 1).length === 1 ? '0' + String(time.getMonth() + 1) : String(time.getMonth() + 1)
            const hour = String(time.getHours()).length === 1 ? '0' + String(time.getHours()) : String(time.getHours())
            const minutes = String(time.getMinutes()).length === 1 ? '0' + String(time.getMinutes()) : String(time.getMinutes())
            const url = `${NET.APP_URL}/employer`
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: code,
                    date: `${year}-${month}-${day}`,
                    time: `${hour}-${minutes}`
                })
            }).then(async (response) => {
                if (response.status === 200) {
                    const result = await response.json()
                    const pep = result.user
                    console.log(result)
                    setPeople({
                        surname: pep.surname || '',
                        name: pep.name || '',
                        image: pep.image || '',
                        companyName: result.company,
                        status: pep.status || '',
                        statusPay: Number(pep.statusPay),
                        text: result.text,
                        price: result.price,
                        money: pep.money
                    })
                    setDataShow(true)
                } else if (response.status === 404) {
                    setPeople({
                        surname: '',
                        name: '',
                        image: '',
                        companyName: 'Ошибка',
                        status: 'no-user',
                        text: 'Не зарестрирован'
                    })
                    setDataShow(true)
                }
            })          
        }
        code = ''
        trueCode = 0
    }
    let code = ''
    let trueCode = 0
    const handleKeyDown = (e) => {
        code = code + String.fromCharCode(e.keyCode)
        
        // setScanValue(oldWord + )
        
        if (trueCode === 240 && code.length > 3) {
            if (code.length === 15) {
                const workCode = code
                scanningFunc(workCode)
            }
        } else {
            trueCode = trueCode + e.keyCode
        }
    }
    
    // function handleKeyDown(e) {
    //   console.log(e.keyCode);
    //   console.log(String.fromCharCode(e.keyCode))
    //   setScanValue(scanValue + String.fromCharCode(e.keyCode))
    // }
    useEffect(() => {
        setInterval(() => {
            if (trueCode !== 240) {
                code = ''
                trueCode = 0
            }
        }, 1000)
        document.addEventListener('keydown', handleKeyDown);
    
        // Don't forget to clean up
        return function cleanup() {
          document.removeEventListener('keydown', handleKeyDown);
        }
      }, []);
    return (
        <div className={classes.scanWrapper}>
            <div className={classes.scanWrapperTitle}>Окно сканування</div>
            {/* <div 
                onClick={handleActive}
                className={active ? [classes.scan, classes.scanActive].join(' ') : [classes.scan, classes.scanUnActive].join(' ')}>
                {active ? 'Сканер активен' : 'Сканер неактивен'}
            </div>
            <input 
                className={classes.scanInput}
                value={value}
                autoFocus
                ref={inputRef}
                onBlur={() => setActive(false)}
                onChange={(e) => {
                    setDataShow(false)
                    setValue(e.target.value)
                    //Устанавливает количество проверяемых символов (значение 12)
                    if (value.length > 12) {
                        scanningFunc(e.target.value)
                    }
                }}
            /> */}
            <ScanPeople 
                classes={classes}
                scan={dataShow}
                people={people || {}}
            />
        </div>
    )
}
export default Scan