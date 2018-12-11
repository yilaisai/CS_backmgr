/*
 * @Author: dubbing 
 * @Date: 2018-12-05 14:54:11 
 * @Last Modified by: dubbing
 * @Content 系统参数
 * @Last Modified time: 2018-12-06 17:09:20
 */

<template>
  <div class='collect-alarm'>
    <el-col :span="22" style="text-align:right; margin-bottom:30px;">
      <el-button size="small" type="primary" @click="addSend">创建系统参数</el-button>
    </el-col>
    <sac-table :data="listData.list">
        <el-table-column prop="id" label="序号"></el-table-column>
        
        
        <el-table-column prop="paramName" label="参数名"></el-table-column>
        <el-table-column prop="paramValue" label="参数值"></el-table-column>
        <el-table-column prop="paramType" label="参数类型"></el-table-column>
        <el-table-column prop="destxt" label="描述"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
        
      
        <el-table-column label="操作" width="160">
            <template slot-scope="scope">
            <!-- <el-button :type="scope.row.activeStatus == 1? 'danger' : 'primary'" size="small"
                        @click.native="handleStatus(scope.row.id,scope.row.activeStatus)">{{scope.row.activeStatus == 1?
                '暂停' : '生效'}}
            </el-button> -->
            <el-button type="warning" size="small" @click.native="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click.native="remove(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </sac-table>
    <sac-pagination v-show="listData.list.length>0"
                    @handleChange="getPaginationChange"
                    :total="+listData.total"
                    :page-size="filterForm.pageSize"
                    :current-page="filterForm.pageNum">
    </sac-pagination>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="130px">
        <el-form-item label="参数名" prop="name">
          <el-input size="small" v-model="ruleForm.name" placeholder="请输入参数名"></el-input>
        </el-form-item>
        <el-form-item label="参数值" prop="value">
          <el-input size="small" v-model="ruleForm.value" placeholder="请输入参数值"></el-input>
        </el-form-item>
        <el-form-item label="参数类型:"  prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择参数类型">
                <el-option label="Integer" value="Integer"></el-option>
                <el-option label="String" value="String"></el-option>
                <el-option label="Double" value="Double"></el-option>
                <el-option label="Boolean" value="Boolean"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="描述:"  prop="destxt">
            <el-input type="textarea" v-model="ruleForm.destxt" placeholder="请输入描述"></el-input>
        </el-form-item>
       
        <!-- <el-form-item label="手机号码：" prop="phone">
          <el-input size="small" v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="告警类型:" prop="rtype">
          <el-select v-model="ruleForm.rtype" size="small" style="width:100%;" placeholder="请选择">
            <el-option v-for="(item,index) in alarmlist" :key="item.code" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户姓名：">
          <el-input size="small" v-model="ruleForm.name" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="发生间隔：" prop="Intervals">
          <el-input size="small" style="width:60%;" v-model="ruleForm.IntervalTime" placeholder="请输入发生间隔"></el-input>
          <span style="margin-left:10px;"> 分钟</span>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="determine" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'collect-alarm',
    data() {
      const checkNum = (rule, value, callback) => {
        if (!/^[0-9]+.?[0-9]*$/.test(value)) {
          callback(new Error(rule.message));
        } else {
          callback();
        }
      };
      return {
        listData: {
          total: null,
          list: [],
        },
        filterForm:{
            pageNum:1,
            pageSize:20,
            plat:'web'
        },
        list: [],
        alarmlist: [],
        ruleForm: {
            name:'',
            value:'',
            type:'',
            destxt:''
        },
        dialogTitle: '',
        dialogFormVisible: false,
        rules: {
          name: [
            { required: true, message: '请输入参数名', trigger: 'blur' },
          ],
          value: [
            { required: true, message: '请输入参数值', trigger: 'blur' },
          ],
          destxt: [
            { required: true, message: '请输入描述', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请选择', trigger: 'change' },
          ]
        }
      };
    },
    methods: {
        getPaginationChange(val, currentPage) {
            this.filterForm.pageSize = val;
            this.getAlarmList(currentPage);
        },
        //编辑
        edit(itemData){
            this.resetForm();
            const getData=JSON.parse(JSON.stringify(itemData))
            //this.ruleForm = JSON.parse(JSON.stringify(itemData))
            this.ruleForm.id=getData.id
            this.ruleForm.name=getData.paramName
            this.ruleForm.value=getData.paramValue
            this.ruleForm.type=getData.paramType
            this.ruleForm.destxt=getData.destxt
            this.dialogTitle = '编辑系统参数';
            this.dialogFormVisible = true;
            //this.getSysAlarmType(); 
           
        },
        resetForm() {
            
            this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
            
        },
        getAlarmList(num) {
            //const { pageNum, pageSize } = this;
            if(num){
                this.filterForm.pageNum=num
            }
            this.$http.post("wallet/backmgr/SysConfig/getSysConfigList.do", this.filterForm).then((res) => {
                const { list,total } = res.result.list;
                this.listData.list = list;
                this.listData.total = total;
            
            })
        },
        // 删除
        remove(id) {
            this.$confirm(`确定删除吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.$http.post("wallet/backmgr/SysConfig/deleteSysConfig.do", {
                id
            }).then((res) => {
                this.$notify({
                title: '成功',
                message: `删除成功`,
                type: 'success'
                });
                this.getAlarmList();
            })
            })
        },
        handleStatus(id, activeStatus) {
            const opt = {
                id: id,
                activeStatus: activeStatus == 1 ? 0 : 1
            }
            this.$http.post("wallet/backmgr/alarm/addOrUpdateAlarm.do", opt).then((res) => {
            this.$notify({
                title: '成功',
                message: `${activeStatus == 1 ? '暂停' : '生效'}成功`,
                type: 'success'
            });
            this.getAlarmList();
            })
        },
        /* getSysAlarmType() {
            if (!this.alarmlist.length) {
            this.$http.post("/wallet/backmgr/alarm/getSysAlarmType.do", {}).then((res) => {
                this.alarmlist = res.result.list
            })
            }
        }, */
        addSend() {
            this.dialogTitle = '创建系统参数';
            this.dialogFormVisible = true;
            this.ruleForm.id=''
            this.ruleForm.name=''
            this.ruleForm.value=''
            this.ruleForm.type=''
            this.ruleForm.destxt=''
            //this.getSysAlarmType();
            this.resetForm();
            //this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
        },
        determine() {
            //alert(this.ruleForm.id)
             if( this.ruleForm.id){
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                       
                        this.$http.post("wallet/backmgr/SysConfig/updateSysConfig.do", this.ruleForm).then((res) => {
                            this.$notify({
                                title: '成功',
                                message: `修改成功`,
                                type: 'success'
                            });
                            this.dialogFormVisible = false;
                            this.getAlarmList();
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            
            }else{
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                   
                        this.$http.post("wallet/backmgr/SysConfig/createSysConfig.do", this.ruleForm).then((res) => {
                            this.$notify({
                                title: '成功',
                                message: `创建成功`,
                                type: 'success'
                            });
                            this.dialogFormVisible = false;
                            this.getAlarmList();
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            } 
        }
        
    },
    activated() {
      this.getAlarmList();
    }
  };
</script>
<style lang="less">
  .collect-alarm {
  }
</style>
