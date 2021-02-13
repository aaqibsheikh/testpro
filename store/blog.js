import { formatBlogMonthDateYear } from '@/services/index';

export const state = () => ({
  adminBlogList: [],
  publicBlogList: [],
  publicBlogListSearch: [],
  adminBlogCategories: [],
  writerBlogCategories: [],
  userBlogList: [],
  creatorBlogList: [],
  singleBlog: {},
});

export const mutations = {
  setAdminBlogList(state, payload) {
    state.adminBlogList = payload;
  },
  setPublicBlogList(state, payload) {
    state.publicBlogList = payload;
  },
  setPublicBlogListBySearch(state, payload) {
    state.publicBlogListSearch = payload;
  },
  setUserBlogList(state, payload) {
    state.userBlogList = payload;
  },
  setCreatorBlogList(state, payload) {
    state.creatorBlogList = payload;
  },
  setSingleBlog(state, payload) {
    state.singleBlog = payload;
  },
  setAdminBlogCategories(state, payload) {
    state.adminBlogCategories = payload;
  },
  setWriterBlogCategories(state, payload) {
    state.writerBlogCategories = payload;
  },
};

export const actions = {
  async getBlogCategoriesForAdmin({ commit }, payload) {
    try {
      let api = `/blog/category/listAll`;

      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      const blogCategories = await this.$axios.$get(api, {
        headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
      });
      commit('setAdminBlogCategories', blogCategories.data);
    } catch (error) {
      console.log(error);
    }
  },
  async getBlogCategoriesForWriter({ commit }, payload) {
    try {
      let api = `/blog/category/list`;

      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      const blogCategories = await this.$axios.$get(api, {
        headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
      });
      commit('setWriterBlogCategories', blogCategories.data);
    } catch (error) {
      console.log(error);
    }
  },
  async getBlogListForAdmin({ commit }, payload) {
    try {
      let api;

      if (payload.pageNum !== '' && payload.pageSize !== '') {
        api = `/blog/listAll?pageNum=${Number.parseInt(payload.pageNum) + 1
          }&pageSize=${Number.parseInt(payload.pageSize)}`;
      } else if (payload.pageNum === '' && payload.pageSize !== '') {
        api = `/blog/listAll?pageSize=${Number.parseInt(
          payload.pageSize,
        )}`;
      } else {
        api = `/blog/listAll`;
      }

      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      const blogData = await this.$axios.$get(api, {
        headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
      });
      commit('setAdminBlogList', formatBlogMonthDateYear(blogData));
    } catch (error) {
      console.log(error);
    }
  },
  async getBlogListForPublic({ commit }, payload) {
    try {

      let api = `/blog/public/list`;
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      const blogData = await this.$axios.$get(api, {
        headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
      });
      commit('setPublicBlogList', blogData);
    } catch (error) {
      console.log(error);
    }
  },
  async getBlogListForPublicBySearch({ commit }, payload) {
    try {
      let api;
      if (payload.pageNum !== '' && payload.pageSize !== '') {
        api = `/blog/public/listByPage?pageNum=${Number.parseInt(payload.pageNum)}&pageSize=${Number.parseInt(payload.pageSize)}`;
      } else if (payload.pageNum === '' && payload.pageSize !== '') {
        api = `/blog/public/listByPage?pageSize=${Number.parseInt(
          payload.pageSize,
        )}`;
      } else {
        api = `/blog/public/listByPage`;
      }

      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      const blogData = await this.$axios.$get(api, {
        headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
      });
      commit('setPublicBlogListBySearch', blogData);
    } catch (error) {
      console.log(error);
    }
  },
  async getBlogListForGeneralUsers({ commit }, payload) {
    try {
      let api;

      if (payload.pageNum !== '' && payload.pageSize !== '') {
        api = `/blog/listCreator?pageNum=${Number.parseInt(payload.pageNum) + 1
          }&pageSize=${Number.parseInt(payload.pageSize)}`;
      } else if (payload.pageNum === '' && payload.pageSize !== '') {
        api = `/blog/listCreator?pageSize=${Number.parseInt(
          payload.pageSize,
        )}`;
      } else {
        api = `/blog/listCreator`;
      }

      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      const blogData = await this.$axios.$get(api, {
        headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
      });

      commit('setUserBlogList', formatBlogMonthDateYear(blogData));

    } catch (error) {
      console.log(error);
    }

  },

  async getBlogListByCreator({ commit }, payload) {
    try {
      let api;

      if (payload.pageNum !== '' && payload.pageSize !== '') {
        api = `/blog/listCreator?pageNum=${Number.parseInt(payload.pageNum) + 1
          }&pageSize=${Number.parseInt(payload.pageSize)}`;
      } else if (payload.pageNum === '' && payload.pageSize !== '') {
        api = `/blog/listCreator?pageSize=${Number.parseInt(
          payload.pageSize,
        )}`;
      } else {
        api = `/blog/listCreator`;
      }

      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }
      const blogData = await this.$axios.$get(api, {
        headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
      });
      commit(
        'setCreatorBlogList',
        blogData,
      );
    } catch (error) {
      console.log(error);
    }
  },

  async getBlogDetailForAdminById({ commit }, payload) {
    let api = `/blog/${payload.id}`;
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const blogData = await this.$axios.$get(api, {
      headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
    });
    commit('setSingleBlog', blogData.data);
  },
  async getUserBlogDetailById({ commit }, payload) {
    let api = `/blog/${payload.id}/detail`;
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const blogData = await this.$axios.$get(api, {
      headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
    });
    commit('setSingleBlog', blogData.data);
  },
  async getCreatorBlogDetailById({ commit }, payload) {
    let api = `/blog/${payload.id}/creatorDetail`;
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const blogData = await this.$axios.$get(api, {
      headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
    });
    commit('setSingleBlog', blogData.data);
  },
  async findBlogByTitle({ commit }, payload) {
    let api = `/blog/public/findByTitle/${payload.title}`;
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const blogData = await this.$axios.$get(api);
    commit('setSingleBlog', blogData.data);
  },
  async getBlogDetailById({ commit }, payload) {
    let api = `/blog/${payload.id}`;
    if (process.env.API_PROXY === '1' && process.client) {
      api = '/api' + api;
    }
    const blogData = await this.$axios.$get(api, {
      headers: { Authorization: `Bearer ${this.$cookies.get('baitsToken')}` },
    });
    commit('setSingleBlog', blogData.data);
  },

  async approveBlog({ commit }, payload) {
    return new Promise((resolve, reject) => {
      var api = `/blog/${payload.id}/approve`;
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

  async rejectBlog({ commit }, payload) {
    return new Promise((resolve, reject) => {
      var api = `/blog/${payload.id}/reject`;
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

  async feedbackBlog({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      var api = `/blog/${payload.id}/feedback`;
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
  isAdminBlog(state) {
    return state.adminBlogList;
  },
  isPublicBlog(state) {
    return state.publicBlogList;
  },
  isPublicBlogSearch(state) {
    return state.publicBlogListSearch;
  },
  isUserBlog(state) {
    return state.userBlogList;
  },
  isCreatorBlog(state) {
    return state.creatorBlogList;
  },
  getBlogById(state) {
    return state.singleBlog;
  },
  isAdminBlogCategories(state) {
    return state.adminBlogCategories;
  },
  isWriterBlogCategories(state) {
    return state.writerBlogCategories;
  },
};
