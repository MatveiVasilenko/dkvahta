export const getData = async(
    url,
    token
) => {
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer: ${token}`
        },
    }).then((response) => {
        if (response.status === 200) {
            
        }
        return response
    })
    return await res.json()
}

export const getDayWeek = (id) => {
    let dayWeek = 'пн'
    switch (id){
        case 0:
        dayWeek = 'пн'
        break
        case 1:
        dayWeek = 'вт'
        break
        case 2:
        dayWeek = 'ср'
        break
        case 3:
        dayWeek = 'чт'
        break
        case 4:
        dayWeek = 'пт'
        break
        case 5:
        dayWeek = 'сб'
        break
        case 6:
        dayWeek = 'нд'
        default: 
        dayWeek = 'нд'
    }
    return dayWeek
}