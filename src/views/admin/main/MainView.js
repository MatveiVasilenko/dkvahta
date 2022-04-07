import React from 'react'
import classes from './../../../project/styles/views/main/main-styles.module.scss'
import GraficBlock from './components/GraficBlock'

const MainView = ({
    role,
    name
}) => {
    let roleText = ''
    if (role === 'admin') {
        roleText = 'Адміністратор'
    } else if (role === 'editor') {
        roleText = 'Головний адмін'
    } else if (role === 'money'){
        roleText = 'Бухгалтер'
    } else if (role === 'super') {
        roleText = 'Супер-адмін'
    }
    // let UPC = '';
    // document.addEventListener("keydown", function(e) {
    //     const textInput = e.key || String.fromCharCode(e.keyCode);
    //     const targetName = e.target.localName;
    //     let newUPC = '';
    //     if (textInput && textInput.length === 1 && targetName !== 'input'){
    //         newUPC = UPC+textInput;
            
    //         if (newUPC.length >= 6) {
    //           console.log(newUPC)
    //         console.log('barcode scanned:  ', newUPC);
    //       } 
    //    }
    // });
    return (
        <div className={classes.mainWrapper}>
            <h3>Ласкаво просимо, {name}!</h3>
            <div className={classes.mainWrapper__role}>Ваша роль: {roleText}</div>
            <div>У нас новое обновление VAHTA. (v.0.2.2) 20.12.2021</div>
            <p>
               Добавлен журнал событий
            </p>
            <p>
               Исправлены ряд багов
            </p>
            <h4>Новое в версии</h4>
            <ul>
                <li>Добавлен журнал событий</li>
                <li>Получасы в инд.расписании</li>
                <li>Корректировка периодов в инд.расписании</li>
            </ul>
            <i>Старайтесь в момент сканирования не пользоваться поиском</i>
            <h4>В следующей версии</h4>
            <ul>
                <li>Приложение для пользователей</li>
                {/* <li>Статус оплаты при сканировании считается как сравнение суммы на счете и стоимости занятий в коллективе</li> */}
                {/* <li>В поиске добавили название коллективов</li>
                <li>Коллективы отсортированы по алфавиту</li>
                <li>Ускорение работы модуля "Посещения"</li> */}
                {/* <li>Обновлена карточка информации о сканируемом пользователе</li>
                <li>Устранение багов с редактированием и удалением в коллективах</li> */}
                {/* <li>Добавлена кнопка "Скопировать период" для недели</li> */}
            </ul>
            <GraficBlock 
                classes={classes}
            />
        </div>
    )
}
export default MainView