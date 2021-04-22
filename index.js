'use strict';

const clientsModel = require('./schema.js');


exports.handler = async (event) => {
  console.log('EVENT', event.body)
  try {
    const body = JSON.parse(event.body)
    const id = event.queryStringParameters.id

    if (body.name && body.phone) {
      await clientsModel.update({ "id": id }, {"name": body.name}, {"phone": body.phone})
    } else if (body.name) {
      await clientsModel.update({ "id": id }, {"name": body.name})
    } else if (body.phone)
      await clientsModel.update({ "id": id }, {"phone": body.phone})

    const strigifiedId = JSON.stringify(id)
    return {
      statusCode: 201,
      body: `ID: ${strigifiedId} HAS SUCESSFULLY BEEN UPDATED!`
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message
    }
  }
}