//Rating 

export const getGridTrash = () => {
    const thead = [
        {
            title: 'ID',
            alias: 'id',
            width: 50
        },
        {
            title: 'ID',
            alias: 'companies_id',
            width: 50
        },
        {
            title: 'Аватар',
            alias: 'image',
            width: 70
        },
        {
            title: 'Прізвище',
            alias: 'surname',
            width: 100
        },
        {
            title: "Ім'я",
            alias: 'name',
            width: 100
        },
        {
            title: "По-батькові",
            alias: 'fullname',
            width: 120
        },
        {
            title: 'Дата',
            alias: 'date',
            width: 100
        },
        {
            title: 'Телефон',
            alias: 'login',
            width: 150
        },
        {
            title: 'Оплата',
            alias: 'statusPay',
            width: 100
        },
        {
            title: 'Пільги',
            alias: 'status',
            width: 70
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
            name: 'companies_id',
            type: 'text',
            value: 'value',
            width: 50
        },
        {
            name: 'image',
            type: 'image',
            value: 'value',
            width: 70
        },
        {
            name: 'surname',
            type: 'text',
            value: 'value',
            width: 100
        },
        {
            name: 'name',
            type: 'text',
            value: 'value',
            width: 100
        },
        {
            name: 'fullname',
            type: 'text',
            value: 'value',
            width: 120
        },
        {
            name: 'date',
            type: 'text',
            value: 'value',
            width: 100
        },
        {
            name: 'login',
            type: 'text',
            value: 'value',
            width: 150
        },
        {
            name: 'statusPay',
            type: 'text',
            value: 'value',
            width: 100
        },  
        {
            name: 'status',
            type: 'text',
            value: 'value',
            width: 70
        },  
        {
            name: 'buttons',
            type: 'buttons',
            value: ['return'],
            width: 150
        }     
    ]
    return ({
        thead,
        elems
    })
}