<template>
    <div class="app-container">
        <h2 style="text-align: center;">发布新课程</h2>
        <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="填写课程基本信息" />
            <el-step title="创建课程大纲" />
            <el-step title="最终发布" />
        </el-steps>
        <el-form label-width="120px">
            <el-form-item label="课程标题">
                <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写" />
            </el-form-item>
            <!-- 所属分类 TODO -->
            <el-form-item label="课程类别">
                <!-- <el-select v-model="courseInfo.subjectParentId" placeholder="请选择">
                    <el-option v-for="subject in subjectNestedList" :key="subject.id" :label="subject.title"
                        :value="subject.id" />
                </el-select> -->
                <el-cascader :options="subjectNestedList" :props="defaultProps" v-model="array" clearable></el-cascader>
            </el-form-item>

            <!-- 课程讲师 TODO -->
            <!-- 课程讲师 -->
            <el-form-item label="课程讲师">
                <el-select v-model="courseInfo.teacherId" placeholder="请选择">
                    <el-option v-for="teacher in teacherList" :key="teacher.id" :label="teacher.name"
                        :value="teacher.id" />
                </el-select>
            </el-form-item>

            <el-form-item label=" 总课时">
                <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right"
                    placeholder="请填写课程的总课时数" />
            </el-form-item>
            <!-- 课程简介-->
            <el-form-item label="课程简介">
                <tinymce :height="300" v-model="courseInfo.description" />
            </el-form-item>
            <!-- 课程封面 TODO -->
            <el-form-item label="课程封面">
                <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
                    :action="BASE_API + '/eduoss/fileoss'" class="avatar-uploader">
                    <img :src="courseInfo.cover" style="width:300px;height:120px">
                </el-upload>
            </el-form-item>

            <el-form-item label="课程价格">
                <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder=" " />
            </el-form-item>
            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce'

export default {
    components: { Tinymce },
    data() {
        return {
            saveBtnDisabled: false,
            init_instance_callback: "init",//富文本编辑器初始化回调
            courseInfo: {
                title: '',
                subjectId: '',
                subjectParentId: '',
                teacherId: '',
                lessonNum: 0,
                description: '',
                cover: '/static/mm.jpg',
                price: 0
            },
            courseId: '',
            //存放科目父ID和子ID的数组
            array: [],
            BASE_API: process.env.BASE_API, // 接口API地址
            teacherList: [],
            subjectNestedList: [],
            defaultProps: {
                children: 'children',
                label: 'title',
                value: 'id'
            }
        }
    },
    created() {
        this.loadTeacherList()
        this.loadSubjectNestedList()
        this.init()
    },
    watch: {
        $route(to, from) {
            this.init()
        }
    },
    methods: {
        init(instance) {
            if (this.$route.params && this.$route.params.id) {
                this.courseId = this.$route.params.id
                this.loadSubjectNestedList() //解决科目不回显问题
                this.getCourseInfo()
            } else {
                this.courseInfo = {
                    title: '',
                    subjectId: '',
                    subjectParentId: '',
                    teacherId: '',
                    lessonNum: 0,
                    description: '',
                    cover: '/static/mm.jpg',
                    price: 0
                }
                if (instance != null) {
                    tinyMCE.activeEditor.setContent('')
                }
                this.array = []
            }
        },
        getCourseInfo() {
            course.getCourseInfoById(this.courseId).then(res => {
                this.courseInfo = res.data.courseInfoVo
                this.array[0] = this.courseInfo.subjectParentId
                this.array[1] = this.courseInfo.subjectId
            })
        },
        //上传之前执行的方法
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        //上传成功执行的方法
        handleAvatarSuccess(res, file) {
            this.courseInfo.cover = res.data.url
        },
        loadSubjectNestedList() {
            subject.getSubjectList().then(res => {
                this.subjectNestedList = res.data.list
            })
        },
        saveCourseInfo() {
            course.addCourseInfo(this.courseInfo).then(res => {
                this.$message({
                    type: 'success',
                    message: '添加课程信息成功'
                })
                this.$router.push({ path: '/course/chapter/' + res.data.courseId })
            })
        },
        updateCourseInfo() {
            course.updateCourseInfo(this.courseInfo).then(res => {
                this.$message({
                    type: 'success',
                    message: '修改课程信息成功'
                })
                this.$router.push({ path: '/course/chapter/' + this.courseId })
            })
        },
        saveOrUpdate() {
            if (this.array !== undefined && this.array.length > 0) {
                this.courseInfo.subjectParentId = this.array[0]
                this.courseInfo.subjectId = this.array[1]
            }
            if (!this.courseInfo.id) {
                this.saveCourseInfo()
            } else {
                this.updateCourseInfo()
            }
        },
        loadTeacherList() {
            course.getTeacherList().then(res => {
                this.teacherList = res.data.items
            })
        }
    }
}
</script>
<style scoped>
.tinymce-container {
    line-height: 29px;
}
</style>