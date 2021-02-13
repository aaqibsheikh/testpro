import { timestampToDate } from '@/services/index';
export const state = () => ({
  companies: [],
  singleCompany: {},
});

export const mutations = {
  setCompanies(state, payload) {
    state.companies = payload;
  },
  setSingleCompany(state, payload) {
    state.singleCompany = payload;
  },
};

export const actions = {
  async getCompanies({ commit }, payload) {
    let api = '/company/list';
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const companyData = await this.$axios.$get(api, {
      headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
    });
    commit('setCompanies', companyData.data);
  },

  deleteCompany({ commit, dispatch }, payload) {
    // $axios.$delete(api, payload, { headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` } })
    dispatch('getCompanies');
    // commit("setCompanies", companyData.data)
  },

  // async getSelectedCompany({ commit }, payload) {
  //   // this should change when API wiil allow search by ID
  //   let api = '/company/list';
  //   if (process.env.API_PROXY === '1' && process.client) {
  //     api = '/api' + api;
  //   }
  //   const companyData = await this.$axios.$get(api, {
  //     headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
  //   });
  //   let single = companyData.data.find((x) => x.id === +payload);
  //   commit('setSingleCompany', single);
  // },

  async getSelectedCompany({ commit }, companyId) {
    let api = `/company/${companyId}`;
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const companyData = await this.$axios.$get(api, {
      headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
    });
    commit("setSingleCompany", companyData.data);
  },

  //this need to be checked with the updated API
  async updateCompany({ commit }, payload) {
    return new Promise((resolve, reject) => {
      try {
        let newData = {
          name: payload.name,
          type: payload.type,
          remarks: payload.remarks,
          status: payload.status,
        };

        let api = `/company/${payload.id}`;
        if (process.env.API_PROXY === '1' && process.client) {
          api = '/api' + api;
        }
        const response = this.$axios.post(api, newData, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get('baitsToken')}`,
          },
        });
        resolve(response);
      } catch (error) {
        console.log(error);
      }
    });
  },
};

export const getters = {
  isCompanies(state) {
    return state.companies;
  },
  getSingleCompany(state) {
    return state.singleCompany;
  },
};
