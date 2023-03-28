import request from '@/utils/request'

export default {
  createData(day) {
    return request({
      url: `/staservice/statistics/createStatisticsByDate/${day}`,
      method: 'post'
    })
  },
  getData(searchObj){
    return request({
      url: `/staservice/statistics/showEcharts/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
      method: 'get'
    })
  }
}

