<template>
  <div>
    <div class="d-flex">
      <div v-if="fileList.length" class="d-flex">
        <div v-for="(file, idx) in fileList" :key="file.id" class="upload-block avatar d-flex justify-content-center align-items-center position-relative me-3">
          <img
            class="avatar position-absolute top-0 start-0"
            :src="file.url"
            alt=""
          >
          <div class="avatar hide justify-content-center align-items-center position-absolute top-0 start-0" style="background-color: rgba(0,0,0,0.6);">
            <i class="el-icon-zoom-in fs-5 me-2 cursor-pointer text-white-50" @click="handlePictureCardPreview(file.url)" />
            <i class="el-icon-delete fs-5 cursor-pointer text-white-50" @click="handleRemove(file.url, idx)" />
          </div>
        </div>
      </div>
      <label v-if="fileList.length < countLimit" :for="`image-uploader-${inputId}`" tabindex="0" class="avatar-uploader position-relative">
        <i class="el-icon-plus avatar-uploader-icon" />
        <input
          :id="`image-uploader-${inputId}`"
          type="file"
          name="image-uploader"
          accept=".jpg, .jpeg, .png"
          class="el-upload__input"
          :disabled="fileList.length === countLimit"
          @change="beforeImageUpload"
        >
      </label>
    </div>
    <p class="my-0">只能上傳 jpg/png，大小不超過 5MB，尺寸 1000px * 800px</p>
    <!-- Image-Dialog -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ImageUpload',
  props: {
    isMultiple: {
      type: Boolean,
      default: false
    },
    fileList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      percentage: 0,
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  computed: {
    countLimit() {
      return this.isMultiple ? 3 : 1
    },
    inputId() {
      return new Date().valueOf()
    }
  },
  methods: {
    beforeImageUpload(e) {
      const file = e.target.files[0]
      // console.log(file)
      const isPic = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
      const limitMb = 5 * 1024 * 1024
      const isSizeValid = file.size < limitMb
      const isCountLessThanLimit = this.fileList.length < this.countLimit

      if (!isPic) {
        this.$message.error('圖片格式須為 jpg, jpeg, png')
      } else if (!isSizeValid) {
        this.$message.error('圖片容量不能超過 5MB')
      } else if (!isCountLessThanLimit) {
        this.$message.error(`圖片上限 ${this.countLimit} 張`)
      } else {
        const img = new Image()
        img.onload = () => {
          const { width, height } = img
          if (width > 1000 || height > 800) {
            this.$message.error('圖片尺寸超過限制')
          }
          if (isPic && isSizeValid && isCountLessThanLimit) {
            this.uploadImage(file)
          }
        }
        img.src = window.URL.createObjectURL(file)
      }
    },
    handleRemove(file, idx) {
      this.fileList.splice(idx, 1)
    },
    handlePictureCardPreview(imgUrl) {
      this.dialogImageUrl = imgUrl
      this.dialogVisible = true
    },
    // API
    uploadImage(file) {
      const loading = this.$loading({
        lock: true,
        spinner: 'el-icon-loading fs-1',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const formData = new FormData()
      formData.append('image', file)
      axios({
        method: 'POST',
        url: 'https://pengfu-app.herokuapp.com/api/upload/',
        data: formData,
        headers: { 'Content-type': 'multipart/form-data' }
      }).then(res => {
        // console.log(res.data)
        const { image_link } = res.data
        const obj = {
          name: file.name,
          url: image_link,
          id: new Date().valueOf()
        }
        if (this.fileList.length < this.countLimit) {
          this.fileList.push(obj)
        }
        loading.close()
      }).catch(err => {
        console.log(err)
        loading.close()
      })
    }
  }
}
</script>

<style lang="scss" scope>
.avatar-uploader {
  display: inline-block;
  text-align: center;
  position: relative;
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  outline: 0;
  &:hover {
    border-color: #409EFF;
  }
  &-icon {
    width: 148px;
    height: 148px;
    font-size: 28px;
    color: #8c939d;
    line-height: 148px;
    text-align: center;
  }
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}

.hide {
  display: none;
}
.upload-block:hover .hide {
  display: flex;
}
</style>
