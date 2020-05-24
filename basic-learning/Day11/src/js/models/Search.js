export default class Search {
    constructor(query) {
        this.query = query;
    }
}

import axios from 'axios';

async function getResult(query) {
    try {
        const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${query}`);
        const recipe = res.data.recipe;
        console.log(recipe);
    } catch (error) {
        alert(error)
    }
}
getResult('pizza')