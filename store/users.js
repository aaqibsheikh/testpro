import { timestampToDate } from '@/services/index'

export const state = () => ({
  users: [],
  selectedUser: {}
});

export const mutations = {
  setUsers(state, payload) {
    state.users = payload
  },

  setSelectedUser(state, payload) {
    state.selectedUser = payload
  }

};

export const actions = {
  async getUsers({ commit }, payload) {
    let api;
    if (payload.pageNum !== '' && payload.pageSize !== '') {
      api = `/admin/listUsers?pageNum=${Number.parseInt(payload.pageNum) + 1}&pageSize=${Number.parseInt(payload.pageSize)}`;
    } else if (payload.pageNum === '' && payload.pageSize !== '') {
      api = `/admin/listUsers?pageSize=${Number.parseInt(payload.pageSize)}`;
    } else {
      api = `/admin/listUsers`;
    }
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }

    const usersData = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit("setUsers", usersData)
  },

  async getSingleUser({ commit }, payload) {
    var api = `/admin/user/${payload.id}`;
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const response = await this.$axios.$get(api, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
    commit('setSelectedUser', response.data)
  },

  async approvePendingProfile({ commit }, payload) {
    return new Promise((resolve, reject) => {
      try {
        var api = `/admin/user/${payload.id}/approveProvider`;
        if (process.env.API_PROXY === '1' && process.client) {
          api = '/api' + api;
        }
        const response = this.$axios.post(api, '', { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
        resolve(response);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  async rejectPendingProvider({ commit }, payload) {
    return new Promise((resolve, reject) => {
      try {
        var api = `/admin/user/${payload.id}/rejectProvider`;
        if (process.env.API_PROXY === '1' && process.client) {
          api = '/api' + api;
        }
        const response = this.$axios.post(api, { 'comment': payload.comment }, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } });
        resolve(response);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },


}

export const getters = {
  getAllUsers(state) {
    return state.users
  },
  getSelectedUser(state) {
    return state.selectedUser
  }
};
