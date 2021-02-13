import { convertFromUnixTime } from '@/services/index'

export const state = () => ({
  tab: 'profile',
  userProfile: [],
  userDashboard: [],
  generalProfile: [],
  providerProfile: [],
  providerSettings: null,
});

export const mutations = {
  setTab(state, payload) {
    state.tab = payload;
  },
  setUserProfile(state, payload) {
    state.userProfile = payload;
  },
  setUserDashboard(state, payload) {
    state.userDashboard = payload;
  },
  setGeneralProfile(state, payload) {
    state.generalProfile = payload;
  },
  setProviderProfile(state, payload) {
    state.providerProfile = payload;
  },
  setProviderSettings(state, payload) {
    state.providerSettings = payload;
  },
};

export const actions = {
  async getUserProfile({ commit }, payload) {
    var api = '/user/profile';
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const userProfile = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit("setUserProfile", userProfile.data);
  },

  async saveUserProfile({ commit }, payload) {
    return new Promise((resolve, reject) => {
      try {
        var api = '/user/profile';
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

  async getUserDashboard({ commit }, payload) {
    var api = '/user/dashboard';
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const userDashboard = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit("setUserDashboard", userDashboard.data);
  },

  async getGeneralProfile({ commit }, payload) {
    var api = '/user/profile/general';
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const generalProfileRes = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    var generalProfile = generalProfileRes.data;
    generalProfile.dateOfBirth = convertFromUnixTime(generalProfile.dateOfBirth);
    generalProfile.dateOfEmployment = convertFromUnixTime(generalProfile.dateOfEmployment);
    generalProfile.companyDateEstablishment = convertFromUnixTime(generalProfile.companyDateEstablishment);
    commit("setGeneralProfile", generalProfile);
  },

  async saveGeneralProfile({ commit }, payload) {
    return new Promise((resolve, reject) => {
      try {
        var api = '/user/profile/general';
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

  async applyUserProfile({ commit }, payload) {
    try {
      var api = '/user/profile/apply';
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      const response = await this.$axios.$post(api, payload.data, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
      commit("setUserDashboard", response.data);
    } catch (error) {
      console.log(error);
    }
  },

  async getProviderProfile({ commit }, payload) {
    try {
      var api = '/user/profile/bite';
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      const biteProfileRes = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
      var providerProfile = biteProfileRes.data;
      providerProfile.dateJoin = convertFromUnixTime(providerProfile.dateJoin);
      commit("setProviderProfile", providerProfile);
    } catch (error) {
      console.log(error);
    }
  },

  async saveProviderProfile({ commit }, payload) {
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

  async getProviderSettings({ commit }) {
    var api = '/user/profile/biteSettings';
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const biteSettings = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit("setProviderSettings", biteSettings.data);
  },
};

export const getters = {
  isUserProfile(state) {
    return state.userProfile;
  },
  isUserDashboard(state) {
    return state.userDashboard;
  },
  isGeneralProfile(state) {
    return state.generalProfile;
  },
  isProviderProfile(state) {
    return state.providerProfile
  },
  isProviderSettings(state) {
    return state.providerSettings
  },
  getActiveTab(state) {
    return state.tab;
  },
};
