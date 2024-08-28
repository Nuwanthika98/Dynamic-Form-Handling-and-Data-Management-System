/**
 * Save new object
 * @param body
 * @returns {Promise<any>}
 */
module.exports.save = (body) =>
    new Promise((resolve, reject) => {
      body
        .save()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  
  /**
   * Find a object
   * @param model
   * @param query
   * @param projection
   * @returns {Promise<any>}
   */
  module.exports.findOne = (model, query, projection) =>
    new Promise((resolve, reject) => {
      model
        .findOne(query, projection)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  
  /**
   * Find many objects
   * @param model
   * @param query
   * @param projection
   * @param options
   * @returns {Promise<[]>}
   */
  module.exports.findMany = (model, query, projection, options) =>
    new Promise((resolve, reject) => {
      model
        .find(query, projection, options)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  
  /**
   * Update one object
   * @param model
   * @param query
   * @param body
   * @param options
   * @returns {Promise<unknown>}
   */
  module.exports.updateOne = (model, query, body, options) =>
    new Promise((resolve, reject) => {
      model
        .findOneAndUpdate(query, body, options)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  
  /**
   * Count documents
   * @param model
   * @param query
   * @param options
   * @returns {Promise<unknown>}
   */
  module.exports.countDocuments = (model, query, options) =>
    new Promise((resolve, reject) => {
      model
        .countDocuments(query, options)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  
  /**
   * insert many objects
   * @param model
   * @param body
   * @param options
   * @returns {Promise<unknown>}
   */
  module.exports.insertMany = (model, body, options) =>
    new Promise((resolve, reject) => {
      model
        .insertMany(body, options)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  
  /**
   * delete single record
   * @param {*} model
   * @param {*} query
   * @param {*} options
   * @returns
   */
  module.exports.deleteOne = (model, query, options) =>
    new Promise((resolve, reject) => {
      model
        .findOneAndDelete(query, options)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });

/**
 * Find delivery data by postal code
 * @param model - The Mongoose model
 * @param postalCode - The postal code to search for
 * @returns {Promise<any>} - The delivery data matching the postal code
 */
module.exports.findByPostalCode = (model, postalcode) =>
  new Promise((resolve, reject) => {
    model
      .find({ 'addresses.postalcode': postalcode })
      .then((data) => {
        if (!data || !Array.isArray(data)) {
          return resolve([]);
        }

        const formattedData = data.map(item => {
          const address = item.addresses.find(addr => addr.postalcode === postalcode);
          return {
            state: item.state,
            city: address ? address.city : null,
            suburb: address ? address.suburb : null,
            deliverycost: item.deliverycost,
            pickupcost: item.pickupcost
          };
        });

        resolve(formattedData);
      })
      .catch((err) => {
        reject(err);
      });
  });





