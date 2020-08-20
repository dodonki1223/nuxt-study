import Vuex from "vuex";
import axios from "axios";
import Cookie from "js-cookie";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        state.loadedPosts[postIndex] = editedPost
      },
      setToken(state, token) {
        state.token = token
      },
      clearToken(state) {
        state.token = null;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get(process.env.baseUrl +  "/posts.json")
          .then(res => {
              const postsArray = []
              for (const key in res.data) {
                postsArray.push({ ...res.data[key], id: key })
              }
              vuexContext.commit("setPosts", postsArray)
            })
          .catch(e => context.error(e));
      },
      /* 
          そのままだとVuexの値が更新されないため、更新後の画面を表示した時
          リロードしない限り新しい値が取得されない
          更新後の値を取得するため、Vuexを使用して値を常に更新するようにする
       */
      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        }
        return axios
          .post(process.env.baseUrl + "/posts.json?auth=" + vuexContext.state.token, createdPost)
          .then(result => {
            vuexContext.commit("addPost", { ...createdPost, id: result.data.name })
          })
      },
      editPost(vuexContext, editedPost) {
        /*
          <Firebase IDトークンにて認証するやり方>
            https://firebase.google.com/docs/database/rest/auth?hl=ja#authenticate_with_an_id_token
         */
        console.log(vuexContext.state.token);
        return axios.put(process.env.baseUrl + "/posts/" + editedPost.id + ".json?auth=" + vuexContext.state.token, editedPost)
          .then(res => {
            vuexContext.commit("editPost", editedPost)
          })
          .catch(e => console.log(e))
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      authenticateUser(vuexContext, authData) {
        // 詳しくはFirebase の REST APIを確認すること
        // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
        let authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + process.env.fbAPIKey
        if (!authData.isLogin) {
          authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + process.env.fbAPIKey;
        }
        return this.$axios
          .$post(authUrl, {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true
            }
          ).then(result => {
            vuexContext.commit("setToken", result.idToken);
            localStorage.setItem("token", result.idToken);
            localStorage.setItem("tokenExpiration", new Date().getTime() + Number.parseInt(result.expiresIn) * 1000);
            Cookie.set("jwt", result.idToken);
            Cookie.set("expirationDate", new Date().getTime() + Number.parseInt(result.expiresIn) * 1000);
            return this.$axios.$post("http://localhost:3000/api/track-data", { data: "Authentiated!" })
          })
          .catch(e => console.log(e));
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("expirationDate="))
            .split("=")[1];
        } else if (process.client) {
          // 以前、トークンに保存したものか未定義のどちらかになる
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration")
        } else {
          token = null;
          expirationDate = null;
        }
        // +expirationDate +をつけることで文字列を数値に変換する
        if (new Date().getTime() > +expirationDate || !token) {
          console.log("No token or invalid token");
          vuexContext.dispatch("logout");
          return;
        }
        vuexContext.commit("setToken", token);
      },
      logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        // サーバーでも実行されてしまうため 「if (process.client)」のコードを追加して
        // サーバーで実行されないようにする
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        return state.token != null
      }
    }
  });
};

export default createStore;
