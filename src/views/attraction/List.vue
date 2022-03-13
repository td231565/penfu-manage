<template>
  <div class="app-container">
    <el-card class="w-100 rouned-3 mb-3">
      <el-form inline :model="queryData">
        <el-form-item label="景點名稱">
          <el-input v-model="queryData.id" placeholder="請輸入景點名稱" />
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="queryData.dateRange[0]" type="date" placeholder="起始日期" />
          <i class="el-icon-minus mx-2" />
          <el-date-picker v-model="queryData.dateRange[1]" type="date" placeholder="結束日期" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onQuery">搜尋</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="w-100 rouned-3">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h5 class="my-0">景點列表</h5>
        <el-button type="primary" icon="el-icon-plus" @click="gotoCreatePage">添加景點</el-button>
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
        <el-table-column align="center" label="景點 ID" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="名稱">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="副標" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="價格" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="上架時間" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updated_at" label="更新時間" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上架" width="65" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="編輯" placement="top">
              <el-button type="text" size="large" @click="handleClick(scope.$index)">
                <i class="el-icon-edit" />
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="刪除" placement="top">
              <el-button type="text" size="large" @click="showRemoveConfirm">
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
          <el-button size="mini" class="ms-3" @click="showRemoveConfirm">刪除</el-button>
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
  name: 'AttractionList',
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
      this.$router.push({ name: 'AttractionCreate' })
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
