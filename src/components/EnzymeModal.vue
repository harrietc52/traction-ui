<template>
  <div>
    <b-btn id="createLibrariesWithEnzymeButton"
           :disabled="disabled"
           v-b-modal.enzymeModal
           variant="success">
      Create Libraries
    </b-btn>
    <b-modal id="enzymeModal"
             size="sm"
             title="Create Libraries"
             ref="enzymeModal"
             :static="isStatic"
             @ok="handleOk"
             @shown="clearSelect">
      <b-form-select v-model="selectedEnzymeId" :options="enzymeOptions" class="mb-3" />
    </b-modal>
  </div>
</template>

<script>
import handlePromise from '@/api/PromiseHelper'
import Api from '@/mixins/Api'

export default {
  name: 'EnzymeModal',
  mixins: [Api],
  data () {
    return {
      selectedEnzymeId: null,
      enzymeOptions: []
    }
  },
  props: {
    disabled: Boolean,
    isStatic: Boolean
  },
  methods: {
    clearSelect () {
      this.selectedEnzymeId = null
    },
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault()

      if (!this.selectedEnzymeId) {
        alert('Please select an enzyme')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      this.$emit('selectEnzyme', this.selectedEnzymeId)
      this.clearSelect()
      /**
       * Hide the modal manually
       * https://vuejsdevelopers.com/2019/01/22/vue-what-is-next-tick/
       * https://bootstrap-vue.js.org/docs/components/modal/#prevent-closing
       */
      this.$nextTick(() => {
        this.$refs.enzymeModal.hide()
      })
    },
    async getEnzymeOptions () {
      let promise = this.enzymeRequest.get()
      let response = await handlePromise(promise)

      if (response.successful) {
        let enzymes = response.deserialize.enzymes
        let enzymeOptions = enzymes.map(
          (enzyme) => Object.assign({ value: parseInt(enzyme.id), text: enzyme.name }))
        enzymeOptions.unshift({ value: null, text: "Please select an option" })
        this.enzymeOptions = enzymeOptions
      } else {
        this.message = response.errors.message
      }
    },
    async provider () {
      this.getEnzymeOptions()
    }
  },
  async created() {
    this.provider()
  },
  computed: {
    enzymeRequest () {
      return this.api.traction.saphyr.enzymes
    }
  }
}
</script>
