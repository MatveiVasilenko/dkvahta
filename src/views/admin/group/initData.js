export const getGridHandlers = (updateHandler, qrHandler, deleteHandler) => {
    return {
        buttons: {
            update: (id) => updateHandler(id),
            qr: (id) => qrHandler(id),
            delete: (id) => deleteHandler(id)
        }
    }
}