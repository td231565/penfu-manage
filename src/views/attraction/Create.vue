<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="景點名稱">
        <el-input v-model="form.title" placeholder="請輸入商品名稱" />
      </el-form-item>
      <el-form-item label="景點副標">
        <el-input v-model="form.subTitle" placeholder="請輸入商品副標" />
      </el-form-item>
      <el-form-item label="內容標題">
        <el-input v-model="form.subTitle" placeholder="請輸入商品副標" />
      </el-form-item>
      <el-form-item label="景點清單圖片">
        <ImageUpload :file-list="coverImage" />
      </el-form-item>
      <el-form-item label="景點內頁圖片">
        <ImageUpload :file-list="contentImages" is-multiple />
      </el-form-item>
      <el-form-item label="內容描述">
        <Editor :content="form.desc" />
      </el-form-item>
      <el-form-item label="聯絡電話">
        <Editor :content="form.desc" />
      </el-form-item>
      <el-form-item label="活動地址">
        <Editor :content="form.desc" />
      </el-form-item>
      <el-form-item label="相關資訊">
        <Editor :content="form.desc" />
      </el-form-item>
      <el-form-item label="景點地圖">
        <div>
          <el-input v-model="lat" placeholder="請輸入緯度" />
          <el-input v-model="lng" placeholder="請輸入經度" />
        </div>
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
      lat: 22.445759,
      lng: 120.473509,
      coverImage: [],
      contentImages: [],
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
        imageList: []
      }
    }
  },
  computed: {
    center() {
      return { lat: parseFloat(this.lat), lng: parseFloat(this.lng) }
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
