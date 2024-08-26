const express = require('express')

const router = express.Router()

const {permissions} = require('./form.permissions')
const controller = require('./form.controller')

router.route(permissions.getDeliveryDataById.path).get(
    controller.getDeliveryDataById
)

router.route(permissions.getDeliveryData.path).get(
    controller.getDeliveryData
)

router.route(permissions.createDeliveryData.path).post(
    controller.createDeliveryData
)

router.route(permissions.updateDeliveryData.path).put(
    controller.updateDeliveryData
)

router.route(permissions.deleteDeliveryData.path).delete(
    controller.deleteDeliveryData
)

router.route(permissions.getDeliveryDataByPostalCode.path).get(
    controller.getDeliveryDataByPostalCode
)

module.exports = router