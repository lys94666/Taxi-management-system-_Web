<template>
    <div class="main" style="height: 100%;">

        <div>
            <el-input v-model="input" style="width: 250px; margin-top:5px ;margin-bottom: 5px;margin-right:5px;"></el-input>
            <el-select v-model="value" placeholder="请选择" style="width: 100px;">
                <el-option v-for="item in carStatus" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>

            <el-button type="primary" @click="loadGet" style="margin-left:5px ;">搜索</el-button>
            <el-button @click.native.prevent="push" type="success" style="margin-right: 5px;">
                新增
            </el-button>
            <el-dialog title="提示" :visible.sync="dialogVisiblepush" width="30%">
                <el-form ref="editForm" :model="editForm" label-width="80px">
                    <el-form-item label="车牌号">
                        <el-input v-model="editForm.carNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="出厂时间">
                        <el-input v-model="editForm.year"></el-input>
                    </el-form-item>
                    <el-form-item label="汽车状态">
                        <el-select v-model="editForm.status">
                            <el-option v-for="item in carStatus" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="制造商">
                        <el-input v-model="editForm.make"></el-input>
                    </el-form-item>
                    <el-form-item label="燃料类型">
                        <el-input v-model="editForm.fuelType"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisiblepush = false">取 消</el-button>
                    <el-button type="primary" @click.prevent.native="addEmployee">确 定</el-button>
                </span>
            </el-dialog>
        </div>

        <el-table :data="tableData" style="width: 100% ;overflow: auto;" border>
            <el-table-column prop="carNumber" label="车牌号" width="180">
            </el-table-column>
            <el-table-column prop="make" label="汽车制造商" width="180">
            </el-table-column>
            <el-table-column prop="status" label="汽车状态" width="180">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status == 1 ? 'danger' : (scope.row.status == 2 ? 'primary' : 'success')"
                        disable-transitions effect="dark">
                        {{ scope.row.status == 1 ? '维修中' : (scope.row.status == 2 ? '空闲中' : '使用中') }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="year" label="出厂时间" width="120">
            </el-table-column>
            <el-table-column prop="fuelType" label="燃料类型" width="200">
            </el-table-column>
            <el-table-column label="操作" width="240">
                <template slot-scope="scope">
                    <el-button @click.native.prevent="edit(scope.row)" type="primary" size="small"
                        style="margin-right: 5px;">
                        编辑
                    </el-button>
                    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                        <el-form ref="scope.row" :model="addForm" label-width="80px">
                            <el-form-item label="车牌号">
                                <el-input v-model="addForm.carNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="出厂时间">
                                <el-input v-model="addForm.year"></el-input>
                            </el-form-item>
                            <el-form-item label="汽车状态">
                                <el-select v-model="addForm.status">
                                    <el-option v-for="item in carStatus" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="制造商">
                                <el-input v-model="addForm.make"></el-input>
                            </el-form-item>
                            <el-form-item label="燃料类型">
                                <el-input v-model="addForm.fuelType"></el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click.prevent.native="updated">确 定</el-button>
                        </span>
                    </el-dialog>
                    <el-button @click.native.prevent="deleteRow(scope.row.carNumber)" type="danger" size="small">
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
                url: '/car/update',
                data: this.addForm
            }).then(res => {
                if (res.code == 1)
                    this.$message.success("修改成功!!")
                else
                    this.$message.error("修改失败")
            })
        },
        addEmployee() {
            this.dialogVisiblepush = !this.dialogVisiblepush;
            axios({
                method: 'post',
                url: 'http://localhost:7070/car/add',
                data: this.editForm
            }).then(res => {
                if (res.code == 1) {
                    this.$message.success("添加成功!!")
                    this.loadGet();
                }
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
                url: 'http://localhost:7070/car/list',
                data: {
                    page: parseInt(this.currentPage),
                    pageSize: parseInt(this.pageSize),
                    carNumber: this.input,
                    status: parseInt(this.value)
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
                url: 'http://localhost:7070/car/delete',
                data: {
                    carNumber: val
                }
            }).then(res => {
                console.log(res.code);
                if (res.code == 1) {
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
                carNumber: "",
                status: 1,
                make: "",
                year: "",
                fuelType: ""
            },
            grade: null,
            tableData: [{
                carNumber: "1",
                status: 1,
                make: "3",
                year: "4",
                fuelType: "5"
            }],
            addForm: {

            },
            carStatus: [
                {
                    value: '1',
                    label: '维修中'
                },
                {
                    value: '2',
                    label: '空闲中'
                },
                {
                    value: '3',
                    label: '使用中'
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