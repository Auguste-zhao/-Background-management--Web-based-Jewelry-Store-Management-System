<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="text">商品列表</span>
        <!-- 添加商品 -->
        <el-button type="primary" style="float: right" @click="addDialogVisiable = true"
          >添加商品</el-button
        >
      </div>
      <el-table :data="list" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column label="商品ID" width="180">
          <template slot-scope="scope">
            <i class="el-icon-goods" />
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名" width="300">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>商品名: {{ scope.row.title }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag style="font-size: 15px">{{ scope.row.title }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="商品余量（件）" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.surplus }}</span>
          </template>
        </el-table-column>
        <el-table-column label="￥商品价格（元）" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="￥商品图片（url）" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.imgurl }}</span>
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
        <el-form-item label="商品名" prop="title">
          <el-input v-model="addForm.title" />
        </el-form-item>
        <el-form-item label="商品余量" prop="surplus">
          <el-input v-model="addForm.surplus" />
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="addForm.price" />
        </el-form-item>
        <el-form-item label-width="60px" label="仓库:" class="postInfo-container-item">
          <el-select v-model="addForm.warehouse" default-first-option>
            <el-option
              v-for="(item, index) in warehouses"
              :key="item + index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片" prop="imgurl">
          <el-input v-model="addForm.imgurl" />
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
        <el-form-item label="商品ID" prop="id">
          <el-input v-model="editForm.id" disabled />
        </el-form-item>
        <el-form-item label="商品名" prop="title">
          <el-input v-model="editForm.title" />
        </el-form-item>
        <el-form-item label="商品余量" prop="surplus">
          <el-input v-model="editForm.surplus" />
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="editForm.price" />
        </el-form-item>
        <el-form-item label="商品仓库" prop="warehouse">
          <el-input v-model="editForm.warehouse" />
        </el-form-item>
        <el-form-item label="商品图片" prop="imgurl">
          <el-input v-model="editForm.imgurl" />
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
import { productsAdd, productsApi, productsDel, productsEdit, productsGet } from '@/api/products'

export default {
  data() {
    return {
      list: [],
      isActice: true,
      warehouses: ['上海', '北京', '广州', '重庆'],
      // 添加商品对话框的是否显示
      addDialogVisiable: false,
      // 编辑商品对话框是否显示
      editDialogVisible: false,
      // 添加商品的信息
      addForm: {
        title: '',
        surplus: '',
        price: '',
        warehouse: '',
        imgurl:''
      },
      // 添加商品的表单验证规则
      addFormRules: {
        title: [
          {
            required: true,
            message: '请输入正确的商品名称',
            trigger: 'blur'
          },
          { min: 2, max: 15, message: '商品名在2~15个字符', trigger: 'blur' }
        ],
        surplus: [
          {
            required: false,
            message: '请输入正确的商品余量',
            trigger: 'blur'
          },
          { min: 0, max: 10000, message: '商品数量在0~10000', trigger: 'blur' }
        ],
        price: [
          {
            required: false,
            message: '请输入正确的商品价格',
            trigger: 'blur'
          }
        ],
        warehouse: [
          {
            required: false,
            message: '请输入正确的商品仓库',
            trigger: 'blur'
          }
        ]
      },
      // 编辑商品的数据
      editForm: {},
      // 编辑商品的表单验证规则
      editFormRules: {
        title: [
          { required: true, message: '请输入正确的产品名', trigger: 'blur' },
          { min: 2, max: 15, message: '商品名在2~15个字符', trigger: 'blur' }
        ],
        surplus: [
          {
            required: true,
            message: '请输入正确的商品余量',
            trigger: 'blur'
          },
        ],
        price: [
          {
            required: false,
            message: '请输入正确的商品价格',
            trigger: 'blur'
          }
        ],
        warehouse: [
          {
            required: false,
            message: '请输入正确的商品仓库',
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
      productsApi().then((res) => {
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
        await productsAdd(this.addForm)
        this.$message.success('添加商品成功')
        this.addDialogVisiable = false
        this.fetchData()
      })
    },
    // 显示编辑商品的对话框
    // 先根据id找到商品的信息
    async showDialogVisiable(index, row) {
      // // 保存数据
      this.editForm = await productsGet({ id: row.id })
      // 显示对话框
      this.editDialogVisible = true
    },
    handleEdit() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        // 请求
        await productsEdit({
          id: this.editForm.id,
          title: this.editForm.title,
          surplus: this.editForm.surplus,
          price: this.editForm.price,
          warehouse: this.editForm.warehouse,
          imgurl:this.editForm.imgurl,
        })

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
        await productsDel(row.id)
        this.$message.success('删除商品成功')
        this.fetchData()
      }
    },
    tableRowClassName({ row }) {
      // 设置商品余量为0时警告
      if (row.surplus < 1) {
        return 'warning-row'
      } else if (row.surplus > 100) {
        return 'success-row'
      }
      return ''
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
