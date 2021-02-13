export const state = () => ({
  plans: [],
  session: null
});

export const mutations = {
  setPlans(state, payload) {
    state.plans = payload;
  },
  setSession(state, payload) {
    state.session = payload;
  },
};

export const actions = {
  getPaymentplan({ commit }, payload) {
    return new Promise((resolve, reject) => {
      var api = '/payment/plan/list';
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      this.$axios.get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } })
        .then(response => {
          commit("setPlans", response.data);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },

  getPaymentSession({ commit }, payload) {
    return new Promise((resolve, reject) => {
      var api = '/payment/plan/pay';
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      this.$axios.post(api, payload.data, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } })
        .then(response => {
          commit("setSession", response.data);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },

  getPaymentStatus({ commit }, payload) {
    return new Promise((resolve, reject) => {
      var api = '/payment/status';
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      this.$axios.get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } })
        .then(response => {
          commit("getPaymentStatus", response.data);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },

};

export const getters = {
  isPlans(state) {
    return state.plans
  },
  isSession(state) {
    return state.session
  },
};