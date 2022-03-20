<template>
  <div class="app-container">
    <el-card class="w-100 rouned-3 mb-3">
      <el-form inline :model="queryData">
        <div class="d-flex justify-content-between">
          <el-form-item label="商品 ID">
            <el-input v-model="queryData.id" placeholder="請輸入商品 id" />
          </el-form-item>
          <el-form-item label="名稱">
            <el-input v-model="queryData.name" placeholder="請輸入商品名稱" />
          </el-form-item>
          <el-form-item label="類別">
            <el-select v-model="queryData.category" placeholder="請選擇類別">
              <el-option label="票券" :value="1" />
              <el-option label="伴手禮" :value="2" />
            </el-select>
          </el-form-item>
        </div>
        <div class="d-flex justify-content-between">
          <el-form-item label="日期">
            <el-date-picker v-model="queryData.dateRange[0]" type="date" placeholder="起始日期" />
            <i class="el-icon-minus mx-2" />
            <el-date-picker v-model="queryData.dateRange[1]" type="date" placeholder="結束日期" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onQuery">搜尋</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <el-card class="w-100 rouned-3">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <p>日期區間：2022-01-01 ~ 2022-01-31</p>
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
            <el-checkbox v-model="scope.row.isCheck" @change="checkOneRow" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品 ID" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="類別" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="名稱">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="銷售數量" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="銷售總計" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.$index)">
              查詢明細
            </el-button>
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
          <el-button type="danger" plain class="ms-3" @click="showRemoveConfirm">刪除</el-button>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="50"
          :current-page.sync="currentPage"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  name: 'SellList',
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      queryData: {
        id: '',
        name: '',
        category: '',
        dateRange: []
      },
      isCheckAll: false
    }
  },
  computed: {
    isIndeterminate() {
      return this.list.some(({ isCheck }) => isCheck) && !this.isCheckAll
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(res => {
        this.list = res.data.items.map(item => {
          item.isCheck = false
          return item
        })
        this.listLoading = false
      })
    },
    onQuery() {

    },
    gotoCreatePage() {
      this.$router.push({ name: 'ProductCreate' })
    },
    checkAllRow() {
      this.list.forEach(item => { item.isCheck = this.isCheckAll })
    },
    checkOneRow(status) {
      this.isCheckAll = status && this.list.every(({ isCheck }) => isCheck)
    },
    showRemoveConfirm() {
      this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: 'Delete completed'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
