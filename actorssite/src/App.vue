<template>
  <div class="pageMain">
    <h1>Actors List</h1>
    <h2>Below depicts a list of actors than have been in a movie with Reeves and Cage during their career.</h2>
    <ul>
      <li v-for="(item, index) in resultsList" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import apiServices, { GetAllMovies } from './components/apiServices.js'
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
       movies : {},
       actors : {},
       alltheactors : {},
       finalActors : [],
       finalResponse: {}
    }
  },
  beforeMount(){
    this.getMovies();
  },
  methods: {
    getMovies(){
      apiServices.GetMovies().then( (response) => {
        this.movies = response.data;

        apiServices.GetAllActors().then((response)=>{
          this.actors = response.data;
          this.actors.forEach(element=>{
            this.alltheactors[element.actorId]={},
            this.alltheactors[element.actorId].Name = element.name
          })
          this.movies.forEach((movie)=>{
            let hasKeanu = false;
            let hasCage = false;
            movie.actors.forEach(element => {
              if(element==115){
                hasCage = true;
              }
              if(element==206){
                hasKeanu = true;
              }
            })
            movie.actors.forEach(element => {
              if(hasCage){
                if(this.alltheactors[element].NCMOVIES == null){
                  this.alltheactors[element].NCMOVIES = [];
                }
                this.alltheactors[element].NCMOVIES.push(movie.title);
                this.alltheactors[element].hasCage=true;
              }
              if(hasKeanu){
                if(this.alltheactors[element].KRMOVIES == null){
                  this.alltheactors[element].KRMOVIES = [];
                }
                this.alltheactors[element].KRMOVIES.push(movie.title);
                this.alltheactors[element].hasKeanu=true;
              }
            })
          })
          this.actors.forEach((actor)=>{
            if(this.alltheactors[actor.actorId]['hasKeanu'] == true && this.alltheactors[actor.actorId]['hasCage'] == true){
              delete this.alltheactors[actor.actorId].hasCage;
              delete this.alltheactors[actor.actorId].hasKeanu;

              this.finalActors.push(this.alltheactors[actor.actorId])
            }

            return (this.alltheactors[actor.actorId]['hasKeanu'] == true && this.alltheactors[actor.actorId]['hasCage'] == true);
          })
          apiServices.Further(this.finalActors).then(response=>{
            this.finalResponse = response;
          })
        })
      });
    },
    },
  }

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
