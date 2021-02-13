export const state = () => ({
  currentQuestionNo: '1',
  previousQuestionNo: null,
  questionIndex: 0
});

export const mutations = {
  setNextQuestionNo(state, payload) {
    state.currentQuestionNo = payload;
  },
  setPreviousQuestionNo(state, payload) {
    state.previousQuestionNo = payload;
  },
  setQuestionIndex(state, payload) {
    state.questionIndex = payload;
  },
};

export const actions = {
  async setLocalStorageData({ commit }, payload) {
    if (process.client) {
      localStorage.setItem('questionaire', JSON.stringify(payload));
    }
  },
};

export const getters = {
  getCurrentQuestionNo(state) {
    return state.currentQuestionNo
  },
  getPreviousQuestionNo(state) {
    return state.previousQuestionNo
  },
  getQuestionIndex(state) {
    return state.questionIndex
  },
};
