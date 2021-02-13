export const state = () => ({
  expertise: [],
});

export const mutations = {
  setExpertise(state, payload) {
    state.expertise = payload;
  },
};

export const actions = {
  async getIndustyExpertise({ commit }, payload) {
    let api = '/user/listIndustryExpertise';
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const expertise = await this.$axios.$get(api, {
      headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
    });
    commit('setExpertise', expertise.data);
  },
};

export const getters = {
  getAllExpertise(state) {
    return state.expertise;
  },
};