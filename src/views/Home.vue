<template>
  <div class="home">
    <Header/>
    <div class="container">
      <aside>
        <SearchFilter/>
      </aside>
      <main >
        <SearchListFilter/>
        <p class="error" v-if="hasError">Извините! Возникли проблемы </p>
        <SearchList v-if="!loading && !hasError"/>
      </main>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SearchList from '@/components/SearchList.vue'
import SearchFilter from '@/components/SearchFilter.vue'
import SearchListFilter from '@/components/SearchListFilter.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    SearchList,
    SearchFilter,
    SearchListFilter,
    Header,
  },
  async mounted () {
    await  this.getSearchId();
  },
  computed: {
    ...mapGetters([ 'loading', 'hasError']),
  },
  methods: {
    ...mapActions([ 'getSearchId']),
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
  .error{
    font-size: 20px;
    color: red;
  }
 
</style>
