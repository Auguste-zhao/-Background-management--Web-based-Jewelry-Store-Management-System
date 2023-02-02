<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="text">销售员列表</span>
        <!-- 添加销售员 -->
        <el-button type="primary" style="float: right" @click="addDialogVisiable = true"
          >添加销售员</el-button
        >
      </div>
      <el-table
        :data="list"
        style="width: 100%"
        :default-sort="{ prop: 'sales', order: 'descending' }"
      >
        <el-table-column label="销售员ID" width="180">
          <template slot-scope="scope">
            <i class="el-icon-goods" />
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="300">
          <template slot-scope="scope">
            <p>姓名: {{ scope.row.username }}</p>
          </template>
        </el-table-column>
        <el-table-column label="销售额（笔/月）" prop="sales" width="180" sortable>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sales }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.tel }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="showDialogVisiable(scope.$index, scope.row)"
              >编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加销售员信息的对话框 -->
    <el-dialog
      title="添加销售员信息"
      :visible.sync="addDialogVisiable"
      width="30%"
      @close="addRoleDialog"
    >
      <el-form
        ref="addFormRef"
        :model="addForm"
        status-icon
        :rules="addFormRules"
        label-width="70px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.username" />
        </el-form-item>
        <el-form-item label="销量" prop="sales">
          <el-input v-model="addForm.sales" disabled />
        </el-form-item>
        <el-form-item label="联系方式" prop="tel">
          <el-input v-model="addForm.tel" />
        </el-form-item>
      </el-form>
      <!-- 提交按钮部分 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addRole">确定</el-button>
        <el-button type="info" @click="addDialogVisiable = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 编辑销售员信息的对话框 -->
    <el-dialog
      title="编辑销售员信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClose"
    >
      <el-form
        ref="editFormRef"
        :model="editForm"
        status-icon
        :rules="editFormRules"
        label-width="80px"
      >
        <el-form-item label="销售员ID" prop="id">
          <el-input v-model="editForm.id" disabled />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.username" />
        </el-form-item>
        <el-form-item label="销量（笔/月）" prop="sales">
          <el-input v-model="editForm.sales" disabled />
        </el-form-item>
        <el-form-item label="联系方式" prop="tel">
          <el-input v-model="editForm.tel" />
        </el-form-item>
      </el-form>
      <!-- 提交按钮部分 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  salespersonAdd,
  salespersonApi,
  salespersonDel,
  salespersonEdit,
  salespersonGet
} from '@/api/salesperson'

export default {
  data() {
    return {
      list: [],
      isActice: true,
      // 添加管理员对话框的是否显示
      addDialogVisiable: false,
      // 编辑管理员对话框是否显示
      editDialogVisible: false,
      // 添加管理员的信息
      addForm: {
        username: '',
        sales: '',
        tel: ''
      },
      // 添加商品的表单验证规则
      addFormRules: {
        username: [
          {
            required: true,
            message: '请输入正确的销售员姓名',
            trigger: 'blur'
          },
          { min: 2, max: 5, message: '姓名在2~5个字符', trigger: 'blur' }
        ],
        sales: [
          {
            required: false,
            message: '请输入正确的销量',
            trigger: 'blur'
          }
        ],
        tel: [
          {
            required: false,
            message: '请输入正确的销售员电话',
            trigger: 'blur'
          }
        ]
      },
      // 编辑商品的数据
      editForm: {},
      // 编辑商品的表单验证规则
      editFormRules: {
        username: [
          { required: true, message: '请输入正确的姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '姓名在2~5个字符', trigger: 'blur' }
        ],
        sales: [
          {
            required: true,
            message: '请输入正确的销量',
            trigger: 'blur'
          }
        ],
        tel: [
          {
            required: false,
            message: '请输入正确的电话',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      salespersonApi().then((res) => {
        this.list = res
      })
    },
    // 重置表单
    addRoleDialog() {
      this.$refs.addFormRef.resetFields()
    }, // 添加用户
    addRole() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        console.log(this.addForm)
        await salespersonAdd(this.addForm)
        this.$message.success('添加用户成功')
        this.addDialogVisiable = false
        this.fetchData()
      })
    },
    // 显示编辑销售员的对话框
    // 先根据id找到销售员的信息
    async showDialogVisiable(index, row) {
      // // 保存数据
      this.editForm = await salespersonGet({ id: row.id })
      // 显示对话框
      this.editDialogVisible = true
    },
    handleEdit() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        // 请求
        await salespersonEdit({
          id: this.editForm.id,
          username: this.editForm.username,
          sales: this.editForm.sales,
          tel: this.editForm.tel
        })

        // // 关闭对话框
        this.editDialogVisible = false
        // 刷新销售员列表
        this.fetchData()
        // 成功提示信息
        this.$message.success('修改销售员信息成功')
      })
    },
    // 关闭修改销售员对话框
    editDialogClose() {
      this.$refs.editFormRef.resetFields()
    },
    async handleDelete(index, row) {
      const confirmResult = await this.$confirm('此操作将永久删除该销售员，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (confirmResult != 'confirm') {
        this.$message.info('已经取消删除')
      } else {
        await salespersonDel(row.id)
        this.$message.success('删除商品成功')
        this.fetchData()
      }
    }
  }
}
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.text {
  font-size: 26px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
</style>
