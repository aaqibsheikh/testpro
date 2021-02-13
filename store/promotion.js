import { formatPromoMonthDateYear } from '@/services/index';
export const state = () => ({
  adminPromotionList: [],
  userPromotionList: [],
  creatorPromotionList: [],
  singlePromotion: {},
});

export const mutations = {
  setAdminPromotionList(state, payload) {
    state.adminPromotionList = payload;
  },
  setUserPromotionList(state, payload) {
    state.userPromotionList = payload;
  },
  setCreatorPromotionList(state, payload) {
    state.creatorPromotionList = payload;
  },
  setSinglePromotion(state, payload) {
    state.singlePromotion = payload;
  },
};

export const actions = {
  async getPromotionListForAdmin({ commit }, payload) {
    try {
      let api;

      if (payload.pageNum !== '' && payload.pageSize !== '') {
        api = `/promotion/listAll?pageNum=${Number.parseInt(payload.pageNum) + 1
          }&pageSize=${Number.parseInt(payload.pageSize)}`;
      } else if (payload.pageNum === '' && payload.pageSize !== '') {
        api = `/promotion/listAll?pageSize=${Number.parseInt(
          payload.pageSize,
        )}`;
      } else {
        api = `/promotion/listAll`;
      }

      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      const promotionData = await this.$axios.$get(api, {
        headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
      });
      commit('setAdminPromotionList', formatPromoMonthDateYear(promotionData));
    } catch (error) {
      console.log(error);
    }
  },
  async getPromotionListForGeneralUsers({ commit }, payload) {
    try {
      let api;

      if (payload.pageNum !== '' && payload.pageSize !== '') {
        api = `/promotion/list?industry=${payload.industry}&pageNum=${Number.parseInt(payload.pageNum) + 1
          }&pageSize=${Number.parseInt(payload.pageSize)}`;
      } else if (payload.pageNum === '' && payload.pageSize !== '') {
        api = `/promotion/list?industry=${payload.industry}&pageSize=${Number.parseInt(
          payload.pageSize,
        )}`;
      } else {
        api = `/promotion/list?industry=${payload.industry}`;
      }

      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      const promotionData = await this.$axios.$get(api, {
        headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
      });

      commit('setUserPromotionList', formatPromoMonthDateYear(promotionData));

    } catch (error) {
      console.log(error);
    }

  },

  async getPromotionListByCreator({ commit }, payload) {
    try {
      let api;

      if (payload.pageNum !== '' && payload.pageSize !== '') {
        api = `/promotion/listCreator?pageNum=${Number.parseInt(payload.pageNum) + 1
          }&pageSize=${Number.parseInt(payload.pageSize)}`;
      } else if (payload.pageNum === '' && payload.pageSize !== '') {
        api = `/promotion/listCreator?pageSize=${Number.parseInt(
          payload.pageSize,
        )}`;
      } else {
        api = `/promotion/listCreator`;
      }

      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      const promotionData = await this.$axios.$get(api, {
        headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
      });
      commit(
        'setCreatorPromotionList',
        formatPromoMonthDateYear(promotionData),
      );
    } catch (error) {
      console.log(error);
    }
  },

  async getPromotionDetailForAdminById({ commit }, payload) {
    let api = `/promotion/${payload.id}`;
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const promotionData = await this.$axios.$get(api, {
      headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
    });
    commit('setSinglePromotion', promotionData.data);
  },
  async getUserPromotionDetailById({ commit }, payload) {
    let api = `/promotion/${payload.id}/detail`;
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const promotionData = await this.$axios.$get(api, {
      headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
    });
    commit('setSinglePromotion', promotionData.data);
  },
  async getCreatorPromotionDetailById({ commit }, payload) {
    let api = `/promotion/${payload.id}/creatorDetail`;
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const promotionData = await this.$axios.$get(api, {
      headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
    });
    commit('setSinglePromotion', promotionData.data);
  },
  async findPromotionByTitle({ commit }, payload) {
    let api = `/promotion/public/findByTitle/${payload.title}`;
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const promotionData = await this.$axios.$get(api);
    commit('setSinglePromotion', promotionData.data);
  },
  async getPromotionDetailById({ commit }, payload) {
    let api = `/promotion/${payload.id}`;
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const promotionData = await this.$axios.$get(api, {
      headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
    });
    commit('setSinglePromotion', promotionData.data);
  },

  async approvePromotion({ commit }, payload) {
    return new Promise((resolve, reject) => {
      var api = `/promotion/${payload.id}/approve`;
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      this.$axios
        .post(
          api,
          { responseId: payload.id },
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get('baitsToken')}`,
            },
          },
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(false);
        });
    });
  },

  async rejectPromotion({ commit }, payload) {
    return new Promise((resolve, reject) => {
      var api = `/promotion/${payload.id}/reject`;
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      this.$axios
        .post(
          api,
          { comment: payload.comment },
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get('baitsToken')}`,
            },
          },
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(false);
        });
    });
  },

  async feedbackPromotion({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      var api = `/promotion/${payload.id}/feedback`;
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      this.$axios.post(api, payload.data, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } })
        .then(response => {
          if (response.data.result) {
            resolve(response);
          } else {
            reject(response.data.error);
          }
        }).catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },

};

export const getters = {
  isAdminPromotions(state) {
    return state.adminPromotionList;
  },
  isUserPromotions(state) {
    return state.userPromotionList;
  },
  isCreatorPromotions(state) {
    return state.creatorPromotionList;
  },
  getPromotionById(state) {
    return state.singlePromotion;
  },
};
