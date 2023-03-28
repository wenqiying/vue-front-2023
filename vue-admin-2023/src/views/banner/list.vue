<template>
    <div class="app-container">
        <!-- 表格 -->
        <el-table v-loading="listLoading" :data="bannerList" element-loading-text="数据加载中" border fit highlight-current-row>
            <el-table-column label="序号" width="70" align="center">
                <template slot-scope="scope">
                    {{ (page - 1) * limit + scope.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column prop="title" label="banner名称" width="80" />
            <el-table-column prop="imageUrl" label="banner地址" />
            <el-table-column prop="gmtCreate" label="添加时间" width="160" />
            <el-table-column prop="sort" label="排序" width="60" />
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <router-link :to="'/banner/edit/' + scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination :current-page="page" :page-size="limit" :total="total"
            style="padding: 30px 0; text-align: center;" layout="total, prev, pager, next, jumper"
            @current-change="getBannerList" />
    </div>
</template>

<script>

import banner from '@/api/banner/banner'
export default {
    data() {
        return {
            listLoading: true,
            bannerList: [],
            total: 0,
            page: 1,
            limit: 10,
        }
    },
    created() {
        this.getBannerList()
    },
    methods: {
        getBannerList(page = 1) {
            this.listLoading = true
            this.page = page
            banner.getBannerPage(this.page, this.limit)
                .then(res => {
                    this.bannerList = res.data.items
                    this.total = res.data.total
                    this.listLoading = false
                })
                .catch(error => {
                    console.log(error)
                })
        },
        removeDataById(id) {
            this.$confirm('此操作将永久删除该Banner, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                banner.deleteBannerById(id).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getBannerList()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
    }
}
</script>