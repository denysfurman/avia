import Vue from 'vue'
import Vuex from 'vuex'
import searchApi from "@/api/search";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    tickets: [],
    searchId: '',
    stopSearch: false,
    hasError: false,
  },
  getters: {
    loading: state => state.loading,
    tickets: state => state.tickets.slice(0, 5),
    hasError: state => state.hasError,
  },
  mutations: {
    SET_SEARCH_ID: (state, payload) => {
      state.searchId = payload;
    },
    SET_TICKETS: (state, payload) => {
      state.stopSearch = payload.stop;
      state.tickets = [...state.tickets, ...payload.tickets];
    },
    SET_ERROR: (state, payload) => {
      state.hasError = payload;
    },
  
  },
  actions: {
    async getSearchId({ commit, dispatch, state  }){
      state.loading = true;
      try {
        const { data } = await searchApi.getSearchID();
        if(data?.searchId) {
          commit('SET_SEARCH_ID', data.searchId);
          await dispatch('getTickets');
        }
      } catch (e) {
        console.error(e);
        commit('SET_ERROR', true);
      } finally {
        state.loading = false;
      }
    },
    async getTickets({ commit,  state }){
      try {
        const { data } = await searchApi.getTickets(state.searchId);;
        if(data) {
          commit('SET_TICKETS', data);
        }
      } catch (e) {
        console.error(e);
        commit('SET_ERROR', true);
      } 
    }
  },
})