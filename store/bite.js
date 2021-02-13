import { convertFromUnixTime } from '@/services/index'
export const state = () => ({
  bites: [],
  pendingBites: [],
  openBites: [],
  closedBites: [],
  biteDetail: [],
  biteProfile: [], /* Deprecated 26 Jan 2021 */
  bitesDashboard: null,
  biteSettings: null, /* Deprecated 26 Jan 2021 */
});

export const mutations = {
  setBites(state, payload) {
    state.bites = payload;
  },
  setPendingBites(state, payload) {
    state.pendingBites = payload;
  },
  setOpenBites(state, payload) {
    state.openBites = payload;
  },
  setClosedBites(state, payload) {
    state.closedBites = payload;
  },
  setBiteDetail(state, payload) {
    state.biteDetail = payload;
  },
  setBitesDashboard(state, payload) {
    state.bitesDashboard = payload;
  },
  /* Deprecated 26 Jan 2021 */
  setBiteProfile(state, payload) {
    state.biteProfile = payload;
  },
  /* Deprecated 26 Jan 2021 */
  setBiteSettings(state, payload) {
    state.biteSettings = payload;
  },
};

export const actions = {
  /* Deprecated 26 Jan 2021 */
  async getBiteSettings({ commit }) {
    var api = '/user/profile/biteSettings';
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const biteSettings = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit("setBiteSettings", biteSettings.data);
  },

  async getPoolBitesList({ commit }, payload) {
    let api;

    if (payload.pageNum !== '' && payload.pageSize !== '') {
      api = `/bites/list?pageNum=${Number.parseInt(payload.pageNum) + 1}&pageSize=${Number.parseInt(payload.pageSize)}`;
    } else if (payload.pageNum === '' && payload.pageSize !== '') {
      api = `/bites/list?pageSize=${Number.parseInt(payload.pageSize)}`;
    } else {
      api = `/bites/list`;
    }

    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const bites = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit("setBites", bites);
  },

  async getPendingBitesList({ commit }, payload) {

    let api;

    if (payload.pageNum !== '' && payload.pageSize !== '') {
      api = `/bites/pending?pageNum=${Number.parseInt(payload.pageNum) + 1}&pageSize=${Number.parseInt(payload.pageSize)}`;
    } else if (payload.pageNum === '' && payload.pageSize !== '') {
      api = `/bites/pending?pageSize=${Number.parseInt(payload.pageSize)}`;
    } else {
      api = `/bites/pending`;
    }

    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const pendingBites = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit("setPendingBites", pendingBites);
  },

  async getOpenBitesList({ commit }, payload) {

    let api;

    if (payload.pageNum !== '' && payload.pageSize !== '') {
      api = `/bites/open?pageNum=${Number.parseInt(payload.pageNum) + 1}&pageSize=${Number.parseInt(payload.pageSize)}`;
    } else if (payload.pageNum === '' && payload.pageSize !== '') {
      api = `/bites/open?pageSize=${Number.parseInt(payload.pageSize)}`;
    } else {
      api = `/bites/open`;
    }

    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const openBites = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit("setOpenBites", openBites);
  },

  async getClosedBitesList({ commit }, payload) {

    let api;

    if (payload.pageNum !== '' && payload.pageSize !== '') {
      api = `/bites/closed?pageNum=${Number.parseInt(payload.pageNum) + 1}&pageSize=${Number.parseInt(payload.pageSize)}`;
    } else if (payload.pageNum === '' && payload.pageSize !== '') {
      api = `/bites/closed?pageSize=${Number.parseInt(payload.pageSize)}`;
    } else {
      api = `/bites/closed`;
    }

    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const closedBites = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit("setClosedBites", closedBites);
  },

  async getBiteDetails({ commit }, biteId) {
    var api = `/bites/${biteId}/detail`;
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const biteDetail = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit("setBiteDetail", biteDetail.data);
  },

  async getBitesDashboard({ commit }, payload) {
    var api = '/bites/dashboard';
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const bites = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit("setBitesDashboard", bites.data);
  },

  /* Deprecated 26 Jan 2021 */
  async getBiteProfile({ commit }, payload) {
    try {
      var api = '/user/profile/bite';
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      const biteProfileRes = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
      var biteProfile = biteProfileRes.data;
      biteProfile.dateJoin = convertFromUnixTime(biteProfile.dateJoin);
      commit("setBiteProfile", biteProfile);
    } catch (error) {
      console.log(error);
    }
  },

  /* Deprecated 26 Jan 2021 */
  async saveBiteProfile({ commit }, payload) {
    return new Promise((resolve, reject) => {
      try {
        var api = '/user/profile/bite';
        if (process.env.API_PROXY === '1' && process.client) {
          api = '/api' + api;
        }
        const response = this.$axios.post(api, payload.data, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
        resolve(response);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  async goingForBite({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      try {
        var api = `/bites/${payload.biteId}/respond`;
        if (process.env.API_PROXY === '1' && process.client) {
          api = '/api' + api;
        }
        const response = this.$axios.post(api, { proposal: payload.proposal }, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
        dispatch('getPoolBitesList', { pageNum: '', pageSize: '' });
        resolve(response);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  async closeBait({ commit }, payload) {
    return new Promise((resolve, reject) => {
      var api = `/bites/${payload.biteId}/closeBait`;
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      this.$axios.post(api, { responseId: payload.responseId }, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } })
        .then(response => {
          commit("baits/setBaitsStepper", response.data.data[0], { root: true });
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },

  async saveBiteProfilePending({ commit }, payload) {
    return new Promise((resolve, reject) => {
      try {
        var api = '/user/profile/bite/pending';
        if (process.env.API_PROXY === '1' && process.client) {
          api = '/api' + api;
        }
        const response = this.$axios.post(api, payload.data, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
        resolve(response);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

};

export const getters = {
  listBites(state) {
    return state.bites
  },
  listPendingBites(state) {
    return state.pendingBites
  },
  listOpenBites(state) {
    return state.openBites
  },
  listClosedBites(state) {
    return state.closedBites
  },
  getBiteDetail(state) {
    return state.biteDetail
  },
  /* Deprecated 26 Jan 2021 */
  isBiteProfile(state) {
    return state.biteProfile
  },
  /* Deprecated 26 Jan 2021 */
  isBiteSettings(state) {
    return state.biteSettings
  },
  getBitesDashboard(state) {
    return state.bitesDashboard
  },
};
