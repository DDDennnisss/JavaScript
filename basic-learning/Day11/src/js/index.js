import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { element, renderLoader, clearLoader } from './views/base';


const state = {}

const controlSearch = async () => {
    // 1) Get Input from view
    const query = searchView.getInput();

    if (query) {
        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearResult();
        renderLoader(element.searchRes);
        try {
            await state.search.getResult();
            clearLoader();

            searchView.renderResult(state.search.result);
        } catch (err) {
            alert("Something wrong in index.js")
            clearLoader();
        }
    }
}

element.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

element.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResult();
        searchView.renderResult(state.search.result, goToPage);
    }
})


// RECIPE CONTROLLER

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '')
    console.log(id)

    if (id) {
        renderLoader(element.recipe)

        if (state.search) searchView.highlightSelected(id)


        state.recipe = new Recipe(id);
        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients()

            state.recipe.calcTime();
            state.recipe.calcServing();

            clearLoader();
            recipeView.renderRecipe(state.recipe);
            console.log(state.recipe)
        } catch (err) {
            console.log(err)
            alert("something wrong in controlRecipe")
        }
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));