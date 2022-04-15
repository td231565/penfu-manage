<template>
  <div class="app-container">
    <el-card class="w-100 rouned-3 mb-3">
      <el-form inline :model="queryData">
        <div class="d-flex justify-content-between">
          <div class="w-75">
            <div class="d-flex justify-content-between">
              <el-form-item label="名稱">
                <el-input v-model="queryData.name" placeholder="請輸入會員名稱" />
              </el-form-item>
              <el-form-item label="手機號碼">
                <el-input v-model="queryData.tel" placeholder="請輸入手機號碼" />
              </el-form-item>
            </div>
            <div class="d-flex justify-content-between">
              <el-form-item label="狀態">
                <el-select v-model="queryData.status" placeholder="請選擇會員狀態">
                  <el-option label="正常" :value="1" />
                  <el-option label="已停權" :value="2" />
                </el-select>
              </el-form-item>
              <el-form-item label="email">
                <el-input v-model="queryData.email" placeholder="請輸入 email" />
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
        <el-table-column align="center" width="40">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isCheck" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="會員 ID" width="95">
          <template slot-scope="scope">
            {{ scope.row.id }}
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
        <el-table-column label="email" align="center">
          <template slot-scope="scope">
            {{ scope.row.email }}
          </template>
        </el-table-column>
        <el-table-column label="生日" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.birthday }}
          </template>
        </el-table-column>
        <el-table-column label="性別" width="65" align="center">
          <template slot-scope="scope">
            {{ scope.row.sex }}
          </template>
        </el-table-column>
        <el-table-column label="使用狀態" width="90" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.status ? '正常' : '已停權'" placement="top">
              <el-switch v-model="scope.row.status" />
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
import { getList, deleteItems, patchDetail } from '@/api/attraction'

export default {
  name: 'MemberList',
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
        startDate: '',
        endDate: ''
      },
      isCheckAll: false
    }
  },
  computed: {
    isIndeterminate() {
      return this.list.some(({ isCheck }) => isCheck) && !this.isCheckAll
    },
    checkedIdList() {
      return this.list.filter(({ isCheck }) => isCheck).map(({ id }) => id)
    }
  },
  created() {
    this.fetchData(1, 10)
  },
  methods: {
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
      this.$router.push({ name: 'AttractionCreate' })
    },
    gotoEditPage(id) {
      this.$router.push({ name: 'AttractionEdit', params: { id }})
    },
    checkAllRow() {
      this.list.forEach(item => { item.isCheck = this.isCheckAll })
    },
    checkOneRow(status) {
      this.isCheckAll = status && this.list.every(({ isCheck }) => isCheck)
    },
    showRemoveConfirm(ids) {
      this.$confirm('確定要刪除選擇的景點嗎？', 'Warning', {
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
