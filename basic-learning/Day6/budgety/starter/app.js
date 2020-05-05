// BUDGET CONTROLLER
var budgetController = (function () {


})();

// UI CONTROLLER
var UIController = (function () {

    var DomString = {
        getType: '.add__type',
        getDescription: '.add__description',
        getValue: '.add__value',
        getBtn: '.add__btn'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DomString.getType).value,
                description: document.querySelector(DomString.getDescription).value,
                value: document.querySelector(DomString.getValue).value
            };
        },

        getDomString: function () {
            return DomString;
        }
    }
})();


//GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var DOM = UICtrl.getDomString();

    var ctrlAddItem = function () {
        var input = UICtrl.getInput;
        console.log(input)
    }

    document.querySelector(DOM.getBtn).addEventListener('click', ctrlAddItem)

    document.addEventListener('keypress', function (e) {

        if (e.keyCode === 13 || e.which === 13) {
            ctrlAddItem()
        }

    })

})(budgetController, UIController)