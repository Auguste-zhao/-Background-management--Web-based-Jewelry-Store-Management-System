<template>
  <el-container>
    <el-header class="titleBlock">信息监控台</el-header>
    <el-container style="margin-top: 50px">
      <el-main width="25%">
        <el-progress type="dashboard" :percentage="shanghaiPercent" :color="colors"/>
        <el-tag type="info">上海仓库余量</el-tag>
      </el-main>
      <el-main width="25%">
        <el-progress type="dashboard" :percentage="pekingPercent" :color="colors"/>
        <el-tag type="info">北京仓库余量</el-tag>
      </el-main>
      <el-main width="25%">
        <el-progress type="dashboard" :percentage="guangzhouPercent" :color="colors"/>
        <el-tag type="info">广东仓库余量</el-tag>
      </el-main>
      <el-main width="25%">
        <el-progress type="dashboard" :percentage="chongqingPercent" :color="colors"/>
        <el-tag type="info">重庆仓库余量</el-tag>
      </el-main>
<!--      使用基于 Vue2.x 的 Echarts 组件构建数据图表-->
    </el-container>
    <el-footer>
      <ve-line :data="chartData" :settings="chartSettings"/>
    </el-footer>
  </el-container>
</template>
<script>
  import {
    productsChongqingApi,
    productsGuangzhouApi,
    productsPekingApi,
    productsShanghaiApi
  } from "@/api/warehouse";

  import { getOrders, getOrdersById } from "@/api/orders";
  import { productsApi } from "@/api/products";
  import { result } from "lodash-es";

  export default {
    data() {
      const chartSettings = {
        area: true
      };
      return {
        chartSettings,
        shanghaiPercent: 15,
        pekingPercent: 50,
        guangzhouPercent: 75,
        chongqingPercent: 100,
        colors: [
          { color: "#f56c6c", percentage: 20 },
          { color: "#e6a23c", percentage: 40 },
          { color: "#5cb87a", percentage: 60 },
          { color: "#1989fa", percentage: 80 },
          { color: "#6f7ad3", percentage: 100 }
        ],
        chartData: {
          columns: ["日期", "销售量", "销售金额"],
          rows: [
            { 日期: "2022-3-26", 销售量: 1393, 销售金额: 1093 },
            { 日期: "2022-3-27", 销售量: 3530, 销售金额: 3230 }
          ]
        },
        projetsEmptyList: [],
        shanghai: 0,
        peking: 0,
        guangzhou: 0,
        chongqing: 0,
        total: 0
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        // 获取每个仓库的存货数量
        const products = await Promise.all([
          productsShanghaiApi(),
          productsPekingApi(),
          productsGuangzhouApi(),
          productsChongqingApi()
        ]);
        // 【函数】对数据进行分组
        const groupBy = (list, key) => {
          const result = [];
          list.forEach((item) => {
            const index = result.findIndex((r) => r[key] === item[key]);
            if (index < 0) {
              result.push({
                [key]: item[key],
                list: [item]
              });
            } else {
              result[index].list.push(item);
            }
          });
          return result;
        };
        // 获取所有的商品
        await productsApi().then((res)=>{
          res.forEach((element)=>{
            if (element.surplus<1){
              this.projetsEmptyList.push(element)
            }
          })
          // 显示提示商品余量不足
         this.projetsEmptyList.forEach((element)=>{
            this.$notify.error({
              title: '商品余量不足',
              message: element.title +"-----["+element.warehouse+"仓]",
              duration: 0,
            });
          })
        })
        // 获取全部订单
        await getOrders().then((res) => {
          // 按时间分组的订单
          let groupByTime = groupBy(res, "time");
          groupByTime.forEach((element) => {
            let totalCount = 0;
            let totalAmount = 0;
            element.list.forEach((item) => {
              let itemsList = JSON.parse(item.items).list;
              itemsList.forEach((item) => {
                // 当天的总销售量
                totalCount += item.count;
                // 当天的销售总额
                totalAmount += item.totalPrice;
              });
            });
            this.chartData.rows.push({
              日期: element.time,
              销售量: totalCount,
              销售金额: totalAmount
            });
          });
        });
        const cities = ["shanghai", "peking", "guangzhou", "chongqing"];
        for (let i = 0; i < cities.length; i++) {
          this[cities[i]] = products[i]
            .map((item) => item.surplus)
            .reduce((total, curr) => total + curr, 0);
          this.total += this[cities[i]];
        }
        for (let i = 0; i < cities.length; i++) {
          this[cities[i] + "Percent"] = Number(((this[cities[i]] * 100) / this.total).toFixed(2));
        }
      }
    }
  };
</script>
<style>
  .el-header,
  .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .titleBlock {
    background: #a2a9af;
    font-family: 'Arial', 'Microsoft YaHei', '黑体', '宋体', sans-serif;
    font-size: 19px;
    color: #3d3d3b;
  }
</style>
