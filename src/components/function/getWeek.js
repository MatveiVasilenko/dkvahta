// delta - ручная прибавка к первой неделе 2021 год

const getWeek = (delta) => {
    let today = new Date()
    let newYear = new Date(today.getFullYear(), 0, 1);
    const day = Math.ceil((today.getTime() - newYear.getTime())/1000/60/60/24)
    const weeks = Math.ceil((day + 4)/7)

    return weeks + 52
}
export default getWeek