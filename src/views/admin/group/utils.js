export const getFields = (role) => {
    const fields = role === 'editor' ? [
        {
            name: 'surname',
            type: 'input',
            title: 'Прізвище',
            placeholder: 'Введіть Прізвище'
        }, 
        {
            name: 'name',
            type: 'input',
            title: "Ім'я",
            placeholder: "Введіть Ім'я"
        }, 
        {
            name: 'fullname',
            type: 'input',
            title: 'По-батькові',
            placeholder: 'Введіть По-батькові'
        }, 
        {
            name: 'card_id',
            type: 'input',
            title: 'Табельний номер',
            placeholder: 'Введіть номер'
        }, 
        {
            name: 'companies_id',
            type: 'select-search',
            title: 'Колектив(група)',
            routeSearch: 'collective',
            placeholder: 'Оберіть колектив(групу)'
        }, 
        {
            name: 'date',
            type: 'input',
            title: 'Дата народження',
            placeholder: 'Введіть дату народження'
        }, 
        {
            name: 'email',
            type: 'select',
            title: 'Тип користувача',
            options: [
                {
                    id: 1,
                    value: 'Участник',
                    alias: 'Участник'
                },
                {
                    id: 2,
                    value: 'Керівник',
                    alias: 'Керівник'
                },
                {
                    id: 3,
                    value: 'Співробітник',
                    alias: 'Співробітник'
                },
            ],
            placeholder: ''
        },
        {
            name: 'login',
            type: 'phone',
            title: 'Телефон',
            placeholder: 'Введіть номер'
        },
        {
            name: 'image',
            type: 'image',
            title: 'Оберіть зображення',
            placeholder: ''
        },
        {
            name: 'individual',
            type: 'check',
            title: 'Індівідуальний розклад',
            placeholder: ''
        },
        
    ] : (role === 'money' || role === 'super') ? [        
        // {
        //     name: 'statusPay',
        //     type: 'select',
        //     title: 'Статус оплати',
        //     options: [
        //         {
        //             id: 1,
        //             value: '0',
        //             alias: 'не оплачений'
        //         },
        //         {
        //             id: 2,
        //             value: '1',
        //             alias: 'на розгляді'
        //         },
        //         {
        //             id: 3,
        //             value: '2',
        //             alias: 'оплачений'
        //         },
        //     ],
        //     placeholder: ''
        // },
        {
            name: 'card_id',
            type: 'input',
            title: 'Табельний номер',
            placeholder: 'Введіть номер'
        }, 
        {
            name: 'status',
            type: 'select',
            title: 'Пільги',
            options: [
                {
                    id: 1,
                    value: 'no-support',
                    alias: 'немає'
                },
                {
                    id: 2,
                    value: 'support50',
                    alias: 'Пільги-50%'
                },
                {
                    id: 3,
                    value: 'support',
                    alias: 'Пільги-100%'
                },
            ],
            placeholder: ''
        },
        {
            name: 'date_money',
            type: 'input',
            title: 'Період пільги',
            // config: {
            //     allPeriod: true,
            //     textAllPeriod: 'Безстроково'
            // },
            placeholder: ''
        },
    ] : []
    return {
        fields
    }
}
export const getHead = (role) => {
    if (role === 'admin') {
        return [
            {
                title: 'ID',
                alias: 'id',
                width: 50
            },
            {
                title: 'Табель',
                alias: 'card_id',
                width: 70
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
            // {
            //     title: 'Оплата',
            //     alias: 'statusPay',
            //     width: 100
            // },
            {
                title: 'Пільги',
                alias: 'status',
                width: 70
            }
        ]
    } else if (role === 'editor' || role === 'money' || role === 'super') {
        return [
            {
                title: 'ID',
                alias: 'id',
                width: 50
            },
            {
                title: 'Табель',
                alias: 'card_id',
                width: 70
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
            // {
            //     title: 'Оплата',
            //     alias: 'statusPay',
            //     width: 100
            // },
            {
                title: 'Пільги',
                alias: 'status',
                width: 70
            },
            {
                title: 'Період',
                alias: 'date_money',
                width: 100
            },
            {
                title: 'Рахунок',
                alias: 'money',
                width: 100
            },
            {
                title: 'Дії',
                alias: 'buttons',
                width: 150
            }
        ]
    }
}
export const getElems = (role) => {
    if (role === 'admin') {
        return [
            {
                name: 'card_id',
                type: 'text',
                value: 'value',
                width: 70                
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
            // {
            //     name: 'statusPay',
            //     type: 'text',
            //     value: 'value',
            //     width: 100
            // },  
            {
                name: 'status',
                type: 'text',
                value: 'value',
                width: 70
            }    
        ]
    } else if (role === 'editor' || role === 'money' || role === 'super') {
        return [
            {
                name: 'id',
                type: 'text',
                value: 'value',
                width: 50                
            },
            {
                name: 'card_id',
                type: 'text',
                value: 'value',
                width: 70                
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
            // {
            //     name: 'statusPay',
            //     type: 'text',
            //     value: 'value',
            //     width: 100
            // },  
            {
                name: 'status',
                type: 'text',
                value: 'value',
                width: 70
            }, 
            {
                name: 'date_money',
                type: 'text',
                value: 'value',
                width: 100
            },  
            {
                name: 'money',
                type: 'text',
                value: 'value',
                width: 100
            },  
            {
                name: 'buttons',
                type: 'buttons',
                value: ['update', 'qr', 'delete'],
                width: 150
            }     
        ]
    }
}