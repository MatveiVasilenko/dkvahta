export const optionsMonth = [
    {
        id: '01',
        title: 'Январь'
    },
    {
        id: '02',
        title: 'Февраль'
    },
    {
        id: '03',
        title: 'Март'
    },
    {
        id: '04',
        title: 'Апрель'
    },
    {
        id: '05',
        title: 'Май'
    },
    {
        id: '06',
        title: 'Июнь'
    },
    {
        id: '07',
        title: 'Июль'
    },
    {
        id: '08',
        title: 'Август'
    },
    {
        id: '09',
        title: 'Сентябрь'
    },
    {
        id: '10',
        title: 'Октябрь'
    },
    {
        id: '11',
        title: 'Ноябрь'
    },
    {
        id: '12',
        title: 'Декабрь'
    }
]
export const optionsYear = [
    {
        id: '2021',
        title: '2021'
    },
    {
        id: '2022',
        title: '2022'
    },
]
export const getDayWeek = (begin = 1, idx) => {
    let day = begin + idx
    if (day >= 7 && day < 14) {
        day = day - 7
    } else if (day >= 14 && day < 21) {
        day = day - 14
    } else if (day >= 21 && day < 28) {
        day = day - 21
    } else if (day >= 28) {
        day = day - 28
    }
    if (day === 1) {
        day = 'пн'
    } else if (day === 2) {
        day = 'вт'
    } else if (day === 3) {
        day = 'ср'
    } else if (day === 4) {
        day = 'чт'
    } else if (day === 5) {
        day = 'пт'
    } else if (day === 6) {
        day = 'сб'
    } else if (day === 0) {
        day = 'вс'
    }
    
    return day
}