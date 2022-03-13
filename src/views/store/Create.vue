<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="店家帳號" prop="title">
        <el-input v-model="form.title" placeholder="請輸入店家帳號" />
      </el-form-item>
      <el-form-item label="店家密碼" prop="subTitle">
        <el-input v-model="form.subTitle" placeholder="請輸入店家密碼" />
        <p class="text-secondary mt-1 mb-0 lh-sm" style="font-size: 0.75rem;">第一次設定密碼或是忘記密碼時使用</p>
      </el-form-item>
      <el-form-item label="店家名稱" prop="innerTitle">
        <el-input v-model="form.innerTitle" placeholder="請輸入店家名稱" />
      </el-form-item>
      <el-form-item label="室內電話" prop="innerTitle">
        <el-input v-model="form.innerTitle" placeholder="請輸入室內電話" />
      </el-form-item>
      <el-form-item label="手機號碼" prop="innerTitle">
        <el-input v-model="form.innerTitle" placeholder="請輸入手機號碼" />
      </el-form-item>
      <el-form-item label="店家地址">
        <div class="d-flex">
          <el-select v-model="form.status" class="me-3" placeholder="請選擇">
            <el-option label="正常" :value="1" />
            <el-option label="已停權" :value="2" />
          </el-select>
          <el-select v-model="form.status" placeholder="請選擇">
            <el-option label="正常" :value="1" />
            <el-option label="已停權" :value="2" />
          </el-select>
        </div>
        <div class="mt-3">
          <el-input v-model="form.innerTitle" placeholder="請設定店家地址" />
        </div>
      </el-form-item>
      <el-form-item label="Email" prop="innerTitle">
        <el-input v-model="form.innerTitle" placeholder="請輸入 Email" />
      </el-form-item>
      <el-form-item label="店家網站" prop="innerTitle">
        <el-input v-model="form.innerTitle" placeholder="請輸入網址" />
      </el-form-item>
      <el-form-item label="店家匯款資訊" class="pt-4" />
      <el-form-item label="匯款銀行">
        <div class="d-flex">
          <el-select v-model="form.status" class="me-3" placeholder="請選擇">
            <el-option label="正常" :value="1" />
            <el-option label="已停權" :value="2" />
          </el-select>
          <el-select v-model="form.status" placeholder="請選擇">
            <el-option label="正常" :value="1" />
            <el-option label="已停權" :value="2" />
          </el-select>
        </div>
        <div class="mt-3">
          <el-input v-model="form.innerTitle" placeholder="請設定店家地址" />
        </div>
      </el-form-item>
      <el-form-item label="匯款戶名" prop="innerTitle">
        <el-input v-model="form.innerTitle" placeholder="請輸入匯款戶名" />
      </el-form-item>
      <el-form-item label="匯款帳號" prop="innerTitle">
        <el-input v-model="form.innerTitle" placeholder="請輸入匯款帳號" />
      </el-form-item>
      <el-form-item label="店家圖片" prop="coverImage">
        <ImageUpload :file-list="form.coverImage" />
      </el-form-item>
      <!-- <el-form-item label="景點內頁圖片" prop="contentImages">
        <ImageUpload :file-list="form.contentImages" is-multiple />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageUpload from '@/components/ImageUpload'

export default {
  name: 'StoreCreate',
  components: { ImageUpload },
  data() {
    return {
      form: {
        coverImage: [],
        contentImages: [],
        title: '',
        subTitle: '',
        innerTitle: '',
        desc: '',
        tel: '',
        address: '',
        info: '',
        location: { lat: 22.445759, lng: 120.473509 }
      },
      formRules: {
        title: [
          { required: true, message: '請輸入景點名稱', trigger: 'blur' }
        ],
        subTitle: [
          { required: true, message: '請輸入景點副標', trigger: 'blur' }
        ],
        innerTitle: [
          { required: true, message: '請輸入內容標題', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '請輸入內容描述', trigger: 'blur' }
        ],
        coverImage: [
          { type: 'array', required: true, message: '請上傳圖片', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    center() {
      const { lat, lng } = this.form.location
      return { lat: parseFloat(lat), lng: parseFloat(lng) }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form)
        } else {
          this.$message.error('請確認必填欄位輸入完整')
          return false
        }
      })
    },
    setInputValue(key, value) {
      this.form[key] = value
    }
  }
}
</script>

<style>

</style>
