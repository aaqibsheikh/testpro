var moment = require('moment');
export default function ({ $axios, $session, isServer, req, res, redirect, app, store }) {
  $axios.defaults.headers.common['Content-Type'] = 'application/json';
  $axios.defaults.headers.common['Authorization'] = 'Bearer ' + app.$cookies.get("baitsToken");
  // $axios.defaults.withCredentials = true;

  function refreshTokenAndCookie() {
    return new Promise((resolve, reject) => {
      var api = '/info';
      if (process.env.API_PROXY === '1' && process.client) {
        api = '/api' + api;
      }

      $axios.get(api, { headers: { Authorization: `Bearer ${app.$cookies.get("baitsToken")}` }, })
        .then(response => {
          if (response == undefined) { redirect('/account'); }
          var cookieSid = undefined;
          if (process.server) {
            var setCookieString = response.headers['set-cookie'] || response.headers['Set-Cookie'] || [];
            if (setCookieString.length > 0) {
              for (var i = 0; i < setCookieString.length; i++) {
                var cookieItem = setCookieString[i];
                var cookieDetails = cookieItem.split(';');
                var cookieName = '';
                var cookieValue = '';
                var cookieOpts = {};
                for (var j = 0; j < cookieDetails.length; j++) {
                  var cookieNameValue = cookieDetails[j].trim().split('=');
                  if (cookieNameValue.length == 2) {
                    if (j == 0) {
                      cookieName = cookieNameValue[0];
                      cookieValue = decodeURIComponent(cookieNameValue[1]);
                      if (cookieName == 'sid') {
                        store.commit('user/setCookie', cookieDetails[j]);
                        cookieSid = cookieDetails[j];
                      }
                    } else if (cookieNameValue[0] == 'Path') {
                      cookieOpts.path = cookieNameValue[1];
                    } else if (cookieNameValue[0] == 'Expires') {
                      cookieOpts.expires = moment(cookieNameValue[1]).toDate();
                    }
                  }
                }
                try {
                  if (cookieName == 'sid') {
                    if (process.server) {
                      app.$cookies.remove('sid');
                      app.$cookies.set(cookieName, cookieValue, cookieOpts);
                    }
                  } else if (app.$cookies.get(cookieNameValue[0]) != undefined) {
                    app.$cookies.remove(cookieNameValue[0]);
                  }
                } catch (ex) { }
              }
            }
          }
          // $axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken;
          store.commit('user/setToken', response.data.accessToken);
          app.$cookies.set('baitsToken', response.data.accessToken);
          return resolve({
            cookie: cookieSid,
            token: response.data.accessToken
          });
        }).catch(error => {
          return reject(error);
        });
    });
  }

  app.$axios.interceptors.request.use(function (request) {
    if (process.server) {
      // during SSR, use lastest token if it exist
      if (store.state.user.cookie != undefined) {
        if (request.headers.cookie != store.state.user.cookie) {
          request.headers.cookie = store.state.user.cookie;
        }
        if (request.headers.common == undefined) { request.headers.common = {}; }
        if (request.headers.common.cookie != store.state.user.cookie) {
          request.headers.common.cookie = store.state.user.cookie;
        }
      }
      if (store.state.user.token != undefined) {
        if (request.headers.Authorization != `Bearer ${store.state.user.token}`) {
          request.headers.Authorization = `Bearer ${store.state.user.token}`;
        }
        if (request.headers.common.Authorization != `Bearer ${store.state.user.token}`) {
          request.headers.common.Authorization = `Bearer ${store.state.user.token}`;
        }
      }
    }
    return request;
  });

  $axios.interceptors.response.use(function (response) {
    // If user going to be logout
    if (response.status === 200 && (response.config.url === '/api/logout' || response.config.url === '/logout')) {
      app.$cookies.remove('sid');
      app.$cookies.remove('baitsToken');
      store.commit('user/setToken', undefined);
      store.commit('user/setCookie', undefined);
      store.commit('user/setUser', {});
      store.commit('baits/setBaitSettings', null);
      store.commit('baits/setBaitProfile', []);
      store.commit('bite/setBiteProfile', null);
      store.commit('bite/setBiteSettings', []);
    }
    return response;
  }, function (error) {
    const status = error.response ? error.response.status : null;
    if (status === 401 && (error.config.url !== '/info' && error.config.url !== '/api/info')) {
      return refreshTokenAndCookie().then(res => {
        $axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.token;
        $axios.defaults.headers.common['Cookie'] = res.cookie;
        error.config.headers.Authorization = 'Bearer ' + res.token;
        if (process.server) {
          error.config.headers.cookie = res.cookie;
        }
        return $axios.request(error.config);
      });
    } else if (status === 401 && (error.config.url === '/info' || error.config.url === '/api/info')) {
      if (process.server) {
        app.$cookies.remove('sid');
        app.$cookies.remove('baitsToken');
      }
      if (process.client) {
        this.$cookies.remove('sid');
        this.$cookies.remove('baitsToken');
      }
      redirect('/');
    } else {
      return Promise.reject(error);
    }
  });
}
