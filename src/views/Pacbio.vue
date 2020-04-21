<template>
  <!-- <pipeline-view></pipeline-view> -->
  <apollo-example></apollo-example>
</template>

<script>

import PipelineView from '@/views/PipelineView'
import ApolloExample from '@/components/ApolloExample'
import gql from 'graphql-tag'

export default {
  name: 'Pacbio',
  components: {
    PipelineView,
    ApolloExample
  },
  apollo: {
  // Simple query that will update the 'hello' vue property
    // hello: gql`query {
    //   hello
    // }`,
  },
  created () {
    debugger
    console.log(this.$apollo.provider.defaultClient)
    localStorage.setItem('pipeline', 'pacbio')
  }
}

</script>