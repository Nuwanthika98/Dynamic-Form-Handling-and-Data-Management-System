const service = require('./form.service')

const {
    customError,
    successWithData,
  } = require('../../services/responseService')

module.exports.getDeliveryDataById = async (req, res) => {
    try {
        const data = await service.getDeliveryDataById(req.params);
        return successWithData(data, res);
    } catch (error) {
        return customError(error.message, res);
    }
  }

module.exports.getDeliveryData = async (req, res) => {
    try {
        const data = await service.getDeliveryData(req.query)
        return successWithData(data, res)
    } catch (error) {
        return customError(error.message, res)
    }
  }

module.exports.createDeliveryData = async (req, res) => {
    try {
        const data = await service.createDeliveryData(req.body)
        return successWithData(data, res)
    } catch (error) {
        return customError(error.message, res)
    }
  }

  module.exports.updateDeliveryData = async (req, res) => {
    try {
        const data = await service.updateDeliveryData(req.body)
        return successWithData(data, res)
    } catch (error) {
        return customError(error.message, res)
    }
  }

  module.exports.deleteDeliveryData = async (req, res) => {
    try {
        const data = await service.deleteDeliveryData(req.params.id)
        return successWithData(data, res)
    } catch (error) {
        return customError(error.message, res)
    }
  }

  module.exports.getDeliveryDataByPostalCode = async (req, res) => {
    try {
        const data = await service.getDeliveryDataByPostalCode(req.params.postalcode);
        return successWithData(data, res);
    } catch (error) {
        return customError(error.message, res);
    }
  }