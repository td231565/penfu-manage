<template>
  <div class="app-container">
    <el-card class="w-100 rouned-3 mb-3">
      <el-form inline :model="queryData">
        <el-form-item label="商品 ID">
          <el-input v-model="queryData.id" placeholder="Approved by" />
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
              <el-button type="text" size="large">
                <i class="el-icon-delete" />
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="d-flex justify-content-center">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="50"
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
      list: null,
      listLoading: true,
      queryData: {
        id: '',
        name: '',
        category: '',
        dateRange: []
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    onQuery() {

    },
    gotoCreatePage() {
      this.$router.push({ name: 'AttractionCreate' })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
