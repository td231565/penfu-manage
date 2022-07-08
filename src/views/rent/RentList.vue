<template>
  <div class="app-container">
    <el-card class="w-100 rouned-3 mb-3">
      <el-form inline :model="queryData">
        <div class="d-flex">
          <el-form-item label="出租 ID">
            <el-input v-model="queryData.orderID" placeholder="請輸入出租 id" />
          </el-form-item>
          <el-form-item label="手機">
            <el-input v-model="queryData.phoneNumber" placeholder="請輸入手機" />
          </el-form-item>
          <el-form-item label="租借狀態">
            <el-select v-model="queryData.status" placeholder="請選擇類別">
              <el-option label="全部" value="" />
              <el-option label="租借中" :value="1" />
              <el-option label="已歸還" :value="2" />
            </el-select>
          </el-form-item>
        </div>
        <div class="d-flex justify-content-end">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="fetchData(1, page.size)">搜尋</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <el-card class="w-100 rouned-3">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h5 class="my-0">租借列表</h5>
        <!-- <el-button type="primary" icon="el-icon-plus" @click="gotoCreatePage">添加商品</el-button> -->
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
        <el-table-column label="租車 ID" align="center">
          <template slot-scope="scope">
            {{ scope.row.orderID }}
          </template>
        </el-table-column>
        <el-table-column label="車輛 ID" align="center">
          <template slot-scope="scope">
            {{ scope.row.carID }}
          </template>
        </el-table-column>
        <el-table-column label="租借人手機" align="center">
          <template slot-scope="scope">
            {{ scope.row.phoneNumber }}
          </template>
        </el-table-column>
        <el-table-column label="租借人名稱" align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="租借狀況" align="center">
          <template slot-scope="scope">
            {{ Number(scope.row.status) === 1 ? '租借中' : '已歸還' }}
          </template>
        </el-table-column>
        <el-table-column label="出租時間" width="170" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ showDate(scope.row.rentTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="歸還" placement="top">
              <el-button type="text" size="large" :disabled="Number(scope.row.status) === 2" @click="returnBike(scope.row.orderID, Number(scope.row.status) === 1)">
                <i class="el-icon-refresh-left" />
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看合約" placement="top">
              <el-button type="text" size="large" @click="showContract(scope.row.contractImage)">
                <i class="el-icon-s-order" />
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="d-flex justify-content-end align-items-center mt-3">
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
    <!-- Contract Modal -->
    <el-dialog
      :visible.sync="isShowContract"
      width="70%"
      top="15px"
      :close-on-click-modal="false"
    >
      <div class="d-flex justify-content-center">
        <img :src="contractImageUrl" alt="">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getRentList, postReturnBike } from '@/api/rent'

export default {
  name: 'RentList',
  data() {
    return {
      list: [],
      listLoading: true,
      isShowContract: false,
      contractImageUrl: '',
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      queryData: {
        status: '',
        phoneNumber: '',
        orderID: ''
      }
    }
  },
  computed: {
    ...mapGetters(['rentPage', 'rentQuery'])
  },
  created() {
    this.page = JSON.parse(JSON.stringify(this.rentPage))
    this.queryData = JSON.parse(JSON.stringify(this.rentQuery))
    const { current, size } = this.page
    this.fetchData(current, size)
  },
  beforeDestroy() {
    this.SET_RENT_PAGE(this.page)
    this.SET_RENT_QUERY(this.queryData)
  },
  methods: {
    ...mapMutations('lists', ['SET_RENT_PAGE', 'SET_RENT_QUERY']),
    fetchData(page, numberPerPage) {
      this.listLoading = true
      getRentList(page, numberPerPage, this.queryData).then(data => {
        this.list = data.car
        this.page.current = page
        this.page.total = data.total
        this.listLoading = false
      }).catch(err => {
        console.log(err)
      })
    },
    returnBike(orderId, isReturned) {
      if (isReturned) { return }
      this.$confirm('確定歸還此車輛嗎？', 'Warning', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        postReturnBike(orderId).then(() => {
          const { current, size } = this.page
          this.fetchData(current, size)
          this.listLoading = false
          this.$message({ type: 'success', message: '歸還成功' })
        }).catch(() => {
          this.listLoading = false
        })
      })
    },
    showDate(date) {
      return date.replace('T', ' ').slice(0, -3)
    },
    showContract(url) {
      this.contractImageUrl = url
      this.isShowContract = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
