import * as types from '../mutation-types'
import {location} from '@/api/location'

const state = {
  lat: '', // 当前位置纬度
  lng: '', // 当前位置经度
  address: {
    address: '定位中...',
    lat: '',
    lng: '',
  },
  locationReady: false,   //定位是否完成
  deliveryAddress: {}
}

const getters = {
  address: state => state.address,
  locationReady: state => state.locationReady,
  deliveryAddress: state => state.deliveryAddress
}

const actions = {
  location({commit, state}, products) {
    location().then((response) => {
      let data = response.data.data;
      commit(types.RECORD_ADDRESS, {address: data.address, ...data.location}) //保存title 和 经纬度到VUEX中
      commit(types.LOCATION_READY, true);    //定位完成 拉取商店
    })
  },
  recordAddress({commit}, {address, location}) {
    commit(types.RECORD_ADDRESS, {address, ...location}) //保存title 和 经纬度到VUEX中
    commit(types.LOCATION_READY, true);    //定位完成 拉取商店
  },
  locationReady({commit}, boolean) {
    commit(types.LOCATION_READY, boolean);    //定位完成 拉取商店
  },
  recodeDeliveryAddress({commit}, address) {
    commit(types.RECORD_DELIVERY_ADDRESS, address);    //定位完成 拉取商店
  }
}

const mutations = {
  [types.RECORD_ADDRESS](state, address) {
    state.address = {...address}
  },
  //定位完成拉取附近餐馆
  [types.LOCATION_READY](state, boolean) {
    state.locationReady = boolean;
  },
  [types.RECORD_DELIVERY_ADDRESS](state, address) {
    state.deliveryAddress = {...address};
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
