import React from 'react'
import NET from './../../network';

const ScanPeople = ({
    classes,
    scan,
    people
}) => {
    let pay = false 
    if (people.status === 'support') {
        pay = true
    } else if (people.status === 'support50') {
        if ((Math.abs(Number(people.money)) * 2) >= (Number(people.price) * 0.5)) {
            pay = true
        }
    } else {
        if (Math.abs(Number(people.money)) >= (Number(people.price) * 0.5)) {
            pay = true
        }
    }
    
    return (
        scan ? (
            <div style={{background: pay ? 'transparent' : 'red'}}>
                <div>
                    <div className={classes.scan__image}>
                        {people.image ? 
                            <img style={{width: '100%'}} src={`${NET.WEB_URL}/storage${people.image.substring(6,30)}`} />: 
                            <div>Нет изображения</div>}
                    </div>
                    <div className={classes.scan__name}>
                        <div>{people.surname} {people.name}</div>                         
                    </div>
                </div>
                <div className={classes.scan__type}>
                    {people.companyName}
                </div>
                {!(people.companyName === 'ГДК' || people.companyName === 'Керівники колективів ГДК' || people.companyName === 'Почесні гості') && <div className={classes.scan__statusPay} style={{background: pay ? 'green' : 'red'}}>
                    {pay ? 'Оплачено' : 'Не оплачено'}
                    {/* {people.statusPay === 1 ? 'Оплачено' : people.statusPay === 2 ? 'На розгляді' : people.statusPay === 0 ? 'Не оплачено': ''} */}
                    <div className={classes.scan__status}>
                        {people.status === 'no-support' ? 'Пільг немає' : people.status === 'support50' ? 'Пільги-50%' : people.status === 'support' ? 'Пільги-100%': ''}
                    </div>
                    <div className={classes.scan__money}>
                        Вартість: {people.price}
                    </div>
                </div>}
                <div className={classes.scan__text}>
                    {people.text}
                </div>
            </div>
            
            ) : <></>
    )
}
export default ScanPeople