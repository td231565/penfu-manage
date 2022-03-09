<template>
  <div class="app-container">
    <el-card class="w-100 rouned-3 mb-3">
      <el-form inline :model="queryData">
        <div class="d-flex justify-content-between">
          <el-form-item label="商品 ID">
            <el-input v-model="queryData.id" placeholder="Approved by" />
          </el-form-item>
          <el-form-item label="名稱">
            <el-input v-model="queryData.name" placeholder="Approved by" />
          </el-form-item>
          <el-form-item label="類別">
            <el-select v-model="queryData.category" placeholder="Activity zone">
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
        <el-table-column label="販售數量" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="價格" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="更新時間" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上架" width="65">
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
    </el-card>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
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
      this.$router.push({ name: 'ProductCreate' })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
