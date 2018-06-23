<template lang="html">
  <div :class="'card ' + status">
    <div class="card-body">
      <h5 class="card-title">Quarto: 01</h5>
      <div class="card-text">
        <ul>
          <li><b>Hospede:</b> João da silva</li>
          <li><b>Entrada:</b> 15/04/2018</li>
          <li><b>Saida prevista:</b> 20/04/2018</li>
        </ul>
      </div>
      <router-link :to="{ name: 'location'}" class="btn btn-sm btn-primary">Ver locação</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['status'],
  data(){
    return {
    }
  }
}
</script>


<style lang="css">
.card{
  width: calc(25% - 10px);
  margin: 5px;
  box-sizing: border-box;
  border-width: 2px;
}
ul{
  padding: 0;
}

.card.vacant{
  border-color: green;
  background-color: green;
  color: white;
}

.card.busy{
  border-color: red;
  background-color: red;
  color: white;
}

.card.reserved{
  border-color: orange;
  background-color: orange;
  color: white;
}

.card .btn{
  width:100%;
  background-color: white;
  border-color: #666;
  color: #666
}
</style>
