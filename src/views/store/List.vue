<template>
  <div class="app-container">
    <el-card class="w-100 rouned-3 mb-3">
      <el-form inline :model="queryData">
        <div class="d-flex justify-content-between">
          <div class="w-75">
            <div class="d-flex justify-content-between">
              <el-form-item label="名稱">
                <el-input v-model="queryData.name" placeholder="請輸入店家名稱" />
              </el-form-item>
              <el-form-item label="手機號碼">
                <el-input v-model="queryData.mobile" placeholder="請輸入手機號碼" />
              </el-form-item>
            </div>
            <div class="d-flex justify-content-between">
              <el-form-item label="狀態">
                <el-select v-model="queryData.status" placeholder="請選擇店家狀態">
                  <el-option label="正常" :value="1" />
                  <el-option label="已停權" :value="2" />
                </el-select>
              </el-form-item>
              <el-form-item label="電話號碼">
                <el-input v-model="queryData.phone" placeholder="請輸入電話號碼" />
              </el-form-item>
            </div>
          </div>
          <el-form-item class="d-flex justify-content-end align-items-end flex-shrink-1">
            <el-button type="primary" icon="el-icon-search" @click="onQuery">搜尋</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <el-card class="w-100 rouned-3">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h5 class="my-0">會員列表</h5>
        <el-button type="primary" icon="el-icon-plus" @click="gotoCreatePage">新增店家</el-button>
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
        <el-table-column align="center" label="店家 ID" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="名稱" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="手機號碼" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.tel }}
          </template>
        </el-table-column>
        <el-table-column label="電話" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.tel }}
          </template>
        </el-table-column>
        <el-table-column label="email" align="center">
          <template slot-scope="scope">
            {{ scope.row.email }}
          </template>
        </el-table-column>
        <el-table-column label="地址" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.birthday }}
          </template>
        </el-table-column>
        <el-table-column label="使用狀態" width="90" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.status ? '正常' : '已停權'" placement="top">
              <el-switch v-model="scope.row.status" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="編輯" placement="top">
              <el-button type="text" size="large" @click="handleClick(scope.$index)">
                <i class="el-icon-edit" />
              </el-button>
            </el-tooltip>
            <!-- <el-tooltip class="item" effect="dark" content="刪除" placement="top">
              <el-button type="text" size="large">
                <i class="el-icon-delete" />
              </el-button>
            </el-tooltip> -->
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
          <el-button type="danger" plain class="ms-3" @click="showDisableConfirm">停權</el-button>
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
import { getList } from '@/api/member'

export default {
  name: 'StoreList',
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      queryData: {
        id: '',
        name: '',
        status: '',
        tel: '',
        email: ''
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
      this.$router.push({ name: 'StoreCreate' })
    },
    checkAllRow() {
      this.list.forEach(item => { item.isCheck = this.isCheckAll })
    },
    checkOneRow(status) {
      this.isCheckAll = status && this.list.every(({ isCheck }) => isCheck)
    },
    showDisableConfirm() {
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
