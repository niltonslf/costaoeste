<template lang="html">
  <v-layout column wrap>
    <v-subheader class="title">Reservas</v-subheader>
    <v-expansion-panel popout>
      <v-expansion-panel-content
      v-for="(message, i) in messages"
      :key="i"
      hide-actions
      >
      <v-layout slot="header" align-center row spacer>
        <v-flex xs4 sm2 md1>
          <v-avatar
          slot="activator"
          size="36px"
          >
          <v-icon :color="message.color">{{ message.icon }}</v-icon>
        </v-avatar>
      </v-flex>


      <v-flex no-wrap xs3 sm3>
        <strong v-html="message.title"></strong>
        <v-flex
        v-if="message.tel"
        class="grey--text"
        ellipsis
        hidden-sm-and-down
        >
        {{ message.tel }}
      </v-flex>
    </v-flex>

    <v-flex no-wrap xs5 sm3>
      <v-chip
      v-if="message.checkin"
      :color="`${message.color} lighten-4`"
      label
      small
      class="ml-0"
      >Ckeck-in: <b>{{ message.checkin }}</b>  </v-chip>
    </v-flex>
    <v-flex no-wrap xs5 sm3>
      <v-chip
      v-if="message.checkin"
      :color="`${message.color} lighten-4`"
      label
      small
      class="ml-0"
      >Checkout: <b> {{ message.checkout }}</b> </v-chip>
    </v-flex>
  </v-layout>
  <v-card>
    <v-divider></v-divider>
    <v-card-text v-text="message.lorem"></v-card-text>
  </v-card>
</v-expansion-panel-content>
</v-expansion-panel>
</v-layout>

</template>

<script>
export default {
  data(){
    return{
      messages: [
        {
          color: 'red',
          icon: 'room_service',
          name: 'Quarto 03',
          checkin: '20/05/2018',
          checkout:'30/05/2018' ,
          title: 'João da silva lopes',
          tel: '(45) 98803-6008',
          lorem: 'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.',
        },

      ],
    }
  }
}
</script>

<style lang="css">
</style>
