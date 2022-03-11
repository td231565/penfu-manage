<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="https://pengfu-app.herokuapp.com/api/upload/"
      :show-file-list="isMultiple"
      :file-list="isMultiple ? fileList : []"
      :on-success="handleUploadSuccess"
      :before-upload="beforeImageUpload"
    >
      <template v-if="!isMultiple">
        <img v-if="fileList[0]" :src="fileList[0]" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </template>
      <template v-else>
        <i slot="default" class="el-icon-plus avatar-uploader-icon" />
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail avatar"
            :src="file.url"
            alt=""
          >
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <i class="el-icon-zoom-in" />
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <i class="el-icon-delete" />
            </span>
          </span>
        </div>
      </template>
    </el-upload>
    <!-- Image-Dialog -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  props: {
    isMultiple: {
      type: Boolean,
      default: false
    },
    fileList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // fileList: [],
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    beforeImageUpload(file) {
      const isPic = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
      const limitMb = 1 * 1024 * 1024
      const isSizeValid = file.size < limitMb

      if (!isPic) {
        this.$message.error('圖片格式須為 jpg, jpeg, png')
      }
      if (!isSizeValid) {
        this.$message.error('圖片容量不能超過1MB')
      }
      // do ajax
      return isPic && isSizeValid
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleUploadSuccess(res, file) {
      console.log(res)
      console.log(file)
      this.fileList[0] = URL.createObjectURL(file.raw)
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
