<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 体检报告表
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
                <el-table-column prop="haId" label="疾病ID" width="65" align="center"></el-table-column>
                <el-table-column prop="opId" label="老人ID"></el-table-column>
                <el-table-column prop="haNum" label="体检单"></el-table-column>
                <el-table-column prop="haType" label="体检医院"></el-table-column>
                <el-table-column prop="haTime" label="体检类型"></el-table-column>
                <el-table-column prop="haLevel" label="体检时间"></el-table-column>
                <el-table-column prop="liveAss" label="体检负责人"></el-table-column>
                <el-table-column prop="haPerson" label="记录人"></el-table-column>
                <el-table-column prop="haEye" label="备注"></el-table-column>
                <el-table-column prop="haEar" label="备注"></el-table-column>
                <el-table-column prop="haMood" label="备注"></el-table-column>
                <el-table-column prop="haMove" label="备注"></el-table-column>
                <el-table-column prop="haTalk" label="备注"></el-table-column>
                <el-table-column prop="haLimbs" label="备注"></el-table-column>
                <el-table-column prop="haDaily" label="备注"></el-table-column>
                <el-table-column prop="haEat" label="备注"></el-table-column>
                <el-table-column prop="haMed" label="备注"></el-table-column>
                <el-table-column prop="haRec" label="备注"></el-table-column>


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
                    <el-form-item label="老人ID">
                        <el-input v-model="dept.opId"></el-input>
                    </el-form-item>
                    <el-form-item label="疾病">
                        <el-input v-model="dept.haNum"></el-input>
                    </el-form-item>
                    <el-form-item label="病发时间">
                        <el-input v-model="dept.haType"></el-input>
                    </el-form-item>
                    <el-form-item label="就诊机构">
                        <el-input v-model="dept.haTime"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="dept.haLevel"></el-input>
                    </el-form-item>
                    <el-form-item label="注意事项">
                        <el-input v-model="dept.liveAss"></el-input>
                    </el-form-item>
                    <el-form-item label="记录人">
                        <el-input v-model="dept.haPerson"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="dept.haEye"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="dept.haEar"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="dept.haMood"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="dept.haMove"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="dept.haTalk"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="dept.haLimbs"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="dept.haDaily"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="dept.haEat"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="dept.haMed"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="dept.haRec"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button size="medium" @click="cancel()">取 消</el-button>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
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
                    <el-form-item label="疾病记录ID">
                        <el-input v-model="depts.haId"></el-input>
                    </el-form-item>
                    <el-form-item label="老人ID">
                        <el-input v-model="depts.opId"></el-input>
                    </el-form-item>
                    <el-form-item label="疾病">
                        <el-input v-model="depts.haNum"></el-input>
                    </el-form-item>
                    <el-form-item label="病发时间">
                        <el-input v-model="depts.haType"></el-input>
                    </el-form-item>
                    <el-form-item label="就诊机构">
                        <el-input v-model="dept.haTime"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="depts.haLevel"></el-input>
                    </el-form-item>
                    <el-form-item label="注意事项">
                        <el-input v-model="depts.liveAss"></el-input>
                    </el-form-item>
                    <el-form-item label="记录人">
                        <el-input v-model="depts.haPerson"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="depts.haEye"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="depts.haEar"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="depts.haMood"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="depts.haMove"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="depts.haTalk"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="depts.haLimbs"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="depts.haDaily"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="depts.haEat"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="depts.haMed"></el-input>
                    </el-form-item>
                    <el-form-item label="痊愈时间">
                        <el-input v-model="depts.haRec"></el-input>
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
        data() {
            return {

                tableData: [],
                searchContent:'',
                editVisible: false,
                dialogAdd:false,
                dept:{
                    opId:'',
                    haNum:'',
                    haType:'',
                    haTime:'',
                    haLevel:'',
                    liveAss:'',
                    haPerson:'',
                    haEye:'',
                    haEar:'',
                    haMood:'',
                    haMove:'',
                    haTalk:'',
                    haLimbs:'',
                    haDaily:'',
                    haEat:'',
                    haMed:'',
                    haRec:''
                },
                depts:{
                    haId:'',
                    opId:'',
                    haNum:'',
                    haType:'',
                    haTime:'',
                    haLevel:'',
                    liveAss:'',
                    haPerson:'',
                    haEye:'',
                    haEar:'',
                    haMood:'',
                    haMove:'',
                    haTalk:'',
                    haLimbs:'',
                    haDaily:'',
                    haEat:'',
                    haMed:'',
                    haRec:''

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

            // 获取表数据
            getData() {
                this.$axios
                    .get('/healAss')
                    .then(response => {
                        console.log(response);
                        this.tableData = response.data.data;
                        this.$forceUpdate()
                    })
            },


            handleEdit(index, row) {
                this.dialogVisible = true;
                this.dept = Object.assign({}, row); //这句是关键！！！
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            cancel() {
                this.dialogVisible = false;
                this.addVisible = false;

                this.emptyUserData();
            },
            emptyUserData(){
                this.dept = {
                    opId:'',
                    haNum:'',
                    haType:'',
                    haTime:'',
                    haLevel:'',
                    liveAss:'',
                    haPerson:'',
                    haEye:'',
                    haEar:'',
                    haMood:'',
                    haMove:'',
                    haTalk:'',
                    haLimbs:'',
                    haDaily:'',
                    haEat:'',
                    haMed:'',
                    haRec:''
                }
            },
            onSubmit(){
                //修改

                this.$axios.put('/healAss/'+this.dept.haId,this.dept
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

            addsumit(){
                console.log(this.depts)
                this.$axios.post('/healAss/add',this.depts)
                    .then(successResponse => {
                        if(successResponse.data.code===20000){
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            this.getData()
                            this.addVisible = false;
                        }
                        else{
                            this.$message.error("添加失败！")
                        }
                    })
                    .catch(failResponse => { this.$message.error("添加失败！详情："+failResponse)})
            },



            // 获取 easy-mock 的模拟数据
            getData() {
                this.$axios
                    .get('/healAss')
                    .then(response => {
                        console.log(response);
                        this.tableData = response.data.data;
                        this.$forceUpdate()
                    })
            },
            // 触发搜索按钮
            handleSearch() {
                if (/^\d+$/.test(this.searchContent.trim())) {
                    this.$axios.get('/healAss/' + this.searchContent.trim())
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
                this.$axios.delete('/healAss/' + row.haId)
                    .then((response) => {
                        console.log(response);
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
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
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
