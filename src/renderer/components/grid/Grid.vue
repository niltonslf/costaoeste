<template lang="html">
  <div class="grid-container">
    <div class="grid-item">
      1
    </div>
    <div class="grid-item">
      2
    </div>
    <div class="grid-item">
      3
    </div>
    <div class="grid-item">
      4
    </div>
    <div class="grid-item">
      5
    </div>
    <div class="grid-item">
      6
    </div>
    <div class="grid-item">
      7
    </div>
    <div class="grid-item">
      8
    </div>
    <div class="grid-item">
      1
    </div>
    <div class="grid-item">
      2
    </div>
    <div class="grid-item">
      3
    </div>
    <div class="grid-item">
      4
    </div>
    <div class="grid-item">
      5
    </div>
    <div class="grid-item">
      6
    </div>
    <div class="grid-item">
      7
    </div>
    <div class="grid-item">
      8
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.grid-container{
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  height: 100%;
}

.grid-item{
  background: green;
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
}

</style>
