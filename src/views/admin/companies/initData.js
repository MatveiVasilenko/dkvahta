export const getGridHandlers = (updateHandler, deleteHandler) => {
    return {
        buttons: {
            update: (id) => updateHandler(id),
            delete: (id) => deleteHandler(id)
        }
    }
}