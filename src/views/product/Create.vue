<template>
  <div v-loading.fullscreen.lock="isLoading" class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="商品名稱" prop="title">
        <el-input v-model="form.title" placeholder="請輸入商品名稱" />
      </el-form-item>
      <el-form-item label="商品副標" prop="subTitle">
        <el-input v-model="form.subTitle" placeholder="請輸入商品副標" />
      </el-form-item>
      <el-form-item label="商品類別" prop="category">
        <el-select v-model="form.category" placeholder="請選擇">
          <el-option label="票券" value="票券" />
          <el-option label="伴手禮" value="伴手禮" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品清單圖片" prop="listImage">
        <ImageUpload :file-list="form.listImage" />
      </el-form-item>
      <el-form-item label="商品內頁圖片" prop="contentImage">
        <ImageUpload :file-list="form.contentImage" is-multiple />
      </el-form-item>
      <el-form-item label="內容描述" prop="contentArticle">
        <Editor :content="form.contentArticle" @on-change="setInputValue('contentArticle', $event)" />
      </el-form-item>
      <el-form-item v-if="form.category === '伴手禮'" label="商品價格" prop="price">
        <el-input-number v-model="form.price" placeholder="請輸入商品價格" :min="1" />
      </el-form-item>
      <template v-else-if="form.category === '票券'">
        <hr class="border-0 border-top border-gray my-5">
        <div class="d-flex">
          <el-calendar class="w-50">
            <template #dateCell="{date, data}">
              <div class="w-100 h-100" @click="selectedDate = data.day">
                <p class="my-0 border rounded-pill p-1 text-center" :class="{'border-info': data.isSelected}">{{ data.day.slice(-2) }}</p>
              </div>
            </template>
          </el-calendar>
          <div class="ms-4">
            <div class="d-flex justify-content-between align-items-center border-bottom border-gray mb-3">
              <p v-if="!selectedDate">請選擇左側日曆的日期</p>
              <p v-else>票券日期<span class="ms-2 fw-bold">{{ selectedDate }}</span></p>
              <el-button v-if="selectedDate" type="text" size="mini" icon="el-icon-circle-plus-outline" class="fs-3" circle @click="addNewStock(selectedDate)" />
            </div>
            <template v-if="selectedDate">
              <div class="d-flex">
                <span class="stock-col">時間</span>
                <span class="stock-col ms-2">價格</span>
                <span class="stock-col ms-2">庫存</span>
              </div>
              <div v-for="item in selectedTicketStock" :key="item.key" class="d-flex align-items-center">
                <el-time-select
                  v-model="item.time"
                  :picker-options="{
                    start: '06:30',
                    step: '00:05',
                    end: '22:30'
                  }"
                  placeholder="請選擇"
                  class="stock-col"
                />
                <el-input v-model="item.price" type="tel" :min="1" class="stock-col ms-2" />
                <el-input v-model="item.stock" type="tel" :min="1" class="stock-col ms-2" />
                <el-button type="text" size="mini" icon="el-icon-remove-outline" class="ms-2 fs-3" circle @click="removeStock(item.key)" />
              </div>
            </template>
          </div>
        </div>
      </template>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ isCreate ? '新增' : '儲存' }}</el-button>
        <el-button @click="gotoList">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import ImageUpload from '@/components/ImageUpload'
import { getDetail, postDetail, patchDetail } from '@/api/product'

export default {
  name: 'ProductCreate',
  components: { Editor, ImageUpload },
  data() {
    return {
      isLoading: false,
      placeQuery: '',
      form: {
        title: '',
        subTitle: '',
        contentArticle: '',
        listImage: [],
        contentImage: [],
        status: 0,
        price: 0,
        category: '',
        ticketStock: [
          // {
          //   stock: 1,
          //   time: '',
          //   date: ''
          // }
        ]
      },
      formRules: {
        title: [
          { required: true, message: '請輸入商品名稱', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '請選擇商品類別', trigger: 'blur' }
        ],
        contentArticle: [
          { required: true, message: '請輸入內容描述', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '請輸入商品價格', trigger: 'blur' }
        ]
      },
      selectedDate: '',
      isCreate: false
    }
  },
  computed: {
    selectedTicketStock() {
      return this.form.ticketStock.filter(({ date }) => date === this.selectedDate).sort((a, b) => a.time - b.time)
    }
  },
  created() {
    const id = this.$route.params.id
    this.isCreate = !id
    if (id) {
      this.getProductDetail(id)
    }
  },
  methods: {
    getProductDetail(id) {
      this.isLoading = true
      getDetail(id).then(data => {
        this.form = data.product
        this.isLoading = false
      }).catch(() => { this.isLoading = false })
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLoading = true
          const submitApi = this.isCreate ? postDetail : patchDetail
          if (this.form.category === '伴手禮') {
            delete this.form.ticketStock
          } else {
            this.form.ticketStock.forEach(item => {
              item.price = parseInt(item.price)
              item.stock = parseInt(item.stock)
            })
          }
          const id = this.$route.params.id
          submitApi(this.form, id).then(() => {
            this.$message({ type: 'success', message: '儲存成功' })
            this.$router.push({ name: 'ProductList' })
          }).catch(() => { this.isLoading = false })
        } else {
          this.$message.error('請確認必填欄位輸入完整')
          return false
        }
      })
    },
    setInputValue(key, value) {
      this.form[key] = value
    },
    addNewStock(date) {
      this.form.ticketStock.push({
        date,
        time: '',
        stock: 1,
        price: 1,
        key: new Date().valueOf()
      })
    },
    removeStock(key) {
      const selectedIdx = this.form.ticketStock.findIndex(item => item.key === key)
      this.form.ticketStock.splice(selectedIdx, 1)
    },
    gotoList() {
      this.$confirm('確定返回列表嗎？資料將不會儲存').then(() => {
        this.$router.push({ name: 'ProductList' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.border-gray {
  border-color: #ddd !important;
}
.stock-col {
  width: 150px;
  padding: 4px;
}
</style>
