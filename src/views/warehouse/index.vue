<template>
  <el-tabs v-model="activeName" style="margin-left: 50px" @tab-click="handleClick">
    <el-tab-pane label="上海仓库" name="Shanghai">
      <el-table :data="listShanghai" style="width: 100%" :row-class-name="tableRowClassName">
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
    </el-tab-pane>
    <el-tab-pane label="北京仓库" name="Peking">
      <el-table :data="listPeking" style="width: 100%" :row-class-name="tableRowClassName">
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
    </el-tab-pane>
    <el-tab-pane label="广州仓库" name="Guangzhou">
      <el-table :data="listGuangzhou" style="width: 100%" :row-class-name="tableRowClassName">
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
    </el-tab-pane>
    <el-tab-pane label="重庆仓库" name="Chongqing">
      <el-table :data="listChongqing" style="width: 100%" :row-class-name="tableRowClassName">
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
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import {
  productsChongqingApi,
  productsGuangzhouApi,
  productsPekingApi,
  productsShanghaiApi
} from '@/api/warehouse'

export default {
  data() {
    return {
      activeName: 'Shanghai',
      listShanghai: [],
      listPeking: [],
      listGuangzhou: [],
      listChongqing: []
    }
  },
  created() {
    this.fetchShanghaiData()
  },
  methods: {
    /**
     * 获取上海仓商品
     */
    fetchShanghaiData() {
      productsShanghaiApi().then((res) => {
        this.listShanghai = res
      }),
        productsPekingApi().then((res) => {
          this.listPeking = res
        }),
        productsGuangzhouApi().then((res) => {
          this.listGuangzhou = res
        }),
        productsChongqingApi().then((res) => {
          this.listChongqing = res
        })
    },
    handleClick(tab, event) {
      console.log(tab, event)
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
