<template>
  <div class="app-container">
    <el-card class="w-100 rouned-3 mb-3">
      <el-form inline :model="queryData">
        <div class="d-flex">
          <el-form-item label="車輛 ID">
            <el-input v-model="queryData.carID" placeholder="請輸入車輛 id" />
          </el-form-item>
          <el-form-item label="名稱">
            <el-input v-model="queryData.carName" placeholder="請輸入車輛名稱" />
          </el-form-item>
          <el-form-item label="租借狀態">
            <el-select v-model="queryData.status" placeholder="請選擇類別">
              <el-option label="全部" value="" />
              <el-option label="空閒中" :value="1" />
              <el-option label="租借中" :value="2" />
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
        <el-table-column label="車輛 ID" align="center">
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
        <el-table-column align="center" prop="updated_at" label="更新時間" width="170">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ showDate(scope.row.updateTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="75" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="歸還" placement="top">
              <el-button type="text" size="large" :disabled="Number(scope.row.status) === 1" @click="returnBike(scope.row.id, Number(scope.row.status) === 1)">
                <i class="el-icon-refresh-left" />
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
import { getRentList, postReturnBike } from '@/api/rent'

export default {
  name: 'RentList',
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
        carName: '',
        carID: ''
      }
    }
  },
  created() {
    this.fetchData(1, 10)
  },
  methods: {
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
    returnBike(id, isReturned) {
      if (isReturned) { return }
      this.$confirm('確定歸還此車輛嗎？', 'Warning', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        postReturnBike(id).then(() => {
          this.$message({ type: 'success', message: '歸還成功' })
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
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
