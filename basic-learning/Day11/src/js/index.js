import Search from './models/Search';
import Recipe from './models/Recipe';
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
            console.log(err)
            alert('error');
            clearLoader();
        }
   }
}

element.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

element.searchResPages.addEventListener('click', e =>{
    const btn = e.target.closest('.btn-inline')

    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResult();
        searchView.renderResult(state.search.result, goToPage);
    }
})


// RECIPE CONTROLLER

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '')

    if(id){

        state.recipe = new Recipe(id);


        try{
            await state.recipe.getRecipe();

            state.recipe.calcTime();
            state.recipe.calcServings();
            

        }catch(err){
            alert(err)
        }
    }
}

