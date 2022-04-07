export const getFields = () => {
    const fields = [
        {
            name: 'title',
            type: 'input',
            title: "Назва коллективу(групи)",
            placeholder: "Введіть назву"
        },
        {
            name: 'price',
            type: 'input',
            title: "Вартість навчання",
            placeholder: "Введіть вартість"
        }
        
    ]
    return {
        fields
    }
}