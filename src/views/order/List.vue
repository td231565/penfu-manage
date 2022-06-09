<template>
  <div class="app-container">
    <el-card class="w-100 rouned-3 mb-3">
      <el-form inline :model="queryData">
        <div class="d-flex">
          <el-form-item label="訂單 ID">
            <el-input v-model="queryData.orderID" placeholder="請輸入訂單 id" />
          </el-form-item>
          <el-form-item label="名稱">
            <el-input v-model="queryData.title" placeholder="請輸入商品名稱" />
          </el-form-item>
        </div>
        <div class="d-flex justify-content-between">
          <div>
            <el-form-item label="訂購人電話">
              <el-input v-model="queryData.phoneNumber" placeholder="請輸入訂購人電話" />
            </el-form-item>
            <el-form-item label="狀態">
              <el-select v-model="queryData.status" placeholder="請選擇狀態">
                <el-option label="全部" value="" />
                <el-option v-for="opt in orderStatusList" :key="opt.key" :label="opt.text" :value="opt.key" />
              </el-select>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="fetchData(1, page.size)">搜尋</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <el-card class="w-100 rouned-3">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h5 class="my-0">訂單列表</h5>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="訂單 ID" width="80">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="商品名稱" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="數量" align="center" width="80">
          <template slot-scope="scope">
            {{ scope.row.number }}
          </template>
        </el-table-column>
        <el-table-column label="總價" align="center" width="80">
          <template slot-scope="scope">
            {{ scope.row.totalPrice }} 元
          </template>
        </el-table-column>
        <el-table-column label="訂購人姓名" align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="訂購人電話" align="center">
          <template slot-scope="scope">
            {{ scope.row.phoneNumber }}
          </template>
        </el-table-column>
        <el-table-column label="狀態" align="center" width="160">
          <template slot-scope="scope">
            {{ showStatusText(scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="確認付款" placement="top">
              <el-button type="text" size="large" :disabled="Number(scope.row.status) !== 2" @click="changeOrderPaidStatus(scope.row.id, scope.row.status === 2)">
                <i class="el-icon-s-claim fs-4" />
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
  </div>
</template>

<script>
import { getOrderList, updateOrderStatus } from '@/api/order'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'OrderList',
  data() {
    return {
      list: [],
      listLoading: true,
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      queryData: {
        status: '',
        title: '',
        phoneNumber: '',
        orderID: ''
      },
      orderStatusList: [
        { key: 1, text: '付款成功' },
        { key: 2, text: '未付款' },
        { key: 3, text: '核銷成功' },
        { key: 4, text: '取消訂單' },
        { key: 99, text: '訂單錯誤' }
      ]
    }
  },
  computed: {
    ...mapGetters(['orderPage', 'orderQuery'])
  },
  created() {
    this.page = JSON.parse(JSON.stringify(this.orderPage))
    this.queryData = JSON.parse(JSON.stringify(this.orderQuery))
    const { current, size } = this.page
    this.fetchData(current, size)
  },
  beforeDestroy() {
    this.SET_ORDER_PAGE(this.page)
    this.SET_ORDER_QUERY(this.queryData)
  },
  methods: {
    ...mapMutations('lists', ['SET_ORDER_PAGE', 'SET_ORDER_QUERY']),
    fetchData(page, numberPerPage) {
      this.listLoading = true
      getOrderList(page, numberPerPage, this.queryData).then(data => {
        this.list = data.result.map(item => {
          item.isCheck = false
          return item
        })
        this.page.current = page
        this.page.total = data.total
        this.listLoading = false
      }).catch(err => {
        console.log(err)
      })
    },
    changeOrderPaidStatus(orderId, isUnPaid) {
      if (!isUnPaid) { return }
      const { title, uuid } = this.list.find(item => item.id === orderId)
      this.$confirm(`確定將訂單編號 ${orderId}，訂單 ${title} 變更為已付款嗎？`).then(() => {
        updateOrderStatus(uuid).then(() => {
          this.$message({ type: 'success', message: '訂單付款成功' })
          const { current, size } = this.page
          this.fetchData(current, size)
        }).catch(err => {
          console.log(err)
        })
      })
    },
    showDate(date) {
      return date.replace('T', ' ').slice(0, -3)
    },
    showStatusText(status) {
      const s = Number(status)
      return this.orderStatusList.find(({ key }) => key === s).text
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
