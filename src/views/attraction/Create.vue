<template>
  <div v-loading.fullscreen.lock="isLoading" class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="景點名稱" prop="title">
        <el-input v-model="form.title" placeholder="請輸入景點名稱" />
      </el-form-item>
      <el-form-item label="景點副標" prop="subTitle">
        <el-input v-model="form.subTitle" placeholder="請輸入景點副標" />
      </el-form-item>
      <el-form-item label="內容標題" prop="contentTitle">
        <el-input v-model="form.contentTitle" placeholder="請輸入內容標題" />
      </el-form-item>
      <el-form-item label="景點清單圖片" prop="listImage">
        <ImageUpload :file-list="form.listImage" />
      </el-form-item>
      <el-form-item label="景點內頁圖片" prop="contentImage">
        <ImageUpload :file-list="form.contentImage" is-multiple />
      </el-form-item>
      <el-form-item label="內容描述" prop="contentArticle">
        <Editor :content="form.contentArticle" @on-change="setInputValue('contentArticle', $event)" />
      </el-form-item>
      <el-form-item label="聯繫方式" prop="contactArticle">
        <Editor :content="form.contactArticle" @on-change="setInputValue('contactArticle', $event)" />
      </el-form-item>
      <!-- <el-form-item label="活動地址" prop="address">
        <Editor :content="form.address" @on-change="setInputValue('address', $event)" />
      </el-form-item> -->
      <el-form-item label="相關資訊" prop="relatedArticle">
        <Editor :content="form.relatedArticle" @on-change="setInputValue('relatedArticle', $event)" />
      </el-form-item>
      <el-form-item label="景點地圖">
        <el-col :span="2" class="text-center">
          <span>Lat</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="lat">
            <el-input v-model="form.map.lat" placeholder="請輸入緯度" />
          </el-form-item>
        </el-col>
        <el-col :span="2" class="text-center">
          <span>Lng</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="lat">
            <el-input v-model="form.map.lng" placeholder="請輸入經度" />
          </el-form-item>
        </el-col>
        <el-col :span="12" class="mt-3">
          <el-input ref="placeQuery" v-model="placeQuery" placeholder="請輸入地址搜尋" @keyup.native.enter="getLatLngByQuery" />
        </el-col>
        <el-col :span="2" class="mt-3 ms-3">
          <el-button @click="getLatLngByQuery">搜尋</el-button>
        </el-col>
        <el-col :span="24" class="mt-3">
          <GmapMap
            :center="center"
            :zoom="14"
            map-type-id="terrain"
            style="width: 500px; height: 300px"
          >
            <GmapMarker
              :position="center"
              :clickable="true"
              :draggable="false"
            />
          </GmapMap>
        </el-col>
      </el-form-item>
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
import { gmapApi } from 'vue2-google-maps'
import { getDetail, postDetail, patchDetail } from '@/api/attraction'

export default {
  name: 'AttractionCreate',
  components: { Editor, ImageUpload },
  data() {
    return {
      isLoading: false,
      placeQuery: '',
      form: {
        title: '',
        subTitle: '',
        contentTitle: '',
        contentArticle: '',
        contactArticle: '',
        relatedArticle: '',
        listImage: [],
        contentImage: [],
        status: 1,
        map: { lat: 22.445759, lng: 120.473509 }
      },
      formRules: {
        title: [
          { required: true, message: '請輸入景點名稱', trigger: 'blur' }
        ],
        subTitle: [
          { required: true, message: '請輸入景點副標', trigger: 'blur' }
        ],
        contentTitle: [
          { required: true, message: '請輸入內容標題', trigger: 'blur' }
        ],
        contentArticle: [
          { required: true, message: '請輸入內容描述', trigger: 'blur' }
        ]
        // listImage: [
        //   { type: 'array', required: true, message: '請上傳圖片', trigger: 'change' }
        // ]
      },
      isCreate: false
    }
  },
  computed: {
    center() {
      const { lat, lng } = this.form.map
      return { lat: parseFloat(lat), lng: parseFloat(lng) }
    }
  },
  created() {
    const id = this.$route.params.id
    this.isCreate = !id
    if (id) {
      this.getAttractionDetail(id)
    }
  },
  methods: {
    getAttractionDetail(id) {
      this.isLoading = true
      getDetail(id).then(data => {
        this.form = data.attraction
        this.isLoading = false
      }).catch(() => { this.isLoading = false })
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLoading = true
          const submitApi = this.isCreate ? postDetail : patchDetail
          const id = this.$route.params.id
          submitApi(this.form, id).then(() => {
            this.$router.push({ name: 'AttractionList' })
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
    getLatLngByQuery() {
      const google = gmapApi()
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ 'address': this.placeQuery }, (res, status) => {
        if (status === 'OK') {
          const { lat, lng } = res[0].geometry.location
          this.form.map = { lat: lat(), lng: lng() }
        } else {
          this.$message.error('無法辨識輸入的地址或關鍵字')
        }
      })
    },
    gotoList() {
      this.$confirm('確定返回列表嗎？資料將不會儲存').then(() => {
        this.$router.push({ name: 'AttractionList' })
      })
    }
  }
}
</script>

<style>

</style>
