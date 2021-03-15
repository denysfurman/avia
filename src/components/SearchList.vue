<template>
  <div>
    <div v-for="(ticket, i) in tickets" :key="i"  >
        <ListItem :item="ticket"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ListItem from '@/components/ListItem.vue'

export default {
  name: 'SearchList',
  computed: {
    ...mapGetters([ 'tickets',]),
  },
  components: {
    ListItem,
  }
}
</script>
