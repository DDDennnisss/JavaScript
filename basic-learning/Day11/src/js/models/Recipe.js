import axios from 'axios'

export default class Recipe{
    constructor(id){
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;        
        
        } catch (error) {
            alert("Something wrong in Recipe.js")
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

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i)=>{
                ingredient = ingredient.replace(unit, unitsShort[i])
            })
        })

        ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

        const arrIng = this.ingredient.split(' ')
        const unitIndex = arrIng.findIndex( el2 => units.includes(el2));

        let objIng;
        if (unitIndex > -1){
            const arrCount = arrIng.slice(0, unitIndex);

            let count;
            if(arrCount.length === 1){
                count = eval(arrIngP[0].replace('-', '+'));
            }
        }
        return this.ingredients;
    }
}

