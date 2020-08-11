import Vuex from "vuex";
import axios from "axios";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
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
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get('https://sample.firebaseio.com/posts.json')
          .then(res => {
              const postsArray = []
              for (const key in res.data) {
                postsArray.push({ ...res.data[key], id: key })
              }
              vuexContext.commit('setPosts', postsArray)
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
          .post('https://sample.firebaseio.com/posts.json', createdPost)
          .then(result => {
            vuexContext.commit('addPost', { ...createdPost, id: result.data.name })
          })
      },
      editPost(vuexContext, editedPost) {
        return axios.put("https://sample.firebaseio.com/posts/" + editedPost.id + ".json", editedPost)
          .then(res => {
            vuexContext.commit("editPost", editedPost)
          })
          .catch(e => console.log(e))
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  });
};

export default createStore;
