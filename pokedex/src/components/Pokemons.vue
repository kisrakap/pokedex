<template>
    <div class="p-4 row d-flex justify-content-center outlined rounded borders shadow align-items-center">
        <div class="container-fluid">
            <h1 class="text-center"> Pokemons</h1>
            <div class="row justify-content-center align-items-end d-flex flex-wrap h-100">
                <div class="w-75">
                    <h6 class="mx-3 pt-3 mb-0">Filer By type</h6>
                    <div class="shadow p-2 mx-2 mb-3 w-100 rounded d-flex flex-wrap justify-content-between">
                        <button style="width:7rem ;" v-for="(poke, index) in listFilter" :key="index" @click="filterPokemon(poke.url)" class="rounded border btn-primary p-1 m-1" outlined color="primary"> {{ poke.name}}</button>
                    </div>
                </div>
                <div class="w-25 h-100">
                    <input type="text" class="form-control p-3 m-2 mb-3 h-100 shadow border-0 w-100"
                    placeholder="Search Pokemon"
                    hide-details="auto"
                    v-model="carivalue"
                  />
                </div>
            </div>
            
            <div class="d-flex outlined border rounded flex-wrap justify-content-center h-100 w-100">
                <Card v-for="(pokemon, index) in filteredPokemon" :key="index" :pokemon="pokemon" :imageUrl="imageUrl"/>
            </div>

            <div v-if="noPokemon" class="m-5 p-5 text-center">
                <h1>
                    Tidak ada pokemon
                </h1>
            </div>

            <div>
                <button type="button" @click.prevent="sebelumnya" :disabled="!backUrl ? true: false" class="rounded border btn bg-primary bg-opacity-75 p-3 m-2" outlined color="primary"> <strong>PREVIOUS</strong> </button>
                <button type="button" @click.prevent="selanjutnya" :disabled="!nextUrl ? true: false" class="rounded border btn bg-primary bg-opacity-75 p-3 m-2" outlined color="primary"> <strong> NEXT</strong> </button>    
            </div>

        </div>
    </div>
</template>

<script>
import Card from "../components/Card.vue"
export default{
    components: {
        Card
    },

    data: () => ({
        pokemonList : [],
        pokemontemp : [],
        listFilter : [],
        carivalue : '',
        isLoading: false,
        apiUrl: 'http://pokeapi.co/api/v2/pokemon/',
        imageUrl: 'http://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
        url :'https://pokeapi.co/api/v2/pokemon/',
        typeurl : 'https://pokeapi.co/api/v2/type/',
        nextUrl: '',
        backUrl: '',

        noPokemon: false
    }),

    watch:{
        carivalue(){
            return this.carivalue
        }, 

        pokemonList() {
            if (this.pokemonList.length > 0) {
                this.noPokemon = false
            }
        }
        
    },

    async created(){
        await this.fetchdata() 
        await this.filtertype()
    },

    computed: {
        filteredPokemon() {
            if (!this.carivalue) {
                return this.pokemonList
            }
                return this.pokemonList.filter((pokemon) => 
                    pokemon.name.includes(this.carivalue)
                    )
 
        },
        isDisabled(){
            if (this.backUrl !== ''){
                return false
            } else {
                return true
            }
        }
    },

    methods: {
        async fetchdata(url) {
            const link = url ? url : "https://pokeapi.co/api/v2/pokemon/"
            const pokedata = await fetch(link)
            .then(resp => resp.json())
            .catch(err => console.error(err)) 
    
            this.pokemonList = pokedata.results
            this.pokemontemp = pokedata.results
            this.nextUrl = pokedata.next
            this.backUrl = pokedata.previous
        }, 
 
        async  selanjutnya() {
            this.pokemonList = []
            await this.fetchdata(this.nextUrl)
        },

        async sebelumnya () {
            this.pokemonList = []
            await this.fetchdata(this.backUrl)
        },

        async filtertype() {
            const listFilters = await fetch(this.typeurl)
            .then(resp => resp.json())
            .catch(err => console.error(err)) 
            this.listFilter = listFilters.results
        },

        async filterPokemon(url){
    
            this.pokemonList = []
            this.pokemontemp = []
            const listFilters = await fetch(url)
            .then(resp => resp.json())
            .catch((err) => {
                console.log(err)
                this.noPokemon = true
            }) 
            
            if (listFilters.pokemon.length === 0) {
                this.pokemontemp = []
                this.noPokemon = true
            } else {
                listFilters.pokemon.filter((pokemon) => 
                this.pokemontemp.push(pokemon.pokemon))
                this.pokemonList = this.pokemontemp
            }

        }
    }

}
</script>

<style scoped>
</style>