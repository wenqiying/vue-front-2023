<template>
    <div class="app-container">
        <el-form label-width="120px">
            <el-form-item label="Banner名称">
                <el-input v-model="banner.title" />
            </el-form-item>
            <el-form-item label="Banner排序">
                <el-input-number v-model="banner.sort" controls-position="right" :min="0" />
            </el-form-item>
            <el-form-item label="BannerLink">
                <el-input v-model="banner.linkUrl" />
            </el-form-item>
            <!-- Banner上传 -->
            <el-form-item label="Banner上传">
                <!-- 头衔缩略图 -->
                <pan-thumb :image="String(banner.imageUrl)" />
                <!-- 文件上传按钮 -->
                <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow = true">上传Banner</el-button>
                <!--
                    v-show：是否显示上传组件
                    :key：类似于id，如果一个页面多个图片上传控件，可以做区分
                    :url：后台上传的url地址
                    @close：关闭上传组件
                    @crop-upload-success：上传成功后的回调 -->
                <image-cropper v-show="imagecropperShow" 
                               :width="1200" 
                               :height="480" 
                               :key="imagecropperKey"
                               :url="BASE_API + '/eduoss/fileoss'" 
                               field="file" 
                               @close="close"
                    @crop-upload-success="cropSuccess" />
            </el-form-item>

            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import banner from '@/api/banner/banner'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
    components: { ImageCropper, PanThumb },
    data() {
        return {
            banner: {},
            //保存按钮是否禁用
            saveBtnDisabled: false,
            imagecropperShow: false,
            imagecropperKey: 0,//上传组件Key值
            BASE_API: process.env.BASE_API,
        }
    },
    created() {
        this.init()
    },
    watch: {
        $route(to, from) {
            this.init()
        }
    },
    methods: {
        close(){
            this.imagecropperShow = false
            this.imagecropperKey = this.imagecropperKey+1
        },
        cropSuccess(data){
            this.imagecropperShow = false
            this.banner.imageUrl = data.url
            this.imagecropperKey = this.imagecropperKey+1
        },
        init() {
            if (this.$route.params && this.$route.params.id) {
                const id = this.$route.params.id
                this.getInfo(id)
            } else {
                this.banner = {}
                this.banner.imageUrl = "https://wqy-edu.oss-cn-beijing.aliyuncs.com/glxy.jpeg"
            }
        },
        getInfo(id) {
            banner.getBannerById(id).then(res => {
                this.banner = res.data.banner
            })
        },
        saveOrUpdate() {
            banner.saveOrUpdateBanner(this.banner).then(res => {
                this.$message({
                    type: "success",
                    message: "成功！"
                });
                this.$router.push({ path: '/banner/list' })
            })
        },
    },
}
</script>
<style scoped>
.pan-thumb {
  width: 1200px;
  height: 480px;
  background-size: 100%;
  overflow: hidden;
  position: absolute;
  transform-origin: 95% 40%;
  transition: all 0.3s ease-in-out;
}
</style>