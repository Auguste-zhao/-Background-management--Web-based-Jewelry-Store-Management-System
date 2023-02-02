<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="text">管理员列表</span>
        <!-- 添加商品 -->
        <el-button type="primary" style="float: right" @click="addDialogVisiable = true"
          >添加管理员</el-button
        >
      </div>
      <el-table :data="list" style="width: 100%">
        <el-table-column label="管理员ID" width="180">
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
        <el-table-column label="管理员权限" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.role }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.tel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="职位" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.position }}</span>
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
    <!-- 添加商品信息的对话框 -->
    <el-dialog
      title="添加商品信息"
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
        <el-form-item label="姓名" prop="username">
          <el-input v-model="addForm.username" />
        </el-form-item>
        <el-form-item label="权限" prop="role">
          <el-input v-model="addForm.role" />
        </el-form-item>
        <el-form-item label="联系方式" prop="tel">
          <el-input v-model="addForm.tel" />
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="addForm.position" />
        </el-form-item>
      </el-form>
      <!-- 提交按钮部分 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addRole">确定</el-button>
        <el-button type="info" @click="addDialogVisiable = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 编辑商品信息的对话框 -->
    <el-dialog
      title="编辑商品信息"
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
        <el-form-item label="管理员ID" prop="id">
          <el-input v-model="editForm.id" disabled />
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="editForm.username" />
        </el-form-item>
        <el-form-item label="权限" prop="role">
          <el-input v-model="editForm.role" />
        </el-form-item>
        <el-form-item label="联系方式" prop="tel">
          <el-input v-model="editForm.tel" />
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="editForm.position" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password" />
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
import { adminsAdd, adminsApi, adminsDel, adminsEdit, adminsGet } from '@/api/admins'

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
        role: '',
        password: '123456',
        tel: '',
        position: ''
      },
      // 添加商品的表单验证规则
      addFormRules: {
        username: [
          {
            required: true,
            message: '请输入正确的管理员姓名',
            trigger: 'blur'
          },
          { min: 2, max: 10, message: '姓名在2~10个字符', trigger: 'blur' }
        ],
        role: [
          {
            required: false,
            message: '请输入正确的管理员角色',
            trigger: 'blur'
          }
        ],
        tel: [
          {
            required: false,
            message: '请输入正确的管理员电话',
            trigger: 'blur'
          }
        ],
        position: [
          {
            required: false,
            message: '请输入正确的管理员职位',
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
          { min: 2, max: 10, message: '姓名在2~10个字符', trigger: 'blur' }
        ],
        role: [
          {
            required: true,
            message: '请输入正确的角色',
            trigger: 'blur'
          }
        ],
        tel: [
          {
            required: false,
            message: '请输入正确的电话',
            trigger: 'blur'
          }
        ],
        position: [
          {
            required: false,
            message: '请输入正确的职位',
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
      adminsApi().then((res) => {
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
        await adminsAdd(this.addForm)
        this.$message.success('添加用户成功')
        this.addDialogVisiable = false
        this.fetchData()
      })
    },
    // 显示编辑商品的对话框
    // 先根据id找到商品的信息
    async showDialogVisiable(index, row) {
      // // 保存数据
      this.editForm = await adminsGet({ id: row.id })
      this.editForm.password = ''
      // 显示对话框
      this.editDialogVisible = true
    },
    handleEdit() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        // 请求
        const data = JSON.parse(JSON.stringify(this.editForm))
        if (this.editForm.password){
          data.password = this.editForm.password;
        }else {
          delete data.password
        }
        await adminsEdit(data)

        // // 关闭对话框
        this.editDialogVisible = false
        // 刷新商品列表
        this.fetchData()
        // 成功提示信息
        this.$message.success('修改商品信息成功')
      })
    },
    // 关闭修改商品对话框
    editDialogClose() {
      this.$refs.editFormRef.resetFields()
    },
    async handleDelete(index, row) {
      const confirmResult = await this.$confirm('此操作将永久删除该商品，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (confirmResult != 'confirm') {
        this.$message.info('已经取消删除')
      } else {
        await adminsDel(row.id)
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
