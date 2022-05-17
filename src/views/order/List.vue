<template>
  <div class="app-container">
    <el-card class="w-100 rouned-3 mb-3">
      <el-form inline :model="queryData">
        <div class="d-flex justify-content-between">
          <el-form-item label="商品 ID">
            <el-input v-model="queryData.productID" placeholder="請輸入商品 id" />
          </el-form-item>
          <el-form-item label="名稱">
            <el-input v-model="queryData.title" placeholder="請輸入商品名稱" />
          </el-form-item>
          <el-form-item label="類別">
            <el-select v-model="queryData.category" placeholder="請選擇類別">
              <el-option label="全部" value="" />
              <el-option label="票券" value="票券" />
              <el-option label="伴手禮" value="伴手禮" />
            </el-select>
          </el-form-item>
        </div>
        <div class="d-flex justify-content-between">
          <el-form-item label="日期">
            <el-date-picker v-model="queryData.startDate" type="date" value-format="yyyy-MM-dd" placeholder="起始日期" />
            <i class="el-icon-minus mx-2" />
            <el-date-picker v-model="queryData.endDate" type="date" value-format="yyyy-MM-dd" placeholder="結束日期" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="fetchData(1, page.size)">搜尋</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <el-card class="w-100 rouned-3">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h5 class="my-0">銷售列表</h5>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="商品 ID" width="80">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="類別" align="center">
          <template slot-scope="scope">
            {{ scope.row.category }}
          </template>
        </el-table-column>
        <el-table-column label="名稱" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="銷售數量" align="center">
          <template slot-scope="scope">
            {{ scope.row.saleNum }}
          </template>
        </el-table-column>
        <el-table-column label="銷售總計" align="center">
          <template slot-scope="scope">
            {{ scope.row.totalRevenue }} 元
          </template>
        </el-table-column>
        <el-table-column label="操作" width="75" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查詢明細" placement="top">
              <el-button type="text" size="large" @click="showDialog(scope.row.id, scope.row.title)">
                <i class="el-icon-s-order fs-4" />
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
    <!-- Dialog -->
    <el-dialog
      :title="`銷售明細 - ID ${selectedProduct.id} ${selectedProduct.title}`"
      :visible.sync="isShowDialog"
      width="70%"
    >
      <div v-if="queryData.startDate" class="mb-3">
        <span>日期</span>
        <span class="ms-2 fw-bold">{{ queryData.startDate }} ~ {{ queryData.endDate }}</span>
      </div>
      <el-table
        v-loading="listLoading"
        :data="selectedProduct.list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="價錢" align="center">
          <template slot-scope="scope">
            {{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column label="數量" align="center">
          <template slot-scope="scope">
            {{ scope.row.totalNumber }}
          </template>
        </el-table-column>
        <el-table-column label="總銷售額" align="center">
          <template slot-scope="scope">
            {{ scope.row.totalPrice }}
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <div class="d-flex justify-content-center">
          <el-button type="primary" @click="isShowDialog = false">確認</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList, getDetail } from '@/api/order'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ProductList',
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
        productID: '',
        title: '',
        category: '',
        startDate: '',
        endDate: ''
      },
      isShowDialog: false,
      selectedProduct: {
        id: 0,
        title: '',
        list: []
      }
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
      getList(page, numberPerPage, this.queryData).then(data => {
        this.list = data.order.map(item => {
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
    showDialog(id, title) {
      if (this.selectedProduct.id === id) {
        this.isShowDialog = true
      } else {
        this.selectedProduct.id = id
        this.selectedProduct.title = title
        this.getProductSaleData(id)
      }
    },
    getProductSaleData(id) {
      this.listLoading = true
      this.selectedProduct.id = id
      const { startDate, endDate } = this.queryData
      getDetail({ productID: id, startDate, endDate }).then(data => {
        this.selectedProduct.list = data.order
        this.isShowDialog = true
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    showDate(date) {
      return date.replace('T', ' ').slice(0, -3)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
