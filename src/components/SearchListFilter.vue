<template>
  <div class="search-list-filter">
    <ul>
      <li @click="addFilter('price')" :class="{'active': filterListValue === 'price' }">Самый дешевый</li>
      <li @click="addFilter('quickly')" :class="{'active': filterListValue === 'quickly' }">Самый быстрый</li>
      <li @click="addFilter('optimal')" :class="{'active': filterListValue === 'optimal' }">Оптимальный</li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SearchListFilter",
  data(){
    return {
      
    }
  },
  computed: {
    ...mapGetters([ 'filterListValue',]),
  },
  methods: {
    ...mapActions (['fillterListTickets']),
    addFilter (param) {
      this.fillterListTickets (param);
    }
  }
}
</script>

<style lang="scss">
  .search-list-filter{
    margin-bottom: 20px;
    display: block;
    ul{
      display: flex;
      width: 100%;;
      justify-content: space-between;
      align-items: center;
      align-content: center;
      li{
        width: 33.33%;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        height: 50px;
        font-weight: 600;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        background-color: #fff;
        border-top: 1px solid #DFE5EC;
        border-bottom: 1px solid #DFE5EC;
        cursor: pointer;
        &:first-child{
          border-radius: 10px  0 0 10px ;
          border-right: 1px solid #DFE5EC;
          border-left: 1px solid #DFE5EC;
        }
        &:last-child{
          border-radius: 0  10px 10px 0;
          border-right: 1px solid #DFE5EC;
          border-left: 1px solid #DFE5EC;
        }
        &.active{
          color: #fff;
          background: #2196F3;
          border-color: #2196F3;
        }
      }
    }
  }
</style>