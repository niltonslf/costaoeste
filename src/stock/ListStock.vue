<script>
import _ from "lodash";

/*Components*/
import AppTitle from "../shared/title/Title.vue";
import AppButton from "../shared/button/Button.vue";

export default {
  props: {
  },

  components: {
    "app-title": AppTitle,
    "app-button": AppButton,
  },

  data() {
    return {
      products: [],
      product:{
        name: "",
        qtd: ""
      },
      sortProperty: "id",
      sortDirection: "desc",
      filterTerm: ""
    };
  },

  methods:{
    /**
    * Sort data
    */
    sort(event, property) {
      event.preventDefault();
      this.sortProperty = property;

      if (this.sortDirection == "asc") {
        this.sortDirection = "desc";
      } else {
        this.sortDirection = "asc";
      }
    },

    /**
    * Remove Data
    */
    removeProduct(product) {
      console.log("Remove product");
      this.products.forEach((element, index) => {
        if (element.id == product.id) {
          this.products.splice(index, 1); // remove user from products list
          this.$http.get("/api/products/del/" + product.id); // Remove user form database
        }
      })
    }
  },

  computed: {
    /**
    * Return data sorted and filtered
    */
    list() {
      const filter = this.filterTerm;
      const list = _.orderBy(this.products, this.sortProperty, this.sortDirection);

      if (_.isEmpty(filter)) {
        return list;
      }

      return _.filter(list,product => product.name.toLowerCase().indexOf(filter) >= 0
    );
  }
},

created() {
  /* Get user data from API */
  this.$http.get("/api/products/list")
  .then(req => (this.products = req.data))
  .catch((err) => {
    console.log("Erro ao regastar produtos");
    console.log(err);
  });
}

};
</script>

<template>

  <section>
    <router-link to="/stock/add" class="btn btn-infor">
      Adicionar produto
    </router-link>

    <div class="col col-10">
      <div class="alert alert-primary">
        <p>Realizar uma busca:</p>
        <input type="text" class="form-control" placeholder="Filtrar lista" v-model="filterTerm">
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th width="50"><a href="#" @click="sort($event,'id')">#</a></th>
          <th><a href="#" @click="sort($event,'name')">Produto</a></th>
          <th width="50"><a href="#" @click="sort($event,'qtd')">Quantidade</a></th>
          <th width="120">Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="product in list">
          <td>{{product.id}}</td>
          <td>{{product.name}}</td>
          <td>{{product.qtd}}</td>
          <td>
            <app-button v-bind:href="'/stock/edit/'+product.id" icon="pencil" color="green"></app-button>
            <app-button href="#"  icon="trash" color="red"
            @click.native="removeProduct(product)"
            ></app-button>
          </td>
        </tr>
      </tbody>
    </table>

  </section>
</template>

  <style lang="sass" scoped>

    </style>
