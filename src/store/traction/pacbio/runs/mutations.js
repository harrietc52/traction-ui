const mutations = {
    setRuns(state, runs) {
        state.runs = runs
    },
    setCurrentRun(state, run) {
        state.currentRun = run
    },
    setName(state, name) {
        state.currentRun.name = name
    },
    setTemplatePrepKitBoxBarcode(state, barcode) {
        state.currentRun.template_prep_kit_box_barcode = barcode
    },
    setBindingKitBoxBarcode(state, barcode) {
        state.currentRun.binding_kit_box_barcode = barcode
    },
    setSequencingKitBoxBarcode(state, barcode) {
        state.currentRun.sequencing_kit_box_barcode = barcode
    },
    setDNAControlComplexBoxBarcode(state, barcode) {
        state.currentRun.dna_control_complex_box_barcode = barcode
    },
    setComments(state, comments) {
        state.currentRun.comments = comments
    },
    setUuid(state, uuid) {
        state.currentRun.uuid = uuid
    },
    setSystemName(state, systemName) {
        state.currentRun.system_name = systemName
    },
}

export default mutations