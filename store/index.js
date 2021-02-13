export const strict = false
export const actions = {
  async nuxtServerInit({ dispatch, commit }, { req }) {
    var cookies = {};
    if (req && req.headers && req.headers.cookie) {
      req.headers.cookie.split(';').forEach(function (cookie) {
        // var parts = cookie.match(/(.*?)=(.*)$/);
        var parts = cookie.split('=');
        if (parts.length == 2) {
          cookies[parts[0].trim()] = (parts[1] || '').trim();
        }
      });
      if (cookies.baitsToken) {
        await commit('user/setToken', cookies.baitsToken);
      }
      if (cookies.sid) {
        await commit('user/setCookie', `sid=${cookies.sid}`);
      }

      if (cookies.baitsToken && cookies.sid) {
        //call required api
        await dispatch('user/fetchUser', cookies.baitsToken);
      }
    }
  }
}