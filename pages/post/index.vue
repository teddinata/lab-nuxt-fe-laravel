<template>
  <b-container fluid="md" class="mt-5 mb-5">
    <b-row>
      <b-col md="12">
        <b-card class="shadow-md border-0 rounded-lg">
          <h5>DATA POST</h5>
          <hr>
          <b-button tag="nuxt-link"
            :to="{ name: 'post-create' }" class="mb-3" variant="primary">Tambah Data</b-button>
          <b-table striped bordered hover :items="posts" :fields="fields" show-empty>
            <template v-slot:cell(actions)="row">
              <b-button :to="{ name: 'post-edit-id', params: { id: row.item.id } }" variant="warning" size="sm">Edit</b-button>
              <b-button @click="deletePost(row)" variant="danger" size="sm">Delete</b-button>
            </template>
          </b-table>
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
          width: '20%'
        },
        {
          key: 'created_at',
          label: 'Created At',
          sortable: true,
          width: '10%'
        },
        {
          key: 'actions',
          label: 'Action',
          sortable: false,
          width: '15%'
        }
      ],
      // fields: [ 'title', 'content',  'actions'],
      // post data table
      posts: [],
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    async getList(){
      await // fetching data
      this.$axios.get('/api/posts')
        .then(response => {
          this.posts = response.data.data
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
    async deletePost(row) {
      // send data ke api
      await this.$axios.delete(`/api/posts/${row.item.id}`)
        .then(() => {

          // remove item by array index
          this.posts.splice(row.index, 1);
          // toast notification when successful delete with id

          this.$bvToast.toast(`Data with id ${row.item.title} has been deleted`, {
          title: `Data berhasil dihapus`,
          variant: 'info',
          solid: true
        })
        })
    }
  }
}
</script>


