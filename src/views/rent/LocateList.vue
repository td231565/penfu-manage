<template>
  <div v-loading.fullscreen.lock="isLoading" class="app-container">
    <el-card class="w-100 rouned-3">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h5 class="my-0">地點列表</h5>
        <el-button type="primary" icon="el-icon-plus" @click="showModal()">新增地點</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <!-- <el-table-column align="center" width="40">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isCheck" />
          </template>
        </el-table-column> -->
        <el-table-column label="地點名稱" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="地址" align="center">
          <template slot-scope="scope">
            {{ scope.row.address }}
          </template>
        </el-table-column>
        <el-table-column label="座標" align="center">
          <template slot-scope="scope">
            <p>經度：{{ scope.row.lng }}</p>
            <p>緯度：{{ scope.row.lat }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="75" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="編輯" placement="top">
              <el-button type="text" size="large" @click="showModal(scope.row.id)">
                <i class="el-icon-edit" />
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="刪除" placement="top">
              <el-button type="text" size="large" @click="showRemoveConfirm(scope.row.id)">
                <i class="el-icon-delete" />
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="d-flex justify-content-end align-items-center mt-3">
        <div class="d-flex align-items-center">
          <el-checkbox
            v-model="isCheckAll"
            :indeterminate="isIndeterminate"
            @change="checkAllRow"
          >全選</el-checkbox>
          <el-button type="danger" plain class="ms-3" @click="showRemoveConfirm(checkedIdList)">刪除</el-button>
        </div>
      </div> -->
    </el-card>
    <!-- Modal -->
    <el-dialog
      title="新增地點"
      :visible.sync="isShowModal"
      width="60%"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="locateInfo" :rules="formRules" label-width="100px">
        <el-form-item label="地點名稱" prop="title">
          <el-input v-model="locateInfo.title" placeholder="請輸入名稱" />
        </el-form-item>
        <el-form-item label="地點地址" prop="address">
          <el-input v-model="locateInfo.address" placeholder="請輸入地址" @blur="getLatLngByQuery" />
        </el-form-item>
        <el-form-item label="">
          <el-col :span="2" class="text-center">
            <span>Lat</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="lat">
              <el-input v-model="locateInfo.lat" placeholder="請輸入緯度" />
            </el-form-item>
          </el-col>
          <el-col :span="2" class="text-center">
            <span>Lng</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="lng">
              <el-input v-model="locateInfo.lng" placeholder="請輸入經度" />
            </el-form-item>
          </el-col>
          <el-col :span="24" class="mt-3">
            <GmapMap
              :center="mapCenter"
              :zoom="14"
              map-type-id="terrain"
              style="width: 500px; height: 300px"
            >
              <GmapMarker
                :position="mapCenter"
                :clickable="true"
                :draggable="true"
                @dragend="setLatLng"
              />
            </GmapMap>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideModal">取消</el-button>
        <el-button type="primary" @click="confirmModal">確認</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getLocateList, postCreateNewLocate, patchLocate, deleteLocate } from '@/api/rent'
import { gmapApi } from 'vue2-google-maps'

export default {
  name: 'LocateList',
  data() {
    return {
      list: [],
      listLoading: true,
      isLoading: false,
      isCheckAll: false,
      isShowModal: false,
      locateInfo: {
        address: '',
        lat: 22.445759,
        lng: 120.473509
      },
      formRules: {
        title: [
          { required: true, message: '請輸入名稱', trigger: 'blur' }
        ],
        lat: [
          { required: true, message: '請輸入地址', trigger: 'blur' }
        ],
        lng: [
          { required: true, message: '請輸入地址', trigger: 'blur' }
        ]
      },
      google: gmapApi
    }
  },
  computed: {
    isIndeterminate() {
      return this.list.some(({ isCheck }) => isCheck) && !this.isCheckAll
    },
    checkedIdList() {
      return this.list.filter(({ isCheck }) => isCheck).map(({ id }) => id)
    },
    mapCenter: {
      get() {
        const { lat, lng } = this.locateInfo
        return { lat: Number(lat), lng: Number(lng) }
      },
      set(val) {
        const { lat, lng } = val
        this.locateInfo.lat = lat
        this.locateInfo.lng = lng
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getLocateList().then(data => {
        this.list = data.locate.map(item => {
          item.isCheck = false
          return item
        })
        this.listLoading = false
      }).catch(err => {
        console.log(err)
        this.listLoading = false
      })
    },
    updateLocate() {
      this.isLoading = true
      const isCreate = !this.locateInfo.id
      const { lat, lng } = this.locateInfo
      this.locateInfo.lat = lat.toString()
      this.locateInfo.lng = lng.toString()
      const updateApi = isCreate ? postCreateNewLocate : patchLocate
      updateApi(this.locateInfo).then(data => {
        this.isShowModal = false
        this.locateInfo = {
          address: '',
          lat: 22.445759,
          lng: 120.473509
        }
        this.isLoading = false
        const action = isCreate ? '新增' : '編輯'
        this.$message({ type: 'success', message: `${action}地點成功` })
        this.fetchData()
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    getLatLngByQuery(str) {
      if (!str) { return }
      const google = gmapApi()
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ 'address': str }, (res, status) => {
        if (status === 'OK') {
          const { lat, lng } = res[0].geometry.location
          this.locateInfo.lat = lat()
          this.locateInfo.lng = lng()
        } else {
          this.$message.error('無法辨識輸入的地址或關鍵字')
        }
      })
    },
    setLatLng(e) {
      const { lat, lng } = e.latLng
      this.locateInfo.lat = lat()
      this.locateInfo.lng = lng()
    },
    removeLocate(id) {
      this.listLoading = true
      deleteLocate(id).then(data => {
        this.$message({ type: 'success', message: '刪除地點成功' })
        this.fetchData()
      }).catch(err => {
        console.log(err)
        this.listLoading = false
      })
    },
    checkAllRow() {
      this.list.forEach(item => { item.isCheck = this.isCheckAll })
    },
    checkOneRow(status) {
      this.isCheckAll = status && this.list.every(({ isCheck }) => isCheck)
    },
    showRemoveConfirm(id) {
      this.$confirm('確定要刪除選擇的地點嗎？', 'Warning', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.removeLocate(id)
      })
    },
    confirmModal() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.updateLocate()
        } else {
          this.$message.error('請確認必填欄位輸入完整')
          return false
        }
      })
    },
    showModal(id = '') {
      if (id) {
        this.locateInfo = this.list.find(item => item.id === id)
      }
      this.isShowModal = true
    },
    hideModal() {
      this.locateInfo = {
        address: '',
        lat: 22.445759,
        lng: 120.473509
      }
      this.isShowModal = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
