<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="delAllSelection"
                >批量删除</el-button>
                <el-input v-model="searchContent" placeholder="ID" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="success" icon="el-icon-edit" @click="addVisible = true">添加</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="cbId" label="收费单号" align="center"></el-table-column>
                <el-table-column prop="opId" label="老人编号"></el-table-column>
                <el-table-column prop="cbTime" label="收费时间"></el-table-column>
                <el-table-column label="预计收费">
                    <template slot-scope="scope">￥{{scope.row.chargEsti}}/月</template>
                </el-table-column>
                <el-table-column prop="payMethod" label="支付方式"></el-table-column>
                <el-table-column prop="noteTaker" label="记录员"></el-table-column>
                <el-table-column prop="cbRem" label="备注"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="success"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index,scope.row)"
                        >编辑</el-button>
                        <el-button
                                type="danger"
                                icon="el-icon-delete"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div style="display:flex;justify-content:flex-end ">
                <el-pagination
                        background
                        layout="sizes, prev, pager, next, jumper, ->, total, slot"
                        @current-change="currentChange"
                        @size-change="sizeChange"
                        :total="total">
                </el-pagination>
            </div>


            <!-- 编辑弹出框 -->
            <el-dialog
                    title="编辑"
                    :append-to-body='true'
                    :visible.sync="dialogVisible"
                    width="50%"
                    :before-close="handleClose">
                <el-form ref="form" :model="dept" label-width="80px">
                    <el-form-item label="收费单号">
                        <el-input v-model="dept.cbId"></el-input>
                    </el-form-item>
                    <el-form-item label="老人编号">
                        <el-input v-model="dept.opId"></el-input>
                    </el-form-item>
                    <el-form-item label="收费时间">
                        <el-date-picker v-model="dept.cbTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="预计收费">
                        <el-input v-model="dept.chargEsti"></el-input>
                    </el-form-item>
                    <el-form-item label="支付方式">
                        <el-select v-model="dept.payMethod" placeholder="请选择">
                            <el-option label="微信" value="微信"> </el-option>
                            <el-option label="支付宝" value="支付宝"></el-option>
                            <el-option label="现金" value="现金"></el-option>
                            <el-option label="银行卡" value="银行卡"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="记录员">
                        <el-input v-model="dept.noteTaker"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" autosize placeholder="请输入内容" v-model="dept.cbRem">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="medium" @click="cancel()">取 消</el-button>
                        <el-button type="primary" @click="onSubmit">提 交</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog
                    title="添加"
                    :append-to-body='true'
                    :visible.sync="addVisible"
                    width="50%"
                    :before-close="handleClose">
                <el-form ref="form" :model="depts" label-width="80px">
                    <el-form-item label="收费单号">
                        <el-input v-model="depts.cbId"></el-input>
                    </el-form-item>
                    <el-form-item label="老人编号">
                        <el-input v-model="depts.opId"></el-input>
                    </el-form-item>
                    <el-form-item label="收费时间">
                        <el-date-picker v-model="depts.cbTime" type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="预计收费">
                        <el-input v-model="depts.chargEsti"></el-input>
                    </el-form-item>
                    <el-form-item label="支付方式">
                        <el-select v-model="depts.payMethod" placeholder="请选择">
                            <el-option label="微信" value="微信"> </el-option>
                            <el-option label="支付宝" value="支付宝"></el-option>
                            <el-option label="现金" value="现金"></el-option>
                            <el-option label="银行卡" value="银行卡"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="记录员">
                        <el-input v-model="depts.noteTaker"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" autosize placeholder="请输入内容" v-model="depts.cbRem">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="medium" @click="cancel()">取 消</el-button>
                        <el-button type="primary" @click="addsumit">添 加</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ChargeBill',
        data() {
            return {

                tableData: [],
                searchContent:'',
                editVisible: false,
                dept:{
                    cbId:'',
                    opId:'',
                    cbTime:'',
                    chargEsti:'',
                    chargAct:'',
                    payMethod:'',
                    noteTaker:'',
                    cbRem:''
                },
                depts:{
                    cbId:'',
                    opId:'',
                    cbTime:'',
                    chargEsti:'',
                    chargAct:'',
                    payMethod:'',
                    noteTaker:'',
                    cbRem:''
                },
                total:0,
                dialogVisible:false,
                addVisible:false,
                size:10,//分页每页10条数据
                page:1,//从第一页开始

            };
        },
        created() {
            this.getData();
        },
        methods: {

            currentChange(currentChange){
                this.page=currentChange
                this.initAllDept()
            },
            sizeChange(sizeChange){
                this.size=sizeChange
                this.initAllDept()
            },
            addsumit(){
                this.$axios.post('/chargeBill/add',this.depts)
                    .then(successResponse => {
                        if(successResponse.data.code===20000){
                            this.addVisible = false;
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                        }
                        else{
                            this.$message.error("添加失败！")
                        }
                    })
                    .catch(failResponse => { this.$message.error("添加失败！详情："+failResponse)})
            },
            handleEdit(index, row) {
                this.dialogVisible = true;
                this.dept = Object.assign({}, row); //这句是关键！！！
            },
            handleClose(done) {
                done()
            },
            cancel() {
                this.dialogVisible = false;
                this.emptyUserData();
            },
            emptyUserData(){//清空表单
                this.dept = {
                    cbId:'',
                    opId:'',
                    cbTime:'',
                    chargEsti:'',
                    chargAct:'',
                    payMethod:'',
                    noteTaker:'',
                    cbRem:''
                }
                this.depts = {
                    cbId:'',
                    opId:'',
                    cbTime:'',
                    chargEsti:'',
                    chargAct:'',
                    payMethod:'',
                    noteTaker:'',
                    cbRem:''
                }
            },
            onSubmit(){
                //修改
                //调用put请求
                const requestData = {
                    bedId: this.dept.bedId,
                    roomId: this.dept.roomId,
                    bedPrice: this.dept.bedPrice,
                    bedOccupy: this.dept.bedOccupy
                };
                this.$axios.put('/bed/'+requestData.bedId,requestData
                ).then(response =>
                {
                    this.$message({
                        type: 'success',
                        message: response.data.message

                    });
                    this.getData()
                }).catch(error =>
                {
                    this.$message({
                        type: 'success',
                        message: '更新失败!'
                    });
                    console.log(error);
                });
                //this.getData()
                this.tableData.reverse()
                this.dialogVisible = false;

            },

            // 获取 easy-mock 的模拟数据
            getData() {
                this.$axios
                    .get('/chargeBill/findAll')
                    .then(response => {
                        console.log(response)
                        this.tableData = response.data.data;
                        this.$forceUpdate()
                    })
            },
            // 触发搜索按钮
            handleSearch() {
                if (/^\d+$/.test(this.searchContent.trim())) {
                    this.$axios.get('/chargeBill/' + this.searchContent.trim())
                        .then((response) => {
                            console.log(response.data.data);
                            //请求返回的内容是单个，但是表需要数组，所以单个对象转化为数组
                            this.tableData = [];
                            this.tableData.push(response.data.data);
                            this.disablePage = true;
                            console.log(this.tableData)
                            this.$forceUpdate();
                        })
                        .catch((error) => {
                            console.log(error);
                            alert('访问失败');
                        })
                } else if (this.searchContent === '') {
                    this.getData();
                } else {
                    this.$message.error("非法输入");
                }
            },
            // 删除操作
            deleteClick(row) {
                this.$axios.delete('/chargeBill/' + row.cbId)
                    .then((response) => {
                        if(response.data.code===20000){
                            this.$message.success('删除成功');
                            this.tableData.splice(index, 1);
                        }else{
                            this.$message.error('删除失败');
                        }
                        this.$forceUpdate();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            },
            handleDelete(index, row) {
                let _row = row
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.deleteClick(_row);

                    })
                    .catch(() => {
                    });
            },

            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            delAllSelection() {
                const length = this.multipleSelection.length;
                let str = '';
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].bedId + ' ';
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
            },


        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>

