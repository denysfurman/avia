export default {
  getSearchID() {
    return axios.get(apiBaseUrl + "search");
  },
  getTickets(searchId) {
    return axios.get(apiBaseUrl + "tickets", {
      params: {
        searchId: searchId,
      }
    });
  },
  
};
