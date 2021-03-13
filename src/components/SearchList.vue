<template>
  <div>
    <ul>
      <li v-for="ticket in tickets"  >
        {{ticket.price}}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'SearchList',
  computed: {
    ...mapGetters([ 'tickets',]),
  },
}
</script>
