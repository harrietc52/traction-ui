<template>
  <div>
    <b-btn variant="primary"
           id="printLabels"
           :disabled="disabled"
           v-b-modal.printerModal>
      Print Labels
    </b-btn>
    <b-modal id="printerModal"
             size="sm"
             title="Print Labels"
             ref="printerModal"
             :static="isStatic"
             @ok="handleOk"
             @shown="clearSelect">
      <b-form-select v-model="selectedPrinterId" :options="printerOptions" />
    </b-modal>
  </div>
</template>

<script>
const MESSAGE_PRINTER_SELECT = 'Please select a printer'
export default {
  name: 'PrinterModal',
  data () {
    return {
      selectedPrinterId: null,
      printerOptions: []
    }
  },
  props: {
    disabled: Boolean,
    isStatic: Boolean
  },
  methods: {
    clearSelect () {
      this.selectedPrinterId = null
    },
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault()

      if (!this.selectedPrinterId) {
        alert(MESSAGE_PRINTER_SELECT)
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      // OR store holds key id and text value - emit id then store handles get name
      let printerName = this.printerOptions[this.selectedPrinterId].text
      this.$emit('selectPrinter', printerName)
      this.clearSelect()
      /**
       * Hide the modal manually
       * https://vuejsdevelopers.com/2019/01/22/vue-what-is-next-tick/
       * https://bootstrap-vue.js.org/docs/components/modal/#prevent-closing
       */
      this.$nextTick(() => {
        this.$refs.printerModal.hide()
      })
    },
    setPrinterNames () {
      let printerOptions = this.$store.getters.printers.map(
        (printer, index) => ({ value: index + 1, text: printer })
      )
      printerOptions.unshift({ value: null, text: MESSAGE_PRINTER_SELECT })
      this.printerOptions = printerOptions
    },
    provider () {
      this.setPrinterNames()
    }
  },
  created () {
    this.provider()
  }
}
</script>
