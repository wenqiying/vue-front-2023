import request from '@/utils/request'

export default{
    addVideo(video){
        return request({
            url: `/eduservice/video/addVideo`,
            method: 'post',
            data: video
        })
    },
    getVideoInfo(videoId){
        return request({
            url: `/eduservice/video/getVideoById/${videoId}`,
            method: 'get'
        })
    },
    updateVideo(video){
        return request({
            url: `/eduservice/video/updateVideo`,
            method: 'post',
            data: video
        })
    },
    deleteVideo(videoId){
        return request({
            url: `/eduservice/video/deleteVideo/${videoId}`,
            method: 'delete'
        })
    },
    deleteAliyunVod(videoSourceId){
        return request({
            url: `/eduvod/video/removeAlyVideo/${videoSourceId}`,
            method: 'delete'
        })
    },
    
}