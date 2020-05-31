import axios from 'axios'

export default class Recipe{
    constructor(query){
        this.query = query;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;        
        
        } catch (error) {
            alert(error)
        }
    }

    calcTime(){
        const numIng = this.ingredients.length;
        const period = Math.ceil(numIng/3);
        this.time = period*15;
    }

    calcServing(){
        this.servings = 4;
    }
}

