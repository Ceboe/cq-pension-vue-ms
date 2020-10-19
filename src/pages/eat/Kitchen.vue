<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i>
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
                <el-table-column prop="kid" label="记录编号" align="center"></el-table-column>
                <el-table-column prop="time" label="制作时间"></el-table-column>
                <el-table-column prop="dishNiame" label="菜品名"></el-table-column>
                <el-table-column prop="dishMake" label="菜品组成"></el-table-column>
                <el-table-column prop="dishMix" label="菜品配料"></el-table-column>
                <el-table-column prop="cooker" label="厨师"></el-table-column>
                <el-table-column prop="charge" label="厨房负责人"></el-table-column>
                <el-table-column prop="recorder" label="记录人"></el-table-column>
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
                    :visible.sync="editVisible"
                    width="50%"
                    :before-close="handleClose">
                <el-form ref="form" :model="dept" label-width="80px">
                    <el-form-item label="记录编号">
                        <el-input v-model="dept.kId"></el-input>
                    </el-form-item>
                    <el-form-item label="制作时间">
                        <el-date-picker v-model="dept.time" type="datetime" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="菜品名称">
                        <el-input v-model="dept.dishName" placeholder="如：番茄炒蛋"></el-input>
                    </el-form-item>
                    <el-form-item label="菜品组成">
                        <el-input v-model="dept.dishMake"  placeholder="如：番茄，鸡蛋"></el-input>
                    </el-form-item>
                    <el-form-item label="菜品配料">
                        <el-input v-model="dept.dishMix"  placeholder="如：盐，白砂糖"></el-input>
                    </el-form-item>
                    <el-form-item label="厨师">
                        <el-input v-model="dept.cooker"></el-input>
                    </el-form-item>
                    <el-form-item label="厨房负责人">
                        <el-input v-model="dept.charge"></el-input>
                    </el-form-item>
                    <el-form-item label="记录员">
                        <el-input v-model="dept.noteTaker"></el-input>
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
                    <el-form-item label="记录编号">
                        <el-input v-model="depts.kId"></el-input>
                    </el-form-item>
                    <el-form-item label="制作时间">
                        <el-date-picker v-model="depts.time" type="datetime" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="菜品名称">
                        <el-input v-model="depts.dishName" ></el-input>
                    </el-form-item>
                    <el-form-item label="菜品组成">
                        <el-input v-model="depts.dishMake"></el-input>
                    </el-form-item>
                    <el-form-item label="菜品配料">
                        <el-input v-model="depts.dishMix"></el-input>
                    </el-form-item>
                    <el-form-item label="厨师">
                        <el-input v-model="depts.cooker"></el-input>
                    </el-form-item>
                    <el-form-item label="厨房负责人">
                        <el-input v-model="depts.charge"></el-input>
                    </el-form-item>
                    <el-form-item label="记录员">
                        <el-input v-model="depts.noteTaker"></el-input>
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
                dept:{
                    kId:'',
                    time:'',
                    dishName:'',
                    dishMake:'',
                    dishMix:'',
                    cooker:'',
                    charge:'',
                    recorder:''
                },
                depts:{
                    kId:'',
                    time:'',
                    dishName:'',
                    dishMake:'',
                    dishMix:'',
                    cooker:'',
                    charge:'',
                    recorder:''
                },
                total:0,
                editVisible:false,
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
                this.editVisible = true;
                this.dept = Object.assign({}, row); //这句是关键！！！
            },
            handleClose(done) {
                done()
            },
            cancel() {
                this.editVisible = false;
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
                this.$axios.put('/kitchen/'+this.dept.kId,this.dept
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
                    .get('/kitchen')
                    .then(response => {
                        console.log(response)
                        this.tableData = response.data.data;
                        this.$forceUpdate()
                    })
            },
            // 触发搜索按钮
            handleSearch() {
                if (/^\d+$/.test(this.searchContent.trim())) {
                    this.$axios.get('/kitchen/' + this.searchContent.trim())
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
                this.$axios.delete('/kitchen/' + row.kId)
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
                    str += this.multipleSelection[i].kId + ' ';
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

