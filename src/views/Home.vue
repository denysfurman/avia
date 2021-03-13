<template>
  <div class="home">
    <Header/>
    <div class="container">
      <aside>
        <SearchFilter/>
      </aside>
      <main>
        <SearchList/>
      </main>
    </div>
    
  </div>
</template>

<script>
import SearchList from '@/components/SearchList.vue'
import SearchFilter from '@/components/SearchFilter.vue'
import Header from '@/components/Header.vue'
import searchApi from "@/api/search";

export default {
  name: 'Home',
  components: {
    SearchList,
    SearchFilter,
    Header,
  },
  data() {
    return {
      loading: true,
      tickets: [],
    };
  },

  async mounted() {
    this.loading = true;
    try {
      const { data } = await searchApi.getSearchID();
      if(data?.searchId) {
        const ticketsData = await searchApi.getTickets(data.searchId);
        this.tickets = ticketsData.data;
        console.log(ticketsData)
      }
      
    } catch (e) {
      console.error(e)
    } finally {
      this.loading = false;
    }
  },
}
</script>
<style lang="scss">
  .home{
    .container{
      width: 785px;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
    }
    aside{
      width: 232px;
      margin-right: 20px;
    }
    main{
      width: calc(100% - 252px);
    }
  }
 
</style>
