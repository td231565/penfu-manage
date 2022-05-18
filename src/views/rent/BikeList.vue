<template>
  <div v-loading.fullscreen.lock="isLoading" class="app-container">
    <el-card class="w-100 rouned-3">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h5 class="my-0">車輛列表</h5>
        <el-button type="primary" icon="el-icon-plus" @click="showModal()">新增車輛</el-button>
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
        <el-table-column align="center" label="車輛 ID" width="80">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="車輛名稱" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="當前位置" align="center">
          <template slot-scope="scope">
            {{ scope.row.lastLocate }}
          </template>
        </el-table-column>
        <el-table-column label="租借狀況" align="center">
          <template slot-scope="scope">
            {{ Number(scope.row.status) === 1 ? '空閒中' : '租借中' }}
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="updated_at" label="更新時間" width="170">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ showDate(scope.row.update_time) }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="120" align="center">
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
            <el-tooltip class="item" effect="dark" content="顯示 QRCode" placement="top">
              <el-button type="text" size="large" @click="showQrcode(scope.row.id)">
                <span class="material-symbols-outlined" style="font-size: 14px;">
                  qr_code
                </span>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="d-flex justify-content-end align-items-center mt-3">
        <!-- <div class="d-flex align-items-center">
          <el-checkbox
            v-model="isCheckAll"
            :indeterminate="isIndeterminate"
            @change="checkAllRow"
          >全選</el-checkbox>
          <el-button type="danger" plain class="ms-3" @click="showRemoveConfirm(checkedIdList)">刪除</el-button>
        </div> -->
        <el-pagination
          :current-page.sync="page.current"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @current-change="fetchData($event, page.size)"
          @size-change="fetchData(1, $event)"
        />
      </div>
    </el-card>
    <!-- Modal -->
    <el-dialog
      title="新增車輛"
      :visible.sync="isShowModal"
      width="60%"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="bikeInfo" :rules="formRules" label-width="100px">
        <el-form-item label="車輛名稱" prop="title">
          <el-input v-model="bikeInfo.title" placeholder="請輸入車輛名稱" />
        </el-form-item>
        <el-form-item label="車輛地點" prop="lastLocate">
          <el-select v-model="bikeInfo.lastLocate" placeholder="請選擇">
            <el-option v-for="item in locates" :key="item.id" :label="item.title" :value="item.title" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideModal">取消</el-button>
        <el-button type="primary" @click="confirmModal">確認</el-button>
      </span>
    </el-dialog>
    <!-- QRCode Modal -->
    <el-dialog
      :title="bikeInfo.title"
      :visible.sync="isShowQrcode"
      width="50%"
      :close-on-click-modal="false"
    >
      <div class="d-flex justify-content-center">
        <VueQrcode :value="bikeInfo.id" :options="qrOptions" />
      </div>
      <p class="text-center">請右鍵點擊下載</p>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import { getBikeList, getLocateList, postCreateNewBike, patchBike, deleteBike } from '@/api/rent'

export default {
  name: 'BikeList',
  components: { VueQrcode },
  data() {
    return {
      list: [],
      locates: [],
      listLoading: true,
      isLoading: false,
      isCheckAll: false,
      isShowModal: false,
      bikeInfo: {},
      isShowQrcode: false,
      qrOptions: { width: 160, margin: 0, scale: 4 },
      formRules: {
        title: [
          { required: true, message: '請輸入名稱', trigger: 'blur' }
        ],
        lastLocate: [
          { required: true, message: '請輸入地址', trigger: 'blur' }
        ]
      },
      page: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters(['bikePage']),
    isIndeterminate() {
      return this.list.some(({ isCheck }) => isCheck) && !this.isCheckAll
    },
    checkedIdList() {
      return this.list.filter(({ isCheck }) => isCheck).map(({ id }) => id)
    }
  },
  created() {
    this.page = JSON.parse(JSON.stringify(this.bikePage))
    const { current, size } = this.page
    this.fetchData(current, size)
    this.getAllLocates()
  },
  beforeDestroy() {
    this.SET_BIKE_PAGE(this.page)
  },
  methods: {
    ...mapMutations('lists', ['SET_BIKE_PAGE']),
    fetchData(page, size) {
      this.listLoading = true
      getBikeList(page, size).then(data => {
        this.list = data.car.map(item => {
          item.isCheck = false
          return item
        })
        this.page.current = page
        this.page.total = data.total
        this.listLoading = false
      }).catch(err => {
        console.log(err)
        this.listLoading = false
      })
    },
    getAllLocates() {
      this.isLoading = true
      getLocateList().then(data => {
        this.locates = data.locate
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    updateBike(type) {
      this.isLoading = true
      const updateApi = type === 'create' ? postCreateNewBike : patchBike
      updateApi(this.bikeInfo).then(data => {
        this.isShowModal = false
        this.isLoading = false
        const action = type === 'create' ? '新增' : '編輯'
        this.$message({ type: 'success', message: `${action}成功` })
        const { current, size } = this.page
        this.fetchData(current, size)
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    removeBike(id) {
      this.listLoading = true
      deleteBike(id).then(data => {
        this.$message({ type: 'success', message: '刪除車輛成功' })
        const { current, size } = this.page
        this.fetchData(current, size)
      }).catch(err => {
        console.log(err)
        if (err.response.data.status === 99) {
          this.$message.error('車子正被租借中，不可刪除')
        }
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
      this.$confirm('確定要刪除選擇的車輛嗎？', 'Warning', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.removeBike(id)
      })
    },
    confirmModal() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.updateBike(this.bikeInfo.id ? 'update' : 'create')
        } else {
          this.$message.error('請確認必填欄位輸入完整')
          return false
        }
      })
    },
    showQrcode(id) {
      this.bikeInfo = this.list.find(item => item.id === id)
      this.isShowQrcode = true
    },
    showModal(id = '') {
      if (id) {
        this.bikeInfo = this.list.find(item => item.id === id)
      }
      this.isShowModal = true
    },
    hideModal() {
      this.bikeInfo = {}
      this.isShowModal = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
