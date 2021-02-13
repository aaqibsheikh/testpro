export const state = () => ({
  questionaires: [],
});

export const mutations = {
  setQuestionaires(state, payload) {
    state.questionaires = payload;
  },
};

export const actions = {
  async getQuestionaires({ commit }, payload) {
    try {
      var api = '/question';
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      const questionaires = await this.$axios.$get(api)
      commit("setQuestionaires", questionaires);
    } catch (error) {
      console.log(error);
    }
  },
};

export const getters = {
  isQuestionaires(state) {
    return state.questionaires
  },
};
