import Search from './models/Search';
import * as searchView from './views/searchView';
import {element ,renderLoader, clearLoader} from './views/base';


const state = {}

const controlSearch = async ()=>{
    // 1) Get Input from view
    const query = searchView.getInput();

    if(query){
        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearResult();
        renderLoader(element.searchRes);
        try{
            await state.search.getResult();
            clearLoader();
            
            searchView.renderResult(state.search.result);
        }catch(err){
            alert('error');
            clearLoader();
        }
   }
}

element.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})
