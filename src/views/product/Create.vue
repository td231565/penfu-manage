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
        <ImageUpload :file-list="coverImage" />
      </el-form-item>
      <el-form-item label="商品內頁圖片">
        <ImageUpload :file-list="contentImages" is-multiple />
      </el-form-item>
      <el-form-item label="商品描述">
        <Editor :content="form.desc" />
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
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import ImageUpload from '@/components/ImageUpload'

export default {
  name: 'ProductCreate',
  components: { Editor, ImageUpload },
  data() {
    return {
      form: {
        type: 0,
        title: '',
        subTitle: '',
        price: 0,
        date: '',
        useDate: '',
        stock: 0,
        desc: '',
        coverImage: [],
        contentImages: []
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      console.log(this.form)
    }
  }
}
</script>

<style>

</style>
