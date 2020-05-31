import { element } from "./base";

export const getInput = () => element.searchInput.value;

export const clearInput = () => {
    element.searchInput.value = ''
};

export const clearResult = () => {
    element.searchResList.innerHTML = '';
    element.searchResPages.innerHTML = '';
}

export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];

    if(title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length < limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0)
        return `${newTitle.join(' ')}...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = `
    <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    element.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (type ,page) =>
    `<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>`


const renderButton = (page ,numResult ,resPerPage) => {
    const pages = Math.ceil(numResult/resPerPage);

    let button;
    if(page === 1 && pages > 1){
        button = createButton('next', page)
    }
    else if(page < pages){
        button = `
        ${createButton('prev', page)}
        ${createButton('next', page)}        
        `
    }
    else if(page === pages && pages > 1){
        button = createButton('prev', page);
    }
    element.searchResPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResult = (recipe, page = 1 , resPerPage = 10) => {
    const start = (page - 1)*resPerPage;
    const end = page*resPerPage;

    recipe.slice(start, end).forEach(renderRecipe);
    renderButton(page , recipe.length, resPerPage)

}
