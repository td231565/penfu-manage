<template>
  <div class="app-container">
    <el-card class="w-100 rouned-3 mb-3">
      <el-form inline :model="queryData">
        <div class="d-flex">
          <!-- <el-form-item label="商品 ID">
            <el-input v-model="queryData.id" placeholder="請輸入商品 id" />
          </el-form-item> -->
          <el-form-item label="名稱">
            <el-input v-model="queryData.search" placeholder="請輸入商品名稱" />
          </el-form-item>
          <el-form-item label="類別">
            <el-select v-model="queryData.category" placeholder="請選擇類別">
              <el-option label="票券" value="票券" />
              <el-option label="伴手禮" value="伴手禮" />
            </el-select>
          </el-form-item>
        </div>
        <div class="d-flex justify-content-between">
          <el-form-item label="日期">
            <el-date-picker v-model="queryData.startDate" type="date" placeholder="起始日期" />
            <i class="el-icon-minus mx-2" />
            <el-date-picker v-model="queryData.endDate" type="date" placeholder="結束日期" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="fetchData(1, page.size)">搜尋</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <el-card class="w-100 rouned-3">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h5 class="my-0">商品列表</h5>
        <el-button type="primary" icon="el-icon-plus" @click="gotoCreatePage">添加商品</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" width="40">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isCheck" />
          </template>
        </el-table-column>
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
        <el-table-column label="商品價格" align="center">
          <template slot-scope="scope">
            {{ scope.row.price }} 元
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updated_at" label="更新時間" width="170">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ showDate(scope.row.update_time) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="上架" width="65" align="center">
          <template slot-scope="scope">
            <el-switch :value="checkStatus(scope.row.status)" @change="switchStatus($event, scope.row.id)" />
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="75" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="編輯" placement="top">
              <el-button type="text" size="large" @click="gotoEditPage(scope.row.id)">
                <i class="el-icon-edit" />
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="刪除" placement="top">
              <el-button type="text" size="large" @click="showRemoveConfirm([scope.row.id])">
                <i class="el-icon-delete" />
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="d-flex justify-content-between align-items-center mt-3">
        <div class="d-flex align-items-center">
          <el-checkbox
            v-model="isCheckAll"
            :indeterminate="isIndeterminate"
            @change="checkAllRow"
          >全選</el-checkbox>
          <el-button type="danger" plain class="ms-3" @click="showRemoveConfirm(checkedIdList)">刪除</el-button>
        </div>
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
import { mapGetters, mapMutations } from 'vuex'
import { getList, deleteItems, patchDetail } from '@/api/product'

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
        search: '',
        category: '',
        startDate: '',
        endDate: ''
      },
      isCheckAll: false
    }
  },
  computed: {
    ...mapGetters(['productPage', 'productQuery']),
    isIndeterminate() {
      return this.list.some(({ isCheck }) => isCheck) && !this.isCheckAll
    },
    checkedIdList() {
      return this.list.filter(({ isCheck }) => isCheck).map(({ id }) => id)
    }
  },
  created() {
    this.page = JSON.parse(JSON.stringify(this.productPage))
    this.queryData = JSON.parse(JSON.stringify(this.productQuery))
    const { current, size } = this.page
    this.fetchData(current, size)
  },
  beforeDestroy() {
    this.SET_PRODUCT_PAGE(this.page)
    this.SET_PRODUCT_QUERY(this.queryData)
  },
  methods: {
    ...mapMutations('lists', ['SET_PRODUCT_PAGE', 'SET_PRODUCT_QUERY']),
    fetchData(page, numberPerPage) {
      this.listLoading = true
      getList(page, numberPerPage, this.queryData).then(data => {
        this.list = data.attraction.map(item => {
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
    gotoCreatePage() {
      this.$router.push({ name: 'ProductCreate' })
    },
    gotoEditPage(id) {
      this.$router.push({ name: 'ProductEdit', params: { id }})
    },
    checkAllRow() {
      this.list.forEach(item => { item.isCheck = this.isCheckAll })
    },
    checkOneRow(status) {
      this.isCheckAll = status && this.list.every(({ isCheck }) => isCheck)
    },
    showRemoveConfirm(ids) {
      this.$confirm('確定要刪除選擇的商品嗎？', 'Warning', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        deleteItems(ids).then(() => {
          this.$message({ type: 'success', message: '刪除成功' })
          const { current, size, total } = this.page
          if (current === 1) {
            this.fetchData(1, size)
          } else if ((total - ids.length) / size === current - 1 && current !== 1) {
            // 如果分頁內只有一筆，是目前的最後一頁且不是第一頁，就拿上一頁的資料
            this.fetchData(current - 1, size)
          } else {
            this.fetchData(current, size)
          }
          this.listLoading = false
        })
      }).catch(() => {
        this.listLoading = false
      })
    },
    showDate(date) {
      return date.replace('T', ' ').slice(0, -3)
    },
    switchStatus(status, id) {
      patchDetail({ status: status ? 1 : 0 }, id).then(data => {
        this.list.find(item => item.id === id).status = status ? 1 : 0
      }).catch(() => {})
    },
    checkStatus(statusType) {
      return statusType === 1
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
