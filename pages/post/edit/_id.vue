<template>
  <b-container fluid="md" class="mt-5 mb-5">
    <b-row>
      <b-col md="12">
        <b-card class="shadow-md border-0 rounded-lg">
          <h5>EDIT POST</h5>
          <hr>
          <b-form @submit="update">
            <b-form-group label="Title" label-for="title">
              <b-form-input id="title" v-model="post.title" :class="{'is-invalid': validation.title}" required></b-form-input>
             <div v-if="validation.title" class="invalid-feedback mt-2">
                <b-alert show variant="danger">{{ validation.title[0] }}</b-alert>
             </div>
            </b-form-group>
            <b-form-group label="Content" label-for="content">
              <b-form-textarea id="content" v-model="post.content" :class="{'is-invalid': validation.content}" required></b-form-textarea>
              <div v-if="validation.content" class="invalid-feedback mt-2">
                <b-alert show variant="danger">{{ validation.content[0] }}</b-alert>
              </div>
            </b-form-group>
            <b-button type="submit" variant="primary">Update</b-button>
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
        post: {
          title: '',
          content: ''
        },
        validation: [],
      }
    },

    mounted() {
      // get data by id
      this.$axios.get(`api/posts/${this.$route.params.id}`)
        .then(response => {
          this.post.title = response.data.data.title
          this.post.content = response.data.data.content
        })
    },

    methods: {
      async update(e) {
        e.preventDefault()

        // send data ke api
        await this.$axios.put(`api/posts/${this.$route.params.id}`, {

          // has data to send
          title: this.post.title,
          content: this.post.content,

        })
        .then(() => {
          this.$router.push({ name: 'post' })
        })

        .catch(error => {
          this.validation = error.response.data.errors
        })
      }
    }
  }

</script>
