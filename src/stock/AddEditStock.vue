<script>
import _ from "lodash";
import {Money} from 'v-money'

/*Components*/
import AppButton from "../shared/button/Button.vue";
import AppTitle from "../shared/title/Title.vue";

export default {

  components: {
    "app-button": AppButton,
    "app-title": AppTitle,
    Money
  },
  data(){
    return {
      errors: [],
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      },
      product:{
        name: "",
        salePrice:"",
        purchasePrice:"",
        qtd:"",
        note:"",
      }
    }
  },

  created() {
    if (this.$route.params.id !== undefined) {
      /* Get product data from API */
      this.$http
      .get("/api/products/show/" + this.$route.params.id)
      .then(req => (this.product = req.data));
      console.log(this.product);
    }
  },

  methods: {
    /*
    * Create new product
    * @param: $event receive data from children component
    */
    createEditProduct() {
      console.log(this.product);

      //CREATE PRODUCT
      if (this.$route.params.id == undefined) {
        this.$http
        .post("/api/products/create", this.product)
        .then(response => {
          console.log(response.data);
          this.errors = [];
          this.$router.push({
            name: "list-stock",
            params:{
              product: this.product
            }
          });
        })
        .catch(e => {
          this.errors = e.data.errors;
          console.log(e);
          console.log(this.errors);
        });
      } else {
        // Edit product
        let productId = this.$route.params.id;
        console.log(this.product);

        this.$http
        .post("/api/products/update", this.product)
        .then(response => {
          console.log("Edit success! Response:");
          console.log(response.data);
          this.errors = [];
          this.status = true;
        })
        .catch(e => {
          this.errors = e.data.errors;
          console.log(e);
          console.log(this.errors);
        });
      }
    }
  }
}
</script>

<template>

  <section>
    <div class="alert alert-success" v-if="status == true">Dados atualizados!</div>

    <div class="container">
      <form class="form-container" method="post" v-on:submit.prevent="createEditProduct" enctype="multipart/form-data">

        <div class="col-10 input-box container">

          <div class="col col-10">
            <span>Produto</span>
            <input type="text" name="name" v-model="product.name" class="form-control">
            <span class="alert alert-danger" v-for="error in errors.name">{{ error }}</span>
          </div>

          <div class="col col-5">
            <span>Preço de venda</span>
            <money v-model="product.salePrice" v-bind="money" class="form-control"></money>
            <span class="alert alert-danger" v-for="error in errors.salePrice">{{ error }}</span>
          </div>

          <div class="col col-5">
            <span>Preço de compra</span>
            <money v-model="product.purchasePrice" v-bind="money" class="form-control"></money>
            <span class="alert alert-danger" v-for="error in errors.purchasePrice">{{ error }}</span>
          </div>

          <div class="col col-5" v-bind:class="{'form-group':true, 'has-error': errors.name}">
            <span>Quantidade</span>
            <input type="number" name="qtd"v-model="product.qtd" class="form-control">
            <span class="alert alert-danger" v-for="error in errors.qtd">{{ error }}</span>
          </div>

          <div class="col col-10">
            <span>Oberservação</span>
            <textarea name="note" v-model="product.note" rows="5" class="form-control"></textarea>
          </div>

        </div>

        <div class="col col-10">
          <input type="submit" class="btn btn-success btn-small" value="Cadastrar">
          <app-button href="/stock/list" color="red">Cancelar</app-button>
        </div>

      </form>
    </div>
  </section>

</template>
  <style lang="sass" scoped>
    .product-avatar{
      text-align:center
      }

        .input-box{
          padding-right: 30px;
          justify-content: space-between;
        }
          </style>
