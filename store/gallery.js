export const state = () => ({
  gImages: [],

});

export const mutations = {
  setGalleryImages(state, payload) {
    state.gImages = payload;
  },

};

export const actions = {
  async getGalleryImages({ commit }, payload) {
    let api = '/blog/image/list';
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const images = await this.$axios.$get(api, {
      headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
    });
    commit('setGalleryImages', images.data);
  },
};

export const getters = {
  isGImages(state) {
    return state.gImages
  },
};