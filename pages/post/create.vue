<template>
  <b-container fluid="md" class="mt-5 mb-5">
    <b-row>
      <b-col md="12">
        <b-card class="shadow-md border-0 rounded-lg">
          <h5>TAMBAH POST</h5>
          <hr>
          <b-form @submit="store">
            <b-form-group label="Title">
              <b-form-input type="text" v-model="posts.title" :class="{ 'is-invalid': validation.title }"
                placeholder="Input Title">
              </b-form-input>
              <!-- validation title -->
              <!-- <b-form-invalid-feedback :state="validation.title">
                <span>{{ validation.title[0] }}</span>
              </b-form-invalid-feedback> -->
              <div v-if="validation.title" class="mt-2">
                <b-alert show variant="danger">{{ validation.title[0] }}</b-alert>
              </div>
              </b-form-group>
              <b-form-group label="Content">
              <b-form-input type="text" v-model="posts.content" :class="{ 'is-invalid': validation.content }"
                placeholder="Input Content">
              </b-form-input>
              <!-- validation content -->
              <div v-if="validation.content" class="mt-2">
                <b-alert show variant="danger">{{ validation.content[0] }}</b-alert>
              </div>
            </b-form-group>
            <b-button type="submit" class="mb-3" variant="primary">Tambah Data</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        // state post
        posts: {
          title: '',
          content: ''
        },
        // validation post
        validation: [],
      }
    },

    methods: {
      // method store post
      async store(e) {
        e.preventDefault()

        // send data
        await this.$axios.post('/api/posts', {

          // data yang dikirim ke server
          title: this.posts.title,
          content: this.posts.content,

        })
        .then(() => {
          this.$router.push({ name: 'post' })

        })
        .catch(error => {
          // assign validation
          this.validation = error.response.data
        })
      }
    }
  }
</script>
