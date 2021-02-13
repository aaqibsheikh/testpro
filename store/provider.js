export const state = () => ({
  providers: [],
  provider: [],
});

export const mutations = {
  setProviders(state, payload) {
    state.providers = payload;
  },
  setProviderDetail(state, payload) {
    state.provider = payload;
  },
};

export const actions = {
  fetchAllProviders({ commit }, payload) {
    return new Promise((resolve, reject) => {
      var api = `/provider/${payload.type === 'public' ? 'public' : 'dashboard'}/list?industry=${payload.industry}`;
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      this.$axios.get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } })
        .then(response => {
          commit("setProviders", response.data.data);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },
  fetchProviderById({ commit }, payload) {
    return new Promise((resolve, reject) => {
      var api = `/provider/${payload.type === 'public' ? 'public' : 'dashboard'}/${payload.id}/detail`;
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      this.$axios.get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } })
        .then(response => {
          commit("setProviderDetail", response.data.data);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },
};

export const getters = {
  getProviders(state) {
    return state.providers
  },
  getProviderDetail(state) {
    return state.provider
  },
};