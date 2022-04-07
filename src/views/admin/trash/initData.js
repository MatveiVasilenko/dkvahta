export const getGridHandlers = (returnHandler) => {
    return {
        buttons: {
            return: (id, elem) => returnHandler(id, elem)
        }
    }
}