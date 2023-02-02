<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="发布日期">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="发布人">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="重要等级">
        <template slot-scope="scope">
          <i v-for="n in +scope.row.importance" :key="n" class="el-icon-star-on" />
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="标题">
        <template slot-scope="scope">
          <el-button type="info" @click="showDialogVisiable(scope.row)"
            >公告: {{ scope.row.title }}</el-button
          >
        </template>
      </el-table-column>

      <el-table-column align="center" label="删除" width="120">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="deleteAnnouncement(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 公告详情的对话框 -->
    <el-dialog title="公告详情" :visible.sync="infoDialogVisiable" width="45%">
      <div v-html="info" />
    </el-dialog>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

import { getAnnouncementApi, announcementDel } from '@/api/announcement'

export default {
  name: 'ArticleList',
  components: {
    Pagination
  },
  filters: {},
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      // 公告信息对话框的是否显示
      infoDialogVisiable: false,
      info: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getAnnouncementApi().then((res) => {
        this.list = res
        this.listLoading = false
      })
    },
    async showDialogVisiable(row) {
      this.info = row.content
      // 显示对话框
      this.infoDialogVisiable = true
    },
    async deleteAnnouncement(row) {
      const confirmResult = await this.$confirm('此操作将永久删除该公告，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (confirmResult != 'confirm') {
        this.$message.info('已经取消删除')
      } else {
        await announcementDel(row.id)
        this.$message.success('删除公告成功')
        this.getList()
      }
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
