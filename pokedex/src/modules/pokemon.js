import { reactive, toRefs } from "vue";

const state = reactive({
    error : null,
    pokemons : null,
    loaded : false, 
    temp : null
})

export default function usePokemons(){
    const load = async () => {
        if (!state.loaded){
            try {
                const pokemonsResponse = await fetch('https://pokeapi.co/api/v2/pokemon/')
                state.pokemons = await pokemonsResponse.json()

                console.log(state.pokemons)

            }

            catch(e) {
                state.error = e
            }
        }
    }

    return { ...toRefs(state), load}
}