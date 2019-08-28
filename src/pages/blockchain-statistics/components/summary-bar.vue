<template>
    <div class="summary-bar">
        <el-steps align-center :simple="isSimple">
            <el-step title="充币" icon="el-icon-sold-out">
                <el-card slot="description" class="box-card" @click.native="$emit('switchTransType', 'in')">
                    <ul>
                        <li>
                            <label>充币笔数：</label>
                            <span>{{count.transInNum}}</span>
                        </li>
                        <li>
                            <label>充币金额：</label>
                            <span>{{count.transInAmount}}</span>
                        </li>
                        <li>
                            <label>未归拢：</label>
                            <span>{{count.transInRemain}}</span>
                        </li>
                    </ul>
                </el-card>
            </el-step>
            <el-step title="冷钱包" icon="el-icon-wallet">
                <el-card slot="description" class="box-card" @click.native="$emit('switchTransType', 'cool')">
                    <ul>
                        <li>
                            <label>已归拢笔数：</label>
                            <span>{{count.collectInNum}}</span>
                        </li>
                        <li>
                            <label>已归拢金额：</label>
                            <span>{{count.collectInAmount}}</span>
                        </li>
                        <li>
                            <label>可用余额：</label>
                            <span>{{count.coolRemain}}</span>
                        </li>
                    </ul>
                    <div class="address-wrap">
                        <label>地址：</label>
                        <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover"
							@click.native="$window.open('https://www.omniexplorer.info/search/' + count.coolAddr)"
                            :content="count.coolAddr">
                            <span slot="reference">{{count.coolAddr}}</span>
                        </el-popover>
                        <a class="copy-link"
                            @click.stop
                            v-clipboard:copy="count.coolAddr"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            href="javascript:void 0">
                            <i class="el-icon-document-copy"></i>
                        </a>
                    </div>
                </el-card>
            </el-step>
            <el-step title="CFO" icon="el-icon-user" >
                <el-card slot="description" class="box-card" style="min-width: 180px" @click.native="$emit('switchTransType', 'out')">
                    <p>
                        <el-row :span="24">
                            <el-col :span="12">
                                充币笔数：{{count.coolToCfoNum}}
                            </el-col>
                            <el-col :span="12">
                                提币笔数：{{count.cfoOutNum}}
                            </el-col>
                        </el-row>
                    </p>
                    <p>
                        <el-row :span="24">
                            <el-col :span="12">
                                充币金额：{{count.coolToCfoAmount}}
                            </el-col>
                            <el-col :span="12">
                                提币金额：{{count.cfoOutAmount}}
                            </el-col>
                        </el-row>
                    </p>
                    <p>
                        <el-row :span="24">
                            <el-col :span="12">
                                当前余额：{{count.cfoRemain}}
                            </el-col>
                        </el-row>
                    </p>
                    <div class="address-wrap">
                        <label>地址：</label>
                        <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover"
							@click.native="$window.open('https://www.omniexplorer.info/search/' + count.cfoAddr)"
                            :content="count.cfoAddr">
                            <span slot="reference">{{count.cfoAddr}}</span>
                        </el-popover>
                        <a class="copy-link"
                            @click.stop
                            v-clipboard:copy="count.cfoAddr"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            href="javascript:void 0"><i class="el-icon-document-copy"></i>
                        </a>
                    </div>
                    <!-- <p v-if="extract !== false" style="color: red">
                        当前CFO余额为{{extract.percent}}的冷钱包余额，不足10%，还需充值 {{extract.amount}} {{currentCoin}}。
                    </p> -->
                </el-card>
            </el-step>
            <el-step title="手动打币" icon="el-icon-monitor">
                <el-card slot="description" class="box-card" @click.native="$emit('switchTransType', 'manual')">
					<ul>
                        <li>
                            <label>已打币笔数：</label>
                            <span>{{count.manualOutNum}}</span>
                        </li>
                        <li>
                            <label>已打币金额：</label>
                            <span>{{count.manualOutAmount}}</span>
                        </li>
                    </ul>
                </el-card>
            </el-step>
            <el-step title="小结" icon="el-icon-tickets">
                <el-card slot="description" class="box-card" @click.native="$emit('switchTransType', 'manual')">
                    <ul>
                        <li>
                            <label>净入：</label>
                            <span>{{count.earn}}</span>
                        </li>
                        <li>
                            <label>实际余额：</label>
                            <span>{{count.realRemain}}</span>
                        </li>
                    </ul>
                </el-card>
            </el-step>
            <el-step title="手续费(BTC)" icon="el-icon-price-tag">
                <el-card slot="description" class="box-card" @click.native="$emit('switchTransType', 'fee')">
					<ul>
						<li>
							<label>笔数：</label>
							<span>{{count.feeNum}}</span>
						</li>
						<li>
							<label>金额：</label>
							<span>{{count.feeAmount}}</span>
						</li>
						<li>
							<label>余额：</label>
							<span>{{count.feeRemain}}</span>
						</li>
					</ul>
                    <div class="address-wrap">
                        <label>地址：</label>
                        <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover"
							@click.native="$window.open('https://www.omniexplorer.info/search/' + count.feeAddr)"
                            :content="count.feeAddr">
                            <span slot="reference">{{count.feeAddr}}</span>
                        </el-popover>
                        <a class="copy-link"
                            @click.stop
                            v-clipboard:copy="count.feeAddr"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            href="javascript:void 0"><i class="el-icon-document-copy"></i>
                        </a>
                    </div>
                </el-card>
            </el-step>
        </el-steps>

        <div class="series">
			<span class="label">总充币金额：</span>
            <span class="props"><i>{{count.totalRecharge}}</i> USDT</span>
            <span class="label">总可用余额：</span>
            <span class="props"><i>{{count.totalRealRemain}}</i> USDT</span>
        </div>

        <a href="javascript:;" class="unfold-btn" @click.stop="clickHandle">
            <i :class="isSimple ? 'el-icon-bottom' : 'el-icon-top'"></i>
            <span v-text="isSimple ? '展开' : '收起'"></span>
        </a>
    </div>
</template>
<script>
import { yesterdayUtc, dateFormat } from '@/common/util'
export default {
    props: {
        filter: {
            default: () => {},
            type: Object
        },
        currentCoin: {
            default: () => '',
            type: String
        }
    },
    data () {
        return {
            open: true,
            visible: false,
            isSimple: true,
            count: {}
        }
    },
    computed: {
        extract () {
            if (typeof this.count.cfoRemain === 'undefined' || typeof this.count.coolToCfoAmount === 'undefined') return false
            let decs = this.count.cfoRemain * 100 / this.count.coolToCfoAmount
            decs = decs > 0 ? decs : 0
            let percent = '0%'
            let amount = '0'
            if (decs < 10 && !isNaN(decs)) {
                percent = decs.toFixed(2) + '%'
                amount = this.$config.percent * this.count.coolRemain - this.count.cfoRemain 
            }
            return {
                percent: percent,
                amount: amount
            }
        }
    },
    methods: {
        showDetail (refer) {
            this.visible = true
            switch (refer) {
                case 'service': // 手续费

                    break
                case 'extractCoin':

                    break
                case 'cfo':
                    
                    break
                case 'wallet': // 冷钱包

                    break
                case 'entry': // 入金

                    break
            }
        },
        clickHandle (e) {
            this.isSimple = !this.isSimple
        },
        onCopy () {
            this.$message.success('复制成功')
        },
        getData () {
            const params = {}
            const filter = this.filter
            if (filter.create_time) {
				params.startTime = filter.create_time[0] + ' 00:00:00'
                params.endTime = filter.create_time[1] + ' 23:59:59'
            } else {
            }
            if (filter.coinName) params.coinName = filter.coinName

            this.$http
                .get(`${this.$config.fundAddr}/backmgr/getDailySumInfo`, params)
                .then(({ code, result }) => {
                    if (code === 200) {
                        this.count = result
                    } else {
                        this.$notify.error({
                            title: '提示',
                            message: '获取数据失败'
                        })
                    }
                })
                .catch(e => console.warn(e))
        },
        switchTransType() {
        },
        onError () {
            this.$message.error('浏览器不支持复制，请选择后右键复制')
        },

    }
}
</script>
<style lang="less" scoped>
.summary-bar {
    position: relative;
    background-color: #fff;
    padding: 10px;
    .el-step__head {
        cursor: pointer;
    }
    /deep/ .el-step {
        &.is-center {
            .el-step__description {
                padding: 0 10px;
            }
        } 
    }
    .el-card {
		min-height: 90px;
        transition: all .3s;
        &:hover {
            transform: scale(1.1);
        }
    }
    /deep/ .el-card__body {
        padding: 5px;
        cursor: grab;
        
        ul {
            li {
				white-space: nowrap;
            }
        }
        .address-wrap {
            span {
                display: inline-block;
                &.el-popover__reference {
                    max-width: 100px;
                    overflow: hidden;
                    display: inline-block;
                    vertical-align: middle;
                    text-overflow: ellipsis;
                    cursor: pointer;
                }
            }

        }
    }
    .series {
        text-align: center;
        margin-top: 10px;
        font-size: 14px;
        .label {
            margin-left: 20px;
		}
		i {
			font-style: normal;
			font-weight: 700;
		}
    }
    .unfold-btn {
        position: absolute;
        right: 20px;
        bottom: 10px;
        color: #07c4a8;
        font-size: 14px;
        font-weight: 600;
    }
}
</style>