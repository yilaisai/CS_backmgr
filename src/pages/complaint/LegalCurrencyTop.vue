<template>
    <div class='exchangeSAC'>
      <el-form :inline="true"
               label-width="90px"
               ref="filterForm"
               :model="filterForm">
        <sac-input
          ref="phone"
          label="账号"
          v-model.trim="filterForm.phoneOrEmail"></sac-input>
        <sac-input
          ref="phone"
          label="昵称"
          v-model.trim="filterForm.nickName"></sac-input>
        <el-form-item label="币种">
					<el-select class="select" v-model="coinType" >
							<el-option v-for="(item, key) in coinList" :key="key" :value="item" :label="item"></el-option>
					</el-select>
				</el-form-item>  
        <sac-submit-form
          :isReset='false'
          @submitForm="getUserRaking()"></sac-submit-form>
      </el-form>
      <el-table stripe border height="100%" :default-sort = "{prop: 'usdtAmount', order: 'descending'}" :data="listData.list" @sort-change='sortChange'>
        <el-table-column
          type="index"
          label="序号"
          :index="indexMethod">
        </el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="nickName" label="昵称"></el-table-column>
        <el-table-column prop="usdtAmount" sortable='custom' label="USDT"></el-table-column>
        <el-table-column prop="btcAmount" sortable ='custom' label="BTC"></el-table-column>
        <!-- <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button @click="detail(scope.row)" >查看详情</el-button>
          </template>
        </el-table-column> -->
        <el-table-column prop="registTime" label="时间">
          <template slot-scope="scope">
            {{  $fmtDate(scope.row.registTime,'full')}}
          </template>
        </el-table-column>
      </el-table>
      <sac-pagination v-show="listData.list.length>0"
                      @handleChange="getPaginationChange"
                      :total="+listData.total"
                      :page-size="filterForm.pageSize"
                      :current-page="filterForm.pageNum">
      </sac-pagination>
    </div>
</template>
<script>
    export default {
        name: "exchangeSAC",
        data() {
            return {
              filterForm: {
                nickName: '',
                phoneOrEmail: '',
                pageNum: 1,
                pageSize: 20,
                coinName:'USDT',//'BTC'
                order:'desc'//和asc
              },
              coinType:'BTC',
              coinList:['BTC','USDT','ETH'],
              listData: {
                total: null,
                list: [],
              },
            };
        },
      methods: {
        indexMethod(index) {
          return   (this.filterForm.pageNum-1)*20+index+1
        },
        sortChange(a){
          if(a.order=="ascending"){//上升
            this.filterForm.order = 'asc'
          }else{//下降
            this.filterForm.order = 'desc'
          }
          if(a.prop=="btcAmount"){
            this.filterForm.coinName = 'BTC'
          }else{
            this.filterForm.coinName = 'USDT'
          }
          // this.filterForm.pageSize = 1;
          this.filterForm.pageNum = 1;
          this.getUserRaking();
        },
        getPaginationChange(val, currentPage) {
          this.filterForm.pageSize = val;
          this.filterForm.pageNum = currentPage;
          this.getUserRaking();
        },
        // 查询代理用户列表
        getUserRaking() {
          this.$http.post("/wallet/app/otc/backmgr/getUserRaking", this.filterForm).then((res) => {
            this.listData.list = res.result.CustomerInfoExList.list;
            this.listData.total = res.result.CustomerInfoExList.total;
          })
        },
        detail(data){
          console.log(data)
        }
      },
      activated() {
        this.getUserRaking();      // 查询代理用户列表
      }
    };
</script>
<style lang="">
    .exchangeSAC {
    }
</style>
