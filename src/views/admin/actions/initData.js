export const getGridHandlers = (showHandler) => {
    return {
        buttons: {
            show: (id) => showHandler(id)
        }
    }
}