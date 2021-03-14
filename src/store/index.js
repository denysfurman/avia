import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import searchApi from "@/api/search";
import _ from 'lodash';

export default new Vuex.Store({
  state: {
    loading: false,
    tickets: [],
    searchId: '',
    stopSearch: false,
    hasError: false,
    filterTickets: [],
  },
  getters: {
    loading: state => state.loading,
    tickets: state => _.orderBy(state.filterTickets.slice(0, 5), ['price']),
    hasError: state => state.hasError,
  },
  mutations: {
    SET_SEARCH_ID: (state, payload) => {
      state.searchId = payload;
    },
    SET_TICKETS: (state, payload) => {
      state.stopSearch = payload.stop;
      state.tickets = [...state.tickets, ...payload.tickets];
      state.filterTickets = state.tickets;
    },
    SET_ERROR: (state, payload) => {
      state.hasError = payload;
    },
    SET_FILTER_STOP_TICKETS: (state, payload) => {
      if(payload.includes('all') || !payload.length) {
        state.filterTickets = _.cloneDeep(state.tickets);
      } else {
        const ticketsArray = _.cloneDeep(state.tickets);
        ticketsArray.forEach( el => {
          let segmentsCount = 0;
          if(el?.segments?.length){
            el.segments.forEach(segment => {
              if(segment?.stops?.length) {
                segmentsCount = segmentsCount + segment.stops.length;
              }
            })
          }
          el.segmentsCount = segmentsCount;
        });
        let filterArray =  payload.filter(elem => elem !== 'all')
        let filterTicketsArray = []
        filterArray.forEach( val => {
          filterTicketsArray = [...ticketsArray.filter(elem => parseInt(elem.segmentsCount) === parseInt(val)), ...filterTicketsArray ]
        });
        state.filterTickets = filterTicketsArray;
      }
      
    }
  },
  actions: {
    async getSearchId ({commit, dispatch, state}) {
      state.loading = true;
      try {
        const {data} = await searchApi.getSearchID ();
        if (data?.searchId) {
          commit ('SET_SEARCH_ID', data.searchId);
          await dispatch ('getTickets');
        }
      } catch (e) {
        console.error (e);
        commit ('SET_ERROR', true);
      } finally {
        state.loading = false;
      }
    },
    async getTickets ({commit, state}) {
      try {
        const {data} = await searchApi.getTickets (state.searchId);
        if (data) {
          commit ('SET_TICKETS', data);
        }
      } catch (e) {
        console.error (e);
        commit ('SET_ERROR', true);
      }
    },
    async fillterStopsTickets ({commit}, payload) {
      commit ('SET_FILTER_STOP_TICKETS', payload);
    },
  }
})