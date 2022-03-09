<template>
  <TinyEditor
    v-model="content"
    :init="initOption"
  />
</template>

<script>
import TinyEditor from '@tinymce/tinymce-vue'

export default {
  name: 'Editor',
  components: { TinyEditor },
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      initOption: {
        height: 300,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic forecolor backcolor | \
          alignleft aligncenter alignright alignjustify | image | \
          bullist numlist outdent indent | removeformat',
        images_upload_url: 'postAcceptor.php',
        apiKey: 'WO79DFLT'
      }
    }
  }
}
</script>

<style>

</style>
