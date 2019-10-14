// import handlePromise from '@/api/PromiseHelper'
import Response from '@/api/Response'

// const getSampleExtractionTubesForBarcodes = async ({ commit, getters }, barcodes)  => {
  // let barcodeString = barcodes.join(',')
  // let request = getters.sampleExtractionTubeRequest
  // let promise = request.get({filter: { barcode: barcodeString} })
  // let response = await handlePromise(promise)
  // ...

const getSampleExtractionTubesForBarcodes = async ({ commit }) => {
  // mock data until Sample Extraction allows CORS
  let mockData = { "data": [{ "id": "58a33358-e8f4-11e9-9231-68b59977951e", "type": "assets", "links": { "self": "https://docker-uat.samples-extraction.psd.sanger.ac.uk/api/v1/assets/58a33358-e8f4-11e9-9231-68b59977951e" }, "attributes": { "uuid": "58a33358-e8f4-11e9-9231-68b59977951e", "asset_type": "Tube", "barcode": "SE108532I", "sample_uuid": "4008d13c-e8f3-11e9-9231-68b59977951e", "study_uuid": null, "pipeline": null, "library_type": null, "estimate_of_gb_required": null, "number_of_smrt_cells": null, "cost_code": null, "fields": { "aliquotType": "DNA", "a": "Tube", "transferredFrom": "4008d13c-e8f3-11e9-9231-68b59977951e", "is": "Used", "sample_tube": "4008d13c-e8f3-11e9-9231-68b59977951e", "study_name": "UAT Study", "sanger_sample_id": "5200STDY7322947", "sample_id": "5200STDY7322947", "location": "A01", "parent": "5888a006-e8f4-11e9-9231-68b59977951e" } } }] }

  let mockResponse = {
    data: mockData,
    status: 201,
    statusText: "Created"
  }

  let response = new Response(mockResponse)

  if (response.successful && !response.empty) {
    let assets = response.deserialize.assets
    commit('setSampleExtractionTubes', assets)
  }
  return response
}

const actions = {
  getSampleExtractionTubesForBarcodes
}

export {
  getSampleExtractionTubesForBarcodes
}

export default actions
