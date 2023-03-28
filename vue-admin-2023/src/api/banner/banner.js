import request from '@/utils/request'

export default {
    getBannerPage(page, limit) {
        return request({
            url: `/educms/banneradmin/pageBanner/${page}/${limit}`,
            method: 'get'
        })
    },
    saveOrUpdateBanner(banner) {
        return request({
            url: `/educms/banneradmin/saveOrUpdateBanner`,
            method: 'post',
            data: banner
        })
    },
    deleteBannerById(bannerId) {
        return request({
            url: `/educms/banneradmin/deleteBanner/${bannerId}`,
            method: 'delete'
        })
    },
    getBannerById(bannerId) {
        return request({
            url: `/educms/banneradmin/getBannerById/${bannerId}`,
            method: 'get',
        })
    },
}