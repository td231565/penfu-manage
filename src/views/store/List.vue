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
              <!-- <el-form-item label="狀態">
                <el-select v-model="queryData.status" placeholder="請選擇店家狀態">
                  <el-option label="正常" :value="1" />
                  <el-option label="已停權" :value="2" />
                </el-select>
              </el-form-item> -->
              <el-form-item label="電話號碼">
                <el-input v-model="queryData.cellphone" placeholder="請輸入電話號碼" />
              </el-form-item>
            </div>
          </div>
          <el-form-item class="d-flex justify-content-end align-items-end flex-shrink-1">
            <el-button type="primary" icon="el-icon-search" @click="fetchData(1, page.size)">搜尋</el-button>
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
        <!-- <el-table-column align="center" width="40">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isCheck" />
          </template>
        </el-table-column> -->
        <el-table-column align="center" label="店家 ID">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="名稱" align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="電話" align="center">
          <template slot-scope="scope">
            {{ scope.row.phoneNumber }}
          </template>
        </el-table-column>
        <el-table-column label="email" align="center">
          <template slot-scope="scope">
            {{ scope.row.Email }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="使用狀態" width="90" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.status ? '正常' : '已停權'" placement="top">
              <el-switch v-model="scope.row.status" />
            </el-tooltip>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="60">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="編輯" placement="top">
              <el-button type="text" size="large" @click="gotoEditPage(scope.row.id)">
                <i class="el-icon-edit" />
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="d-flex justify-content-end align-items-center mt-3">
        <!-- <div class="d-flex align-items-center">
          <el-checkbox
            v-model="isCheckAll"
            :indeterminate="isIndeterminate"
            @change="checkAllRow"
          >全選</el-checkbox>
          <el-button type="danger" plain class="ms-3" @click="showDisableConfirm">停權</el-button>
        </div> -->
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
import { getList } from '@/api/member'

export default {
  name: 'StoreList',
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
        name: '',
        email: '',
        cellphone: '',
        startDate: '',
        endDate: '',
        userCategory: '店家'
      },
      isCheckAll: false
    }
  },
  computed: {
    ...mapGetters(['storePage', 'storeQuery']),
    isIndeterminate() {
      return this.list.some(({ isCheck }) => isCheck) && !this.isCheckAll
    },
    checkedIdList() {
      return this.list.filter(({ isCheck }) => isCheck).map(({ id }) => id)
    }
  },
  created() {
    this.page = JSON.parse(JSON.stringify(this.storePage))
    this.queryData = JSON.parse(JSON.stringify(this.storeQuery))
    const { current, size } = this.page
    this.fetchData(current, size)
  },
  beforeDestroy() {
    this.SET_STORE_PAGE(this.page)
    this.SET_STORE_QUERY(this.queryData)
  },
  methods: {
    ...mapMutations('lists', ['SET_STORE_PAGE', 'SET_STORE_QUERY']),
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
      this.$router.push({ name: 'StoreCreate' })
    },
    gotoEditPage(id) {
      this.$router.push({ name: 'StoreEdit', params: { id }})
    },
    checkAllRow() {
      this.list.forEach(item => { item.isCheck = this.isCheckAll })
    },
    checkOneRow(status) {
      this.isCheckAll = status && this.list.every(({ isCheck }) => isCheck)
    },
    // showDisableConfirm(ids) {
    //   this.$confirm('確定要刪除選擇的景點嗎？', 'Warning', {
    //     confirmButtonText: '確定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.listLoading = true
    //     deleteItems(ids).then(() => {
    //       this.$message({ type: 'success', message: '刪除成功' })
    //       const { current, size, total } = this.page
    //       if (current === 1) {
    //         this.fetchData(1, size)
    //       } else if ((total - ids.length) / size === current - 1 && current !== 1) {
    //         // 如果分頁內只有一筆，是目前的最後一頁且不是第一頁，就拿上一頁的資料
    //         this.fetchData(current - 1, size)
    //       } else {
    //         this.fetchData(current, size)
    //       }
    //       this.listLoading = false
    //     })
    //   }).catch(() => {
    //     this.listLoading = false
    //   })
    // },
    showDate(date) {
      return date.replace('T', ' ').slice(0, -3)
    },
    checkStatus(statusType) {
      return statusType === 1
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
