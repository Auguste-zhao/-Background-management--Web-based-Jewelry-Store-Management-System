<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="text">用户列表</span>
      </div>
      <el-table
        :data="list"
        style="width: 100%"
        :default-sort="{ prop: 'sales', order: 'descending' }"
      >
        <el-table-column label="销售员ID" width="180">
          <template slot-scope="scope">
            <i class="el-icon-goods"/>
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="300">
          <template slot-scope="scope">
            <p>姓名: {{ scope.row.username }}</p>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.tel }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
  import {
    getCustomers,
    customersDel
  } from "@/api/customers";

  export default {
    data() {
      return {
        list: [],
        isActice: true

      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        getCustomers().then((res) => {
          this.list = res;
        });
      },
      // 重置表单
      addRoleDialog() {
        this.$refs.addFormRef.resetFields();
      },
      // // 先根据id找到商品的信息
      // async showDialogVisiable(index, row) {
      //   // // 保存数据
      //   this.editForm = await salespersonGet({ id: row.id });
      //   // 显示对话框
      //   this.editDialogVisible = true;
      // },
      //
      async handleDelete(index, row) {
        const confirmResult = await this.$confirm("此操作将永久删除该商品，是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).catch((err) => err);
        if (confirmResult != "confirm") {
          this.$message.info("已经取消删除");
        } else {
          await customersDel(row.id);
          this.$message.success("删除商品成功");
          this.fetchData();
        }
      }
    }
  };
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
