<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 老人信息表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-form :inline="true" :model="searchContent" class="demo-form-inline">
                    <el-form-item>
                    <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
                    </el-form-item>
                    <el-form-item label="ID查询">
                        <el-input v-model="searchContent.opId" placeholder="请输入ID" class="handle-input mr10"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名查询">
                        <el-input v-model="searchContent.opName" placeholder="请输入姓名" class="handle-input mr10"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    </el-form-item>
                    <el-form-item>
                    <el-button type="success" icon="el-icon-edit" @click="addVisible = true">添加</el-button>
                    </el-form-item>
                </el-form>

            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange">

                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="opId" label="老人ID"></el-table-column>
                <el-table-column prop="opName" label="体检单"></el-table-column>
                <el-table-column prop="opAge" label="体检医院"></el-table-column>
                <el-table-column prop="opSex" label="体检类型"></el-table-column>
                <el-table-column prop="opNative" label="体检时间"></el-table-column>
                <el-table-column prop="opAddress" label="体检负责人"></el-table-column>
                <el-table-column prop="" label="记录人">
                    <template slot-scope="scope">
                        <img :src="require(''+scope.row.opPhoto)" width="50" height="50"/>
                    </template>
                </el-table-column>
                <el-table-column prop="opCard" label="备注"></el-table-column>
                <el-table-column prop="opPhone" label="备注"></el-table-column>
                <el-table-column prop="opBirthday" label="备注"></el-table-column>
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
                    <el-form-item label="姓名">
                        <el-input v-model="dept.opName"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="dept.opAge"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="dept.opSex" placeholder="请选择">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="籍贯">
                        <el-input v-model="dept.opNative"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="dept.opAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="照片">
                        <el-input v-model="dept.opPhoto"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号">
                        <el-input v-model="dept.opCard"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input v-model="dept.opPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="生日">
                        <el-date-picker v-model="dept.opBirthday" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
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
                <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-form ref="form" :model="depts" label-width="80px">
                    <el-form-item label="老人ID">
                        <el-input v-model="depts.opId"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="depts.opName"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="depts.opAge"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="depts.opSex" placeholder="请选择">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="籍贯">
                        <el-input v-model="dept.opNative"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="depts.opAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="照片">
                        <img src="E:\临时文件\照片\墙纸\欧美绝色尤物桌面壁纸 - 3.jpg"/>
                    </el-form-item>
                    <el-form-item label="身份证号">
                        <el-input v-model="depts.opCard"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input v-model="depts.opPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="生日">
                        <el-date-picker v-model="depts.opBirthday" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
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
                searchContent:{
                    opId:'',
                    opName:'',
                },
                editVisible: false,
                dialogAdd:false,
                dept:{
                    opName:'',
                    opAge:'',
                    opSex:'',
                    opNative:'',
                    opAddress:'',
                    opPhoto:'',
                    opCard:'',
                    opPhone:'',
                    opBirthday:''
                },
                depts:{
                    opId:'',
                    opName:'',
                    opAge:'',
                    opSex:'',
                    opNative:'',
                    opAddress:'',
                    opPhoto:'',
                    opCard:'',
                    opPhone:'',
                    opBirthday:''

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
                    .get('/opeople')
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
                    opName:'',
                    opAge:'',
                    opSex:'',
                    opNative:'',
                    opAddress:'',
                    opPhoto:'',
                    opCard:'',
                    opPhone:'',
                    opBirthday:''
                }
            },
            onSubmit(){
                //修改

                this.$axios.put('/opeople/'+this.dept.opId,this.dept
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
                // alert(this.depts.opBirthday)
                this.$axios.post('/opeople/add',this.depts)
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
            // 触发搜索按钮
            handleSearch() {
                if (/^\d+$/.test(this.searchContent.trim())) {
                    this.$axios.get('/opeople/' + this.searchContent.trim())
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
                this.$axios.delete('/opeople/' + row.opId)
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
        width: 200px;
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
