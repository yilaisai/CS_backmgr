<template>
  <div class="invite-page">
   <el-form :inline="true"  ref="filterForm" :model="filterForm">
      <div class="form-group">
        <el-form-item label="账号:">
          <el-input placeholder="请输入用户账号" v-model="filterForm.account" class="input-with-select"></el-input>
        </el-form-item>
        <el-form-item label="昵称:">
          <el-input placeholder="请输入用户昵称" v-model="filterForm.nickName" class="input-with-select"></el-input>
        </el-form-item>
        <el-form-item label="邀请码:">
          <el-input placeholder="请输入用户昵称" v-model="filterForm.nickName" class="input-with-select"></el-input>
        </el-form-item>
        <el-button  type="primary"  size="mini"
          @click.native="search">查询
        </el-button>
      </div>
    </el-form>
    <div class="table">
      <el-table
      :data="tableData1"
      style="width: 100%"
      :row-key="rowKey" 
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
  <div class="footer">
    <sac-pagination v-show="listData.list.length>0"
        @handleChange="handleCurrentChange"
        :total="+listData.total"
        :page-size="listData.pageSize"
        :current-page="listData.pageNum">
    </sac-pagination>
  </div>
  
  </div>
</template>
<script>
export default {
  components:{

  },
  data(){
    return {
      filterForm:{

      },
      listData:{
        list:[],
        total:0,
        pageSize:10,
        pageNum:1
      },
      tableData1: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          hasChildren: true
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          hasChildren: true
        }]
    }
  },
  mounted(){

  },
  methods:{
    handleCurrentChange(){
      
    },
    rowKey(row,i){
      console.log(row)
      return row.id
    },
    load(tree, treeNode, resolve) {
        setTimeout(() => {
          resolve([
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ])
        }, 1000)
      }
  },
  watch:{

  },
  computed:{

  }
  }
</script>
<style lang="less" scoped>
.invite-page{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
    .main{
      flex: 1;
      overflow: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      background: #F6F9FC;
    
    }
}
</style>