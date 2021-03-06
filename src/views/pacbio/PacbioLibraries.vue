<template>
  <div>
    <alert ref='alert'></alert>

    <p v-if="this.preFilteredMaterials.length > 0" class="font-weight-bold">
      Only showing libraries for the following barcodes: {{ this.preFilteredMaterials.map(library => library.barcode).join(', ') }}
      <b-button @click="clearPreFilter" size="sm" variant="info">Clear pre-filter</b-button>
    </p>

    <b-form-group label="Filter"
                  label-cols-sm="1"
                  label-align-sm="right"
                  label-for="filterInput"
                  class="mb-0">
      <b-input-group>
        <b-form-input v-model="filter"
                      type="search"
                      id="filterInput"
                      placeholder="Type to Search">
        </b-form-input>
        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <br>

    <b-table id="libraries-table"
             show-empty
             :items="items"
             :fields="fields"
             :filter="filter"
             :per-page="perPage"
             :current-page="currentPage"
             hover
             @filtered="onFiltered"
               selectable
             select-mode="multi"
             @row-selected="onRowSelected">
      <template v-slot:cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span>&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span>&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
    </b-table>

    <span class="font-weight-bold">Total records: {{ rows }}</span>

    <div class="clearfix">
      <b-button variant="danger"
                class="float-left"
                id="deleteLibraries"
                @click="handleLibraryDelete"
                :disabled="this.selected.length === 0">
        Delete Libraries
      </b-button>
      <printerModal class="float-left"
                    @selectPrinter="handlePrintLabel"
                    :disabled="this.selected.length === 0">
      </printerModal>

      <b-pagination class="float-right"
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="libraries-table">
      </b-pagination>
    </div>
  </div>
</template>

<script>
import Helper from '@/mixins/Helper'
import MatType from '@/mixins/MatType'
import TableHelper from '@/mixins/TableHelper'
import Alert from '@/components/Alert'
import PrinterModal from '@/components/PrinterModal'
import * as consts from '@/consts/consts'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('traction/pacbio/tubes')

export default {
  name: 'Libraries',
  mixins: [Helper, MatType, TableHelper],
  data () {
    return {
      fields: [
        { key: 'selected', label: '' },
        { key: 'id', label: 'Library ID', sortable: true },
        { key: 'volume', label: 'Volume', sortable: true },
        { key: 'concentration', label: 'Concentration', sortable: true },
        { key: 'library_kit_barcode', label: 'Library Kit Barcode', sortable: true },
        { key: 'fragment_size', label: 'Fragment Size', sortable: true },
        { key: 'created_at', label: 'Created at', sortable: true },
      ],
      items: [],
      filteredItems: [],
      selected: [],
      filter: null,
      perPage: 5,
      currentPage: 1,
      preFilteredMaterials: []
    }
  },
  components: {
    Alert,
    PrinterModal
  },
  computed: {
    ...mapGetters([
      'tractionTubesWithInfo',
      'tractionTubes',
      'requestsRequest',
      'libraryRequest'
    ])
  },
  methods: {
    async handleLibraryDelete () {
      try {
        let selectedIds = this.selected.map(s => s.id)
        let responses = await this.deleteLibraries(selectedIds)

        if (responses.every(r => r.successful)) {
          let keyword = selectedIds.length > 1 ? 'Libraries' : 'Library'
          this.showAlert(`${keyword} ${selectedIds.join(', ')} successfully deleted`)
        } else {
          throw Error(responses.map(r => r.errors.message).join(','))
        }
      } catch (error) {
        this.showAlert(consts.MESSAGE_ERROR_DELETION_FAILED + error.message, 'danger')
      }
    },
    // Get all the libraries
    // Provider function used by the bootstrap-vue table component
    async provider() {
      this.items = await this.getMaterial(consts.MAT_TYPE_LIBRARIES)
    },
    clearPreFilter() {
      this.log('clearPreFilter()')
      this.items = Object.keys(this.$store.getters.libraries).map(
        key => this.$store.getters.library(key))
      this.preFilteredMaterials = []
    },
    ...mapActions([
      'deleteLibraries'
    ])
  },
  created() {
    // When this component is created (the 'created' lifecycle hook is called), we need to get the
    // items for the table
    this.provider()
  },
}
</script>
