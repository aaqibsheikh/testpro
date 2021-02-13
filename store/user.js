export const state = () => ({
  user: {},
  token: undefined,
  cookie: undefined
});

export const mutations = {
  setToken(state, payload) {
    state.token = payload;
  },
  setCookie(state, payload) {
    state.cookie = payload;
  },
  setUser(state, payload) {
    state.user = payload;
  },
};

export const actions = {
  registerUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      try {
        var api = '/signup';
        if (process.env.API_PROXY === '1' && process.client) {
          api = '/api' + api;
        }
        const response = this.$axios.post(api, payload.data);
        resolve(response);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },
  loginUser({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        var api = '/login';
        if (process.env.API_PROXY === '1' && process.client) {
          api = '/api' + api;
        }
        const response = await this.$axios.post(api, payload.data, { withCredentials: true, });
        resolve(response);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },
  confirmEmail({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        var api = '/confirm-email';
        if (process.env.API_PROXY === '1' && process.client) {
          api = '/api' + api;
        }
        const response = await this.$axios.post(api, payload.data, { withCredentials: true, });
        resolve(response);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },
  fetchUser(context, token) {
    const { commit } = context;
    return new Promise(async (resolve, reject) => {
      try {
        var api = '/user/me';
        if (process.env.API_PROXY === '1' && process.client) {
          api = '/api' + api;
        }
        const response = await this.$axios.get(api, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
        commit('setUser', response.data.data);
        resolve(response.data.data);
      } catch (error) {
        commit('setToken', null);
        commit('setUser', {});
        reject(error);
      }
    });
  },
  updateUserAvatar(context, payload) {
    const { commit, state } = context;
    var user = state.user;
    user.avatar = payload;
    commit('setUser', user);
  },
  resetPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      try {
        var api = '/reset';
        if (process.env.API_PROXY === '1' && process.client) {
          api = '/api' + api;
        }
        const response = this.$axios.post(api, payload.data);
        resolve(response);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },
  userLogout({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        var api = '/logout';
        if (process.env.API_PROXY === '1' && process.client) {
          api = '/api' + api;
        }

        this.$axios.get(api).then(response => {
          resolve(true);

        });
      } catch (error) {
        console.log(error);
        reject(false);
      }
    });
  },
  saveContactInformation({ commit }, payload) {
    return new Promise((resolve, reject) => {
      try {
        var api = '/contactus/message';
        if (process.env.API_PROXY === '1' && process.client) {
          api = '/api' + api;
        }
        const response = this.$axios.post(api, payload.data);
        resolve(response);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },
};

export const getters = {
  authenticated(state) {
    return state.token && state.user;
  },
  getUser(state) {
    return state.user;
  }
};
