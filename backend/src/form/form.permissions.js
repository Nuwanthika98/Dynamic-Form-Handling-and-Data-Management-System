module.exports.permissions = {
    getDeliveryDataById: {
        path: "/:id",
    },
    getDeliveryData: {
        path: "/",
    },
    createDeliveryData: {
        path: "/create",
    },
    updateDeliveryData: {
        path: "/update",
    },
    deleteDeliveryData: {
        path: "/delete/:id",
    },
    getDeliveryDataByPostalCode: {
        path: "/search/:postalcode"
    }
};