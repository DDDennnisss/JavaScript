import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResult() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            console.log(res)
            this.result = res.data.recipe;
            console.log(this.result);
        } catch (error) {
            alert(error)
        }
    }
}
