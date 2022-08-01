<template>
  <b-container fluid="md" class="mt-5 mb-5">
    <b-row>
      <b-col md="12">
        <b-card class="shadow-md border-0 rounded-lg">
          <h5>DATA POST</h5>
          <hr>
          <b-button tag="nuxt-link"
            :to="{ name: 'post-create' }" class="mb-3" variant="primary">Tambah Data</b-button>
          <b-table striped bordered hover :items="posts" :fields="fields" show-empty></b-table>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      // header table
      fields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true,
          width: '5%'
        },
        {
          key: 'title',
          label: 'Title',
          sortable: true,
          width: '20%'
        },
        {
          key: 'content',
          label: 'Content',
          sortable: true,
          width: '50%'
        },
        {
          key: 'created_at',
          label: 'Created At',
          sortable: true,
          width: '10%'
        },
        {
          key: 'action',
          label: 'Action',
          sortable: false,
          width: '10%'
        }
      ],
      // fields: [ 'title', 'content',  'actions'],
      // post data table
      posts: [],
    }
  },

  mounted() {
    // fetching data
    this.$axios.get('/api/posts')
      .then(response => {
        this.posts = response.data.data
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }
}
</script>


