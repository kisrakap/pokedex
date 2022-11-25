<template>
  <div class="m-4 p-2 outlined border rounded d-flex shadow align-center justify-content-between ">
    <div v-if="pokemon">
      <RouterLink :to="`/about/${id}`" class="text-decoration-none justify-content-between w-100 h-100">
      <div class="p-1 m-1 row justify-content-between" style="height:200px ;width:200px" >
          <img class="p-2 m-0 row shadow rounded outlined border justify-content-between" :src="imageUrl + id + '.png'" style="height:200px ;width:190px" alt=""/>
      </div>
      <div class="d-flex align-center justify-content-center p-2">
        <h5>
          {{ pokemon.name}} 
        </h5>
        
      </div>
      </RouterLink>

    </div>
    <div v-if="noPokemon">
      <div class="p-5 m-5 text-center align-center"> 
        <h1>
          Tidak ada pokemon
        </h1> 
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Card',
  props: ['pokemon', 'imageUrl'],
  data: () => ({
      id : '',
      noPokemon: false
    }),
  async mounted(){
    await this.fetchdatadetail()
  },
  computed: {
      
  },
  watch: {
    // whenever question changes, this function will run
    pokemon() {
      if (this.pokemon) {
        this.fetchdatadetail()
      } else {
        this.noPokemon = true
      }
    }, 
  },
  methods: {
    async fetchdatadetail() {
        const pokedetail = await fetch(this.pokemon.url)
        .then(resp => resp.json())
        .catch(err => console.error) 
        this.id = pokedetail.id
    }
  }
}
</script>

<style>

</style>
