import { timestampToDate } from '@/services/index'
export const state = () => ({
  baits: [],
  baitsAll: [],
  baitProfile: [],
  baitsDetail: [],
  baitsPending: [],
  baitsOpen: [],
  baitsClosed: [],
  baitSettings: null,
  baitsStepper: null,
});

export const mutations = {
  setBaits(state, payload) {
    state.baits = payload;
  },
  setBaitsAll(state, payload) {
    state.baitsAll = payload;
  },
  setBaitsDetail(state, payload) {
    state.baitsDetail = payload;
  },
  setPendingBaits(state, payload) {
    state.baitsPending = payload;
  },
  setOpenBaits(state, payload) {
    state.baitsOpen = payload;
  },
  setClosedBaits(state, payload) {
    state.baitsClosed = payload;
  },
  setBaitProfile(state, payload) {
    state.baitProfile = payload;
  },
  setBaitSettings(state, payload) {
    state.baitSettings = payload;
  },
  setBaitsStepper(state, payload) {
    state.baitsStepper = payload;
  },
};

export const actions = {
  async getBaitsSettings({ commit }) {
    var api = '/user/profile/baitSettings';
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const baitSettings = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit("setBaitSettings", baitSettings.data);
  },

  //admin
  async getBaitsListAll({ commit }, payload) {
    let api;
    if (payload.pageNum !== '' && payload.pageSize !== '') {
      api = `/baits/listAll?pageNum=${Number.parseInt(payload.pageNum) + 1}&pageSize=${Number.parseInt(payload.pageSize)}`;
    } else if (payload.pageNum === '' && payload.pageSize !== '') {
      api = `/baits/listAll?pageSize=${Number.parseInt(payload.pageSize)}`;
    } else {
      api = `/baits/listAll`;
    }

    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const baits = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit("setBaitsAll", baits);
  },
  async getBaitsDetailAdmin({ commit }, id) {
    var api = `/baits/${id}/detailAdmin`;
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const baits = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit("setBaitsDetail", baits.data);
  },

  //consumer
  async getBaitsList({ commit }, payload) {
    let api;
    if (payload.pageNum !== '' && payload.pageSize !== '') {
      api = `/baits/list?pageNum=${Number.parseInt(payload.pageNum) + 1}&pageSize=${Number.parseInt(payload.pageSize)}`;
    } else if (payload.pageNum === '' && payload.pageSize !== '') {
      api = `/baits/list?pageSize=${Number.parseInt(payload.pageSize)}`;
    } else {
      api = `/baits/list`;
    }

    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const baits = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit("setBaits", baits);
  },

  async getBaitsDetail({ commit }, id) {
    var api = `/baits/${id}/detail`;
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const baits = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit("setBaitsDetail", baits.data);
    commit("setBaitsStepper", baits.data);
  },
  async getPendingBaitsList({ commit }, payload) {

    let api;

    if (payload.pageNum !== '' && payload.pageSize !== '') {
      api = `/baits/${payload.id}/pending?pageNum=${Number.parseInt(payload.pageNum) + 1}&pageSize=${Number.parseInt(payload.pageSize)}`;
    } else if (payload.pageNum === '' && payload.pageSize !== '') {
      api = `/baits/${payload.id}/pending?pageSize=${Number.parseInt(payload.pageSize)}`;
    } else {
      api = `/baits/${payload.id}/pending`;
    }

    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const baits = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit("setPendingBaits", baits.data);
  },
  async getOpenBaitsList({ commit }, payload) {

    let api;

    if (payload.pageNum !== '' && payload.pageSize !== '') {
      api = `/baits/${payload.id}/open?pageNum=${Number.parseInt(payload.pageNum) + 1}&pageSize=${Number.parseInt(payload.pageSize)}`;
    } else if (payload.pageNum === '' && payload.pageSize !== '') {
      api = `/baits/${payload.id}/open?pageSize=${Number.parseInt(payload.pageSize)}`;
    } else {
      api = `/baits/${payload.id}/open`;
    }

    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const baits = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit("setOpenBaits", baits.data);
  },
  async getClosedBaitsList({ commit }, payload) {

    let api;

    if (payload.pageNum !== '' && payload.pageSize !== '') {
      api = `/baits/${payload.id}/closed?pageNum=${Number.parseInt(payload.pageNum) + 1}&pageSize=${Number.parseInt(payload.pageSize)}`;
    } else if (payload.pageNum === '' && payload.pageSize !== '') {
      api = `/baits/${payload.id}/closed?pageSize=${Number.parseInt(payload.pageSize)}`;
    } else {
      api = `/baits/${payload.id}/closed`;
    }

    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const baits = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit("setClosedBaits", baits.data);
  },
  async getBaitProfile({ commit }, payload) {
    try {
      var api = '/user/profile/bait';
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      const baitProfile = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
      // Convert timestamp date into YYYY-MM-DD format by using timestampToDate()
      commit("setBaitProfile", timestampToDate(baitProfile.data));
    } catch (error) {
      console.log(error);
    }
  },
  async saveBaitsProfile({ commit }, payload) {
    return new Promise((resolve, reject) => {
      var api = '/user/profile/bait';
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      this.$axios.post(api, payload.data, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } })
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },
  async castDraftBait({ commit }, id) {
    return new Promise((resolve, reject) => {
      var api = `/baits/${id}/castDraft`;
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      this.$axios.post(api, '', { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } })
        .then(response => {
          resolve(response);

        }).catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },

  async acceptBiteForBait({ commit }, payload) {
    return new Promise((resolve, reject) => {
      var api = `/baits/${payload.routeId}/acceptBite`;
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      this.$axios.post(api, { responseId: payload.id }, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } })
        .then(response => {
          commit("setBaitsStepper", response.data.data);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },

  async rejectBiteForBait({ commit }, payload) {
    return new Promise((resolve, reject) => {
      var api = `/baits/${payload.routeId}/closeBite`;
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      this.$axios.post(api, { responseId: payload.id }, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } })
        .then(response => {
          commit("setBaitsStepper", response.data.data);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);
        });

    });
  },
  async rejectBaits({ commit }, payload) {
    return new Promise((resolve, reject) => {
      var api = `/baits/${payload.routeId}/closeBait`;
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      this.$axios.post(api, { id: payload.id }, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } })
        .then(response => {
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);
        });

    });
  },

  async sendFeedbackForBait({ commit }, payload) {
    return new Promise((resolve, reject) => {
      var api = `/baits/${payload.routeId}/rateAndCloseBite`;
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      this.$axios.post(api, {
        responseId: payload.responseId,
        rating: Number.parseFloat(payload.rating),
        remarks: payload.remarks,
        outcome: payload.outcome,
        transactionId: payload.transactionId,
        reason: payload.reason
      }, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } })
        .then(response => {
          commit("setBaitsStepper", response.data.data);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);

        });
    });
  },

  async noFeedbackForBait({ commit }, payload) {
    return new Promise((resolve, reject) => {
      var api = `/baits/${payload.routeId}/closeBite`;
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      this.$axios.post(api, { responseId: payload.responseId }, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } })
        .then(response => {
          commit("setBaitsStepper", response.data.data);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },
};

export const getters = {
  isBaits(state) {
    return state.baits
  },
  isBaitsAll(state) {
    return state.baitsAll
  },
  getBaitsDetail(state) {
    return state.baitsDetail
  },
  getPendingBaitsList(state) {
    return state.baitsPending
  },
  getOpenBaitsList(state) {
    return state.baitsOpen
  },
  getClosedBaitsList(state) {
    return state.baitsClosed
  },
  isBaitProfile(state) {
    return state.baitProfile
  },
  isBaitSettings(state) {
    return state.baitSettings
  },
  isBaitsStepper(state) {
    return state.baitsStepper
  },
};
