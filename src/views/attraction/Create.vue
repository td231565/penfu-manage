<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="景點名稱" prop="title">
        <el-input v-model="form.title" placeholder="請輸入景點名稱" />
      </el-form-item>
      <el-form-item label="景點副標" prop="subTitle">
        <el-input v-model="form.subTitle" placeholder="請輸入景點副標" />
      </el-form-item>
      <el-form-item label="內容標題" prop="innerTitle">
        <el-input v-model="form.innerTitle" placeholder="請輸入內容標題" />
      </el-form-item>
      <el-form-item label="景點清單圖片" prop="coverImage">
        <ImageUpload :file-list="form.coverImage" />
      </el-form-item>
      <el-form-item label="景點內頁圖片" prop="contentImages">
        <ImageUpload :file-list="form.contentImages" is-multiple />
      </el-form-item>
      <el-form-item label="內容描述" prop="desc">
        <Editor :content="form.desc" @on-change="setInputValue('desc', $event)" />
      </el-form-item>
      <el-form-item label="聯絡電話" prop="tel">
        <Editor :content="form.tel" @on-change="setInputValue('tel', $event)" />
      </el-form-item>
      <el-form-item label="活動地址" prop="address">
        <Editor :content="form.address" @on-change="setInputValue('address', $event)" />
      </el-form-item>
      <el-form-item label="相關資訊" prop="info">
        <Editor :content="form.info" @on-change="setInputValue('info', $event)" />
      </el-form-item>
      <el-form-item label="景點地圖">
        <el-col :span="2" class="text-center">
          <span>Lat</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="lat">
            <el-input v-model="form.location.lat" placeholder="請輸入緯度" />
          </el-form-item>
        </el-col>
        <el-col :span="2" class="text-center">
          <span>Lng</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="lat">
            <el-input v-model="form.location.lng" placeholder="請輸入經度" />
          </el-form-item>
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
  name: 'AttractionCreate',
  components: { Editor, ImageUpload },
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
