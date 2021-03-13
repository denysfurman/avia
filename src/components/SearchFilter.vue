<template>
  <div class="search-filter">
    <h3>Количество пересадок</h3>
    <ul >
      <li v-for="option in filterList" :key="option.option">
        <input 
          :id="'filter-' + option.option" 
          @change="changeInput(option.option)" 
          type="checkbox" 
          :value="option.option" 
          v-model="checked">
        <label :for="'filter-' + option.option" >{{ option.name }}</label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchFilter",
  data() {
    return {
      filterList: [ 
        {
          name: 'Все',
          option:  'all',
        },
        {
          name: 'Без пересадок',
          option:  '0',
        },
        {
          name: '1 пересадка',
          option:  '1',
        },
        {
          name: '2 пересадки',
          option:  '2',
        },
        {
          name: '3 пересадки',
          option:  '3',
        }
      ],
      checked: [],
    }
  },
  
  methods: {
    changeInput(option){
      if(option === 'all' && this.checked.includes(option)) {
        this.checked = ['all','0','1','2','3']; 
      } else {
        this.checked =  this.checked.filter(el => el !== 'all')
      }
    }
  },
}
</script>
<style  lang="scss">
  .search-filter{
    background: #FFFFFF;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 20px 0 10px;
    width: 100%;
    h3{
      font-weight: 600;
      font-size: 12px;
      line-height: 12px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #4A4A4A;
      padding-left: 20px;
      margin-bottom: 10px;
    }
    label{
      cursor: pointer;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      align-content: center;
      padding: 10px 20px 10px 50px;
      transition: all .2s;
      font-size: 13px;
      line-height: 20px;
      color: #4A4A4A;
      &:hover{
        background: #F1FCFF;
      }
    }
  }
  
  
  /* Base for label styling */
  [type="checkbox"]:not(:checked),
  [type="checkbox"]:checked {
    position: absolute;
    left: 0;
    opacity: 0.01;
  }
  [type="checkbox"]:not(:checked) + label,
  [type="checkbox"]:checked + label {
    position: relative;
    cursor: pointer;
  }
  
  /* checkbox aspect */
  [type="checkbox"]:not(:checked) + label:before,
  [type="checkbox"]:checked + label:before {
    content: '';
    position: absolute;
    left: 20px;
    top: 10px;
    width: 20px;
    height: 20px;
    border: 1px solid #9ABBCE;
    box-sizing: border-box;
    border-radius: 2px;
    background: #FFF;
    -webkit-transition: all .275s;
    transition: all .275s;
  }
  [type="checkbox"]:checked + label:before{
    border: 1px solid #2196F3;
  }
  
  /* checked mark aspect */
  [type="checkbox"]:not(:checked) + label:after,
  [type="checkbox"]:checked + label:after {
    content: '';
    position: absolute;
    top: 16px;
    left: 24px;
    -webkit-transition: all .2s;
    width: 12px;
    height: 8px;
    transition: all .2s;
  }
  
  /* checked mark aspect changes */
  [type="checkbox"]:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0) rotate(45deg);
    transform: scale(0) rotate(45deg);
  }
  
  [type="checkbox"]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1) rotate(0);
    transform: scale(1) rotate(0);
  }
  
  /* Disabled checkbox */
  [type="checkbox"]:disabled:not(:checked) + label:before,
  [type="checkbox"]:disabled:checked + label:before {
    box-shadow: none;
    border-color: #bbb;
    background-color: #e9e9e9;
  }
  
  [type="checkbox"]:disabled:checked + label:after {
    color: #777;
  }
  
  [type="checkbox"]:disabled + label {
    color: #aaa;
  }
  
  
  [type="checkbox"]:not(:checked) + label:after,
  [type="checkbox"]:checked + label:after {
    background-image: url('../assets/share.svg');
  }
</style>