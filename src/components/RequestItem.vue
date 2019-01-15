<template>
  <!-- <div> -->
    <tr @click="show = !show">
      <td><input class="selected" type="checkbox" v-model="selected" /></td>
      <td>{{ id }}</td>
      <td>{{ name }}</td>
      <td>{{ species }}</td>
      <td colspan="7" v-if="show">
        <div>
            ACCORDION
        </div>
      </td>
    </tr>

    <!-- <tr colspan="7" v-if="show">
      <div>
          ACCORDION
      </div>
    </tr>
  </div> -->
</template>

<script>

export default {
  name: 'RequestItem',
  props: {
    id: {
      type: [String, Number]
    },
    name: {
      type: String
    },
    species: {
      type: String
    }
  },
  data () {
    return {
      selected: false,
      show: false
    }
  },
  methods: {
  },
  computed: {
    json () {
      return {
        sequencescape_request_id: this.id,
        name: this.name,
        species: this.species //'mockSpeciesForSS' // TODO: currently stubbed species from SS
      }
    }
  }
}
</script>

<style>
</style>
