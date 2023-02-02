<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="text">订单列表</span>
      </div>
      <el-table :data="list" style="width: 100%">
        <el-table-column label="订单号" width="380">
          <template slot-scope="scope">
            <i class="el-icon-goods"/>
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="300">
          <template slot-scope="scope">
            <p>{{ scope.row.time }}</p>
          </template>
        </el-table-column>
        <el-table-column label="用户角色" width="380">
          <template slot-scope="scope">
            <i class="el-icon-s-custom" style="color: #F56C6C"/>
            <span style="margin-left: 10px;color: #F56C6C">{{ scope.row.role }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户ID" width="300">
          <template slot-scope="scope">
            <p>{{ scope.row.userId }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="show(scope.row.id)"
            >详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false">
      <el-table
        :data="this.itemList"
        max-height="30000"
        style="
                  width: 100%;
                  padding-left: 4%;
                  padding-right: 4%;
                  font-size: samller;
                "
        table-layout="fixed"
      >
        <el-table-column prop="title" label="商品名称"/>
        <el-table-column prop="price" label="商品价格￥"/>
        <el-table-column label="商品数量（件）" property="count">
          <template #default="scope">{{ scope.row.count }}</template>
        </el-table-column>
        <el-table-column prop="totalPrice" label="小计￥"/>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
  import { getOrders, getOrdersById } from "@/api/orders";

  export default {
    data() {
      return {
        list: [],
        isActice: true,
        drawer: false,
        itemList: []
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        getOrders().then((res) => {
          this.list = res;
        });
      },
      show(id) {
        getOrdersById(id).then((res) => {
          let obj = JSON.parse(res.items);
          this.itemList = obj.list;
        });
        this.drawer = true;
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
