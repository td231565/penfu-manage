<template>
  <div v-loading.fullscreen.lock="isLoading" class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="店家帳號" prop="username">
        <el-input v-model="form.username" placeholder="請輸入店家帳號" />
      </el-form-item>
      <el-form-item label="店家密碼" prop="password">
        <el-input v-model="form.password" placeholder="請輸入店家密碼" />
        <p class="text-secondary mt-1 mb-0 lh-sm" style="font-size: 0.75rem;">第一次設定密碼或是忘記密碼時使用</p>
      </el-form-item>
      <el-form-item label="店家名稱" prop="name">
        <el-input v-model="form.name" placeholder="請輸入店家名稱" />
      </el-form-item>
      <el-form-item label="負責人姓名" prop="representative">
        <el-input v-model="form.representative" placeholder="請輸入負責人姓名" />
      </el-form-item>
      <el-form-item label="室內電話" prop="phoneNumber">
        <el-input v-model="form.phoneNumber" type="tel" placeholder="請輸入室內電話" />
      </el-form-item>
      <el-form-item label="手機號碼" prop="cellphone">
        <el-input v-model="form.cellphone" type="tel" placeholder="請輸入手機號碼" />
      </el-form-item>
      <el-form-item label="店家地址">
        <!-- <div class="d-flex">
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
          <el-input v-model="form.address" placeholder="請設定店家地址" />
        </div> -->
        <el-input v-model="form.address" placeholder="請設定店家地址" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" type="email" placeholder="請輸入 Email" />
      </el-form-item>
      <el-form-item label="店家網站" prop="website">
        <el-input v-model="form.website" placeholder="請輸入網址" />
      </el-form-item>
      <el-form-item label="店家匯款資訊" class="pt-4" />
      <el-form-item label="匯款銀行">
        <div class="d-flex">
          <!-- <el-select v-model="form.status" class="me-3" placeholder="請選擇">
            <el-option label="正常" :value="1" />
            <el-option label="已停權" :value="2" />
          </el-select>
          <el-select v-model="form.status" placeholder="請選擇">
            <el-option label="正常" :value="1" />
            <el-option label="已停權" :value="2" />
          </el-select> -->
          <el-input v-model="form.accountBank" placeholder="銀行名稱" />
        </div>
        <div class="mt-3">
          <el-input v-model="form.accountBankBranch" placeholder="分行名稱" />
        </div>
      </el-form-item>
      <el-form-item label="匯款戶名" prop="accountName">
        <el-input v-model="form.accountName" placeholder="請輸入匯款戶名" />
      </el-form-item>
      <el-form-item label="匯款帳號" prop="accountSeries">
        <el-input v-model="form.accountSeries" type="tel" placeholder="請輸入匯款帳號" />
      </el-form-item>
      <!-- <el-form-item label="店家圖片" prop="listImage">
        <ImageUpload :file-list="form.listImage" />
      </el-form-item> -->
      <!-- <el-form-item label="景點內頁圖片" prop="contentImage">
        <ImageUpload :file-list="form.contentImage" is-multiple />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增</el-button>
        <el-button @click="gotoList">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import ImageUpload from '@/components/ImageUpload'
import { createNewStore, getUserDetail, updateStoreDetail, updateUserPassword } from '@/api/store.js'

export default {
  name: 'StoreCreate',
  // components: { ImageUpload },
  data() {
    return {
      isLoading: false,
      form: {
        category: '店家',
        lineID: 'default',
        status: 1
      },
      isCreate: true
    }
  },
  computed: {
  },
  created() {
    const id = this.$route.params.id
    if (id) {
      this.isCreate = false
      this.getStoreDetail(id)
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLoading = true
          if (this.isCreate) {
            createNewStore(this.form).then(data => {
              this.$message({ type: 'success', message: `新增店家成功` })
              this.$router.push({ name: 'StoreList' })
              this.isLoading = false
            }).catch(err => {
              console.log(err)
              this.isLoading = false
            })
          } else {
            updateStoreDetail(this.form).then(() => {
              if (this.form.password) {
                const { id, password: newPassword } = this.form
                const data = { id, newPassword }
                updateUserPassword(data).then(() => {
                  this.$message({ type: 'success', message: `修改店家資料成功` })
                  this.$router.push({ name: 'StoreList' })
                  this.isLoading = false
                }).catch(err => {
                  console.log(err)
                  this.isLoading = false
                })
              } else {
                this.$message({ type: 'success', message: `修改店家資料成功` })
                this.$router.push({ name: 'StoreList' })
                this.isLoading = false
              }
            }).catch(err => {
              console.log(err)
              this.isLoading = false
            })
          }
        } else {
          this.$message.error('請確認必填欄位輸入完整')
          return false
        }
      })
    },
    getStoreDetail(id) {
      this.isLoading = true
      getUserDetail(id).then(data => {
        this.form = data.Business
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    gotoList() {
      this.$confirm('確定返回列表嗎？資料將不會儲存').then(() => {
        this.$router.push({ name: 'StoreList' })
      })
    }
  }
}
</script>

<style>

</style>
