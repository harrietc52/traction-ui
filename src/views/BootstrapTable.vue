<template>
  <b-container fluid>
    <b-table show-empty
             stacked="md"
            :items="getSampleItems"
            :fields="fields"
            :hover="hover"
            :sortBy="sortBy"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
    >

      <template slot="details" slot-scope="row">
        <b-button size="sm" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? 'Less' : 'More'}}
        </b-button>
      </template>

      <template slot="row-details" slot-scope="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Extra info 1:</b></b-col>
            <!-- <b-col>{{ row.item.relationships.libraries.data }}</b-col> -->
            <b-col>Show extra info for the row here on </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Extra info 2:</b></b-col>
            <!-- <b-col>{{ row.item.relationships.tube }}</b-col> -->
            <b-col>{{ row.item}}</b-col>

          </b-row>
        </b-card>
      </template>

    </b-table>
    <p>
      Sorting By: <b>{{ sortBy }}</b>,
      Sort Direction: <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
    </p>
  </b-container>
</template>

<script>
// import Vue from 'vue'
import axios from 'axios'

export default {
  data () {
    return {
      items: [
        { name: "bob", species: "cat", barcode: 'ABCDi3eds3on' },
        { name: "lucy", species: "whale", barcode: 'La234drsen' },
        { name: "mark", species: "cat", barcode: 'Gendf64eva' },
        { name: "matt", species: "dog", barcode: 'ew23grew' }
      ],
      fields: [
        { key: 'name',                      label: 'Name',        sortable: true },
        { key: 'sequencescape-request-id',  label: 'Request ID',  sortable: true },
        { key: 'species',                   label: 'Species',     sortable: true },
        { key: 'barcode',                   label: 'Barcode',     sortable: true },
        { key: 'details',                   label: '' },
      ],
      hover: true,
      sortBy: 'name',
      sortDesc: false
    }
  },
  methods: {
    getSampleItems() {
      return axios({
        url: 'http://localhost:3100/v1/samples',
        method: 'GET',
      })
        .then((response) => {
          const items = response.data.data.map((item) => {
             const formattedItem = Object.assign(
               { }, item, item.attributes
             );
             return formattedItem;
           });
           this.items = items;
           return items;
        }).catch(() => {
          return [];
        });
    }
  },
  computed: {
  },
}
</script>
