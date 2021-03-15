<template>
  <div class="list-item" v-if="item">
    <div class="list-item_title">
      <span class="list-item_title__price">{{item.price}} P</span>
      <img :src="`//pics.avs.io/99/36/${item.carrier}.png`" class="list-item_title__logo"/>
    </div>
    <div class="list-item_detail">
      <div class="list-item_detail__item">
        <span class="item-description">
          {{item.segments[0].origin}} - {{item.segments[0].destination}}
        </span>
        <span class="item-inform">
          {{$moment(item.segments[0].date).format('HH:mm')}}  - {{$moment(item.segments[0].date).add(item.segments[0].duration, 'minutes').format('HH:mm ')}}
        </span>
      </div>
      <div class="list-item_detail__item">
        <span class="item-description">В пути</span>
        <span class="item-inform" v-if="item.segments[0].duration">
          {{this.getTimeFromMins(item.segments[0].duration)}}
        </span>
      </div>
      <div  class="list-item_detail__item">
        <span class="item-description">
          <template v-if="item.segments[0].stops.length">
           {{item.segments[0].stops.length}} {{getText(item.segments[0].stops.length, 'пересадка', 'пересадки', 'пересадок' )}}
          </template>
          <template v-else>
            Без пересадок
          </template>
        </span>
        <span class="item-inform" >
          {{item.segments[0].stops.join(', ')}}
        </span>
      </div> 
    </div>

    <div v-if="item.segments.length > 1" class="list-item_detail">
      <div class="list-item_detail__item">
        <span class="item-description">
          {{item.segments[1].origin}} - {{item.segments[1].destination}}
        </span>
        <span class="item-inform">
          {{$moment(item.segments[1].date).format('HH:mm')}}  - {{$moment(item.segments[1].date).add(item.segments[1].duration, 'minutes').format('HH:mm ')}}
        </span>
      </div>
      <div class="list-item_detail__item">
        <span class="item-description">В пути</span>
        <span class="item-inform" v-if="item.segments[1].duration">
          {{this.getTimeFromMins(item.segments[1].duration)}}
        </span>
      </div>
      <div  class="list-item_detail__item">
        <span class="item-description">
          <template v-if="item.segments[1].stops.length">
           {{item.segments[1].stops.length}} {{getText(item.segments[1].stops.length, 'пересадка', 'пересадки', 'пересадок' )}}
          </template>
          <template v-else>
            Без пересадок
          </template>
        </span>
        <span class="item-inform" >
          {{item.segments[1].stops.join(', ')}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    item: {
      type: Object,
      required: true
    },
  },
  methods: {
    getTimeFromMins(mins) {
      let h = mins / 60 | 0;
      let m = mins % 60 | 0;
      return `${h}ч ${m}м`
    },
    getText(number, one, two, five) {
      let n = Math.abs(number);
      n %= 100;
      if (n >= 5 && n <= 20) {
        return five;
      }
      n %= 10;
      if (n === 1) {
        return one;
      }
      if (n >= 2 && n <= 4) {
        return two;
      }
      return five;
    }
  },
}
</script>

<style lang="scss">
  .list-item{
    background: #FFFFFF;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 20px 20px 10px;
    margin-bottom: 20px;
    &_title{
      display: flex;
      justify-content: space-between;
      align-content: center;
      align-items: center;
      margin-bottom: 20px;
      &__logo{
        width: 99px;
        height: 36px;
        object-fit: contain;
      }
      &__price{
        font-weight: 600;
        font-size: 24px;
        line-height: 24px;
        color: #2196F3;
      }
    }
    &_detail{
      display: flex;
      width: 100%;;
      justify-content: space-between;
      align-items: center;
      align-content: center;
      &__item{
        width: 33.33%;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        padding-right: 5px;
        .item-description{
          font-size: 12px;
          line-height: 18px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #A0B0B9;
        }
        .item-inform{
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 21px;
          /* identical to box height, or 150% */
          display: block;
          color: #4A4A4A;
        }
      }
      
    }
  }
</style>