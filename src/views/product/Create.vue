<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="商品類型">
        <el-select v-model="form.type" placeholder="請選擇">
          <el-option label="請選擇" :value="0" disabled />
          <el-option label="票券" :value="1" />
          <el-option label="伴手禮" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品名稱">
        <el-input v-model="form.title" placeholder="請輸入商品名稱" />
      </el-form-item>
      <el-form-item label="商品副標">
        <el-input v-model="form.subTitle" placeholder="請輸入商品副標" />
      </el-form-item>
      <el-form-item label="商品清單圖片">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="(res, file) => { this.form.coverImage = URL.createObjectURL(file.raw) }"
          :before-upload="beforeImageUpload"
        >
          <img v-if="form.coverImage" :src="form.coverImage" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="商品內頁圖片">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :file-list="form.imageList"
          :on-success="(res, file) => { this.form.imageList = URL.createObjectURL(file.raw) }"
          :before-upload="beforeImageUpload"
        >
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
        </el-upload>
      </el-form-item>
      <el-form-item label="商品描述">
        <Editor
          v-model="form.desc"
          :init="{
            height: 300,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help',
          }"
        />
      </el-form-item>
      <el-form-item label="商品價格">
        <el-input-number v-model="form.price" placeholder="请输入商品價格" :min="0" />
      </el-form-item>
      <el-form-item label="使用日期">
        <el-date-picker v-model="form.useDate" type="date" placeholder="請選擇日期" />
      </el-form-item>
      <el-form-item label="商品庫存">
        <el-input-number v-model="form.stock" placeholder="設定庫存量" :min="1" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <!-- Image-Dialog -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'ProductCreate',
  components: { Editor },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      form: {
        type: 0,
        title: '',
        subTitle: '',
        price: 0,
        date: '',
        useDate: '',
        stock: 0,
        desc: '',
        coverImage: '',
        imageList: []
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      console.log(this.form)
    },
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
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
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
