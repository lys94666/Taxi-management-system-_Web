<template>
    <div class="main" style="height: 100%;">

        <div>
            <el-input v-model="input" style="width: 250px; margin-top:5px ;margin-bottom: 5px;margin-right:5px;"></el-input>
            <el-select v-model="value" placeholder="请选择" style="width: 100px;">
                <el-option v-for="item in genders" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>

            <el-button type="primary" @click="loadGet" style="margin-left:5px ;">搜索</el-button>
            <el-button @click.native.prevent="push" type="success" style="margin-right: 5px;">
                新增
            </el-button>
            <el-dialog title="提示" :visible.sync="dialogVisiblepush" width="30%">
                <el-form ref="editForm" :model="editForm" label-width="80px">
                    <el-form-item label="姓名">
                        <el-input v-model="editForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="editForm.age"></el-input>
                    </el-form-item>
                    <el-form-item label="级别">
                        <el-select v-model="editForm.grade">
                            <el-option v-for="item in grades" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="editForm.gender">
                            <el-option v-for="item in genders" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="车牌号">
                        <el-input v-model="editForm.carNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="editForm.phone"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisiblepush = false">取 消</el-button>
                    <el-button type="primary" @click.prevent.native="addEmployee">确 定</el-button>
                </span>
            </el-dialog>
        </div>

        <el-table :data="tableData" style="width: 100% ;overflow: auto;" border>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="120">
            </el-table-column>
            <el-table-column prop="grade" label="级别" width="180">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.grade === 1 ? 'danger' : (scope.row.grade === 2 ? 'primary' : 'success')"
                        disable-transitions effect="dark">
                        {{ scope.row.grade === 1 ? '金牌车手' : (scope.row.grade === 2 ? '银牌车手' : '铜牌车手') }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="120">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.gender === 1 ? 'primary' : 'success'" disable-transitions>
                        {{ scope.row.gender === 1 ? '男' : '女' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="carNumber" label="车牌号" width="220">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="220">
            </el-table-column>
            <el-table-column label="操作" width="240">
                <template slot-scope="scope">
                    <el-button @click.native.prevent="edit(scope.row)" type="primary" size="small"
                        style="margin-right: 5px;">
                        编辑
                    </el-button>
                    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                        <el-form ref="scope.row" :model="addForm" label-width="80px">
                            <el-form-item label="姓名">
                                <el-input v-model="addForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="年龄">
                                <el-input v-model="addForm.age"></el-input>
                            </el-form-item>
                            <el-form-item label="级别">
                                <el-select v-model="addForm.grade">
                                    <el-option v-for="item in grades" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-select v-model="addForm.gender">
                                    <el-option v-for="item in genders" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="车牌号">
                                <el-input v-model="addForm.carNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号">
                                <el-input v-model="addForm.phone"></el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click.prevent.native="updated">确 定</el-button>
                        </span>
                    </el-dialog>
                    <el-button @click.native.prevent="deleteRow(scope.row.id)" type="danger" size="small">
                        移除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[5, 10, 15, 20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    methods: {
        updated() {
            this.dialogVisible = !this.dialogVisible;
            axios({
                baseURL: 'http://localhost:7070',
                method: 'post',
                url: '/employee/update',
                data: this.addForm
            }).then(res => {
                if (res.data.code == 1)
                    this.$message.success("修改成功!!")
                else
                    this.$message.error("修改失败")
            })
        },
        addEmployee() {
            this.dialogVisiblepush = !this.dialogVisiblepush;
            axios({
                method: 'post',
                url: 'http://localhost:7070/employee/add',
                data: this.editForm
            }).then(res => {
                if (res.data.code == 1)
                    this.$message.success("添加成功!!")
                else
                    this.$message.error("添加失败")
            })
        },
        push() {
            this.editForm = {};
            this.dialogVisiblepush = !this.dialogVisiblepush;
        },
        edit(val) {
            this.dialogVisible = !this.dialogVisible;
            this.addForm = val;
        },
        loadGet() {
            axios({
                method: 'post',
                url: 'http://localhost:7070/employee/list',
                data: {
                    page: parseInt(this.currentPage),
                    pageSize: parseInt(this.pageSize),
                    name: this.input,
                    gender: parseInt(this.value)
                },
            }).then(res => (
                console.log(res),
                this.tableData = res.data.records,
                this.total = res.data.total
            ))
        },
        handleSizeChange(val) {
            this.currentPage = 1;
            this.pageSize = val;
            this.loadGet();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.loadGet();
        },
        deleteRow(val) {
            axios({
                method: 'delete',
                url: 'http://localhost:7070/employee/delete',
                data: {
                    id: val
                }
            }).then(res => {
                console.log(res.data.code);
                if (res.data.code == 1) {
                    this.$message.success("操作成功");
                    this.loadGet();
                }
                else
                    this.$message.error("操作失败");
            })
        }
    },
    beforeMount() {
        this.loadGet();
    },
    data() {
        return {
            dialogVisiblepush: false,
            dialogVisible: false,
            total: 100,
            input: null,
            currentPage: 1,
            pageSize: 5,
            editForm: {
                name: '',
                age: '',
                gender: '',
                age: '',
                grade: ''
            },
            grade: null,
            tableData: [{
                id: null,
                name: null,
                age: null,
                grade: null,
                gender: null,
                carNumber: null,
                phone: null,
                total: 100
            }],
            addForm: {

            },
            genders: [
                {
                    value: '1',
                    label: "男"
                }, {
                    value: '2',
                    label: "女"
                }
            ],
            grades: [
                {
                    value: '1',
                    label: "金牌车手"
                }, {
                    value: '2',
                    label: "银牌车手"
                }, {
                    value: '3',
                    label: "铜牌车手"
                }
            ],
            value: null
        }
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

.main {
    height: 100%;
    width: 100%;
    display: block;
}
</style>