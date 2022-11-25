<template>
  <div class="about container justify-content-between rounded mt-5">
    <div @click.prevent="$router.go(-1)">
      <button class="p-3 m-2 w-100 text-center align-center btn bg-primary bg-opacity-75" >
        <strong>
          CLOSE DETAIL
        </strong>
      </button>
    </div>
    <div class="mt-5 m-5 p-5 d-flex flex-wrap justify-content-center outlined border rounded shadow">
      <div v-if="pokemon" class="p-3 mx-3 pr-3 row align-items-center rounded border shadow">
        <img class="row align-items-center" :src="imageUrl + pokemon.id + '.png'" style="height:400px ;width:400px" alt="">
      </div>
      <div v-if="pokemon" max-width="300" class="m-1 mx-3 p-4 shadow border rounded bg-success bg-opacity-10">
        <h2 class="placeholder-glow border-bottom">
          <strong>
            {{ pokemon.name }}
          </strong>
        </h2>
        <div class="property border rounded shadow m-2 p-2" >
          <div class="left ">Base Experience</div>
          <div class="right">{{ pokemon.base_experience }} XP</div>
        </div>
        <div class="property border rounded shadow m-2 p-2">
          <div class="left">Height</div>
          <div class="right">{{ pokemon.height / 10 }} m</div>
        </div>
        <div class="property border rounded shadow m-2 p-2">
          <div class="left">Weight</div>
          <div class="right">{{ pokemon.weight / 10 }} kg</div>
        </div>
        <h3 class="border-bottom mt-4">Pokemon Types</h3>
        <div class="types d-flex justify-content-start">
          <div class="type my-1 p-2 rounded border shadow" 
            v-for="(value, index) in pokemon.types"
            :key="'value'+index">
            {{ value.type.name }}
          </div>
        </div>
        <h3 class="border-bottom mt-4">Abilities</h3>
        <div max-width="300" class="abilities d-flex justify-content-start">
          <div class="ability my-2 p-2 rounded border shadow" 
            v-for="(value, index) in pokemon.abilities"
            :key="'value'+index">
            {{ value.ability.name }}
          </div>
        </div>
      </div>
      <div v-if="pokemon" class="m-1 mx-1 p-4 shadow border bg-warning bg-opacity-10 rounded ">
        <h3 class="placeholder-glow border-bottom"> Stats</h3>
        <div class="property border rounded shadow m-2 p-2" v-for="(stat, index ) in pokemon.stats" :key="index">
          <div class="m-1 strong">{{ stat.stat.name}}</div>
          <div class=" m-1 ">{{stat.base_stat}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'About',
  
  data: () => ({
      id : '',
      pokemon : {},
      url : 'https://pokeapi.co/api/v2/pokemon/', 
      imageUrl : 'http://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
    }),
  async mounted(){
    await this.fetchdatadetail()
  },
  watch: {
    // whenever question changes, this function will run
  },
  methods: {
    async fetchdatadetail() {
      console.log(this.$route.params.id);
        const pokedetail = await fetch(this.url+ this.$route.params.id)
        .then(resp => resp.json())
        this.id = pokedetail.id
        this.pokemon = pokedetail

        console.log(this.pokemon);
    }
  }
}
</script>
<style>

</style>
