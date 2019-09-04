import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import saphyrTubesModule from '@/store/traction/saphyr/tubes/index'

const saphyr = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    tubes: saphyrTubesModule
  }
}

export default saphyr