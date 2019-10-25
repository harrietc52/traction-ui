import handlePromise from './PromiseHelper'

const NO_OF_COLUMNS = 12
const NO_OF_ROWS = 8

const columns = () => {
  return Array.from(Array(NO_OF_COLUMNS), (e, i) => String(i + 1))
}

const rows = () => {
  return Array.from(Array(NO_OF_ROWS), (e, i) => String.fromCharCode(65 + i))
}

const buildWell = (row, column) => {
  return  {
    row: row, 
    column: column, 
    position: `${row}${column}`,
    movie_time: '',
    insert_size: '',
    on_plate_loading_concentration: '',
    sequencing_mode: '',
    library: {
      id: '',
      barcode: ''
    }
  }
}

const buildWells = () => {
  let wells = []

  for (const column of columns()) {
    for (const row of rows()) {
      wells.push(buildWell(row, column))
    }
  }

  return wells
}

const build = (object) => {
     return object || {
        id: 'new',
        name: '',
        template_prep_kit_box_barcode: '',
        binding_kit_box_barcode: '',
        sequencing_kit_box_barcode: '',
        dna_control_complex_box_barcode: '',
        comments: '',
        system_name: '',
        plate: {
          barcode: '',
          wells: buildWells()
        }
    }
}

// REFACTOR
const create = async (run, request) => {
    let runId

    try {
        let runPayload = {
            data: {
                type: "runs",
                attributes: {
                    name: run.name,
                    template_prep_kit_box_barcode: run.template_prep_kit_box_barcode,
                    binding_kit_box_barcode: run.binding_kit_box_barcode,
                    sequencing_kit_box_barcode: run.sequencing_kit_box_barcode,
                    dna_control_complex_box_barcode: run.dna_control_complex_box_barcode,
                    system_name: run.system_name,
                }
            }
        }

        let runResponse = await createResource(runPayload, request.runs)
        runId = runResponse.deserialize.runs[0].id

        let platePayload = {
            data: {
                type: "plates",
                attributes: {
                    pacbio_run_id: runId,
                    barcode: run.plate.barcode
                }
            }
        }

        let plateResponse = await createResource(platePayload, request.plates)
        let plateId = plateResponse.deserialize.plates[0].id

        for (const well of run.plate.wells) {
            let wellPayload = {
                data: {
                    type: "wells",
                    attributes: {
                        row: well.row,
                        column: well.column,
                        pacbio_plate_id: plateId,
                        movie_time: well.movie_time,
                        insert_size: well.insert_size,
                        on_plate_loading_concentration: well.on_plate_loading_concentration,
                        sequencing_mode: well.sequencing_mode,
                    }
                }
            }

            let wellResponse = await createResource(wellPayload, request.wells)
            let wellId = wellResponse.deserialize.wells[0].id

            let wellLibraryPayload = {
                data: {
                    type: "libraries",
                    attributes: {
                    },
                    relationships: {
                        libraries: {
                            data: [{ "type": "libraries", "id": well.library.id }]
                        }
                    }
                }
            }

            await createRelationshipResource(wellLibraryPayload, request.wells, wellId, 'libraries')
        }

    } catch (err) {
        destroy(runId, request.runs)
        return false
    }
    return true
}

const createResource = async (payload, request) => {
    let response = await handlePromise(request.create(payload))

    if (response.successful) {
        return response
    } else {
        throw response.errors
    }
}

const createRelationshipResource = async (payload, request, id, relationship) => {
    let response = await handlePromise(request.createRelationship(id, relationship, payload))

    if (response.successful) {
        return response
    } else {
        throw response.errors
    }
}

const destroy = async (id, request) => {
    let promise = request.destroy(id)
    return await handlePromise(promise)
}


export {
    build,
    create,
    createResource,
    createRelationshipResource,
    destroy
}
