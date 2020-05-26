import Search from './models/Search';
import searchView from './views/searchView';
import {element} from './views/base';


const state = {}

const controlSearch = async ()=>{
    // 1) Get Input from view
    const query = searchView.getInput();

    if(query){
        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearResult()
    }
}


const search = new Search('pizza') 
console.log(search)

search.getResult()