<template>
  <TinyEditor
    v-model="editorContent"
    api-key="mi512enaed3bnt81xitalewoqtf3nr5j0p9jlahxntts4m08"
    :init="initOption"
  />
</template>

<script>
import TinyEditor from '@tinymce/tinymce-vue'
import { uploadImage } from '@/api/upload'

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
      editorContent: '',
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
          bullist numlist outdent indent | removeformat | code',
        images_upload_handler: this.uploadImage
      }
    }
  },
  watch: {
    editorContent(val) {
      this.$emit('on-change', val)
    },
    content: {
      immediate: true,
      handler(val) {
        this.editorContent = val
      }
    }
  },
  methods: {
    uploadImage(blob, success, failure, progress) {
      const formData = new FormData()
      formData.append('image', blob.blob(), blob.filename())
      uploadImage(formData).then(data => {
        success(data.image_link)
      }).catch(err => {
        console.log(err)
        failure('image upload error')
      })
    }
  }
}
</script>

<style>

</style>
