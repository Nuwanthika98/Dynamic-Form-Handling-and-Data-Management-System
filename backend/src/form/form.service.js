const mongoose = require('mongoose')
const formModel = require('./form.model')
const repository = require('../../services/repositoryService')

module.exports.getDeliveryDataById = async (id) => {
    const Deliverydata = await repository.findOne(formModel, {
        _id: new mongoose.Types.ObjectId(id),
    })
    return Deliverydata
}

module.exports.getDeliveryData = async () => {
    const allDeliveryData = await repository.findMany(formModel, {});
    return allDeliveryData;
}

module.exports.createDeliveryData = async (body) => {
    const newDeliveryDataToSave = new formModel(body);
    const saveResult = await repository.save(newDeliveryDataToSave)
    return saveResult
}

module.exports.updateDeliveryData = async (body) => {
    const existingDeliveryData = await this.getDeliveryDataById(body._id)
    if (!existingDeliveryData) throw new Error('Invalid Delivery Data _id')

    let DeliveryDataToUpdate = await repository.updateOne(
        formModel,
        {
            _id: body._id,
        },
        body,
        {
            new: true,
        }
    )
    DeliveryDataToUpdate = DeliveryDataToUpdate.toObject()
    return DeliveryDataToUpdate
}

module.exports.deleteDeliveryData = async (id) => {
    const existingDeliveryData = await this.getDeliveryDataById(id.toString())
    if (!existingDeliveryData) throw new Error('Invalid Delivery Data _id')

    const DeliveryDataToDelete = await repository.deleteOne(
        formModel,
        {
            _id: new mongoose.Types.ObjectId(id),
        },
    )

    return DeliveryDataToDelete
}

module.exports.getDeliveryDataByPostalCode = async (postalcode) => {
    const deliveryData = await repository.findByPostalCode(formModel, postalcode);
    return deliveryData;
};


