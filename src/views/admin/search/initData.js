export const getGridHandlers = (returnHandler, updateHandler, role) => {
    if (role === 'money') {
        return {
            buttons: {
                update: (id) => updateHandler(id)
            }
        }
    }
    return {
        buttons: {
            return: (id) => returnHandler(id)
        }
    }
}