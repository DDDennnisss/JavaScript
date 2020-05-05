// BUDGET CONTROLLER
var budgetController = (function () {

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItem: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
    }

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            if (data.allItem[type].length > 0) {
                ID = data.allItem[type][data.allItem[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            console.log(data)
            if (type === 'inc') {
                newItem = new Income(ID, des, val)
            } else if (type === 'exp') {
                newItem = new Expense(ID, des, val)
            }

            data.allItem[type].push(newItem);
            return newItem;
        },

        testing: function () {
            console.log(data)
        }
    }



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

    var setupAddEvent = function () {

        var DOM = UICtrl.getDomString();

        document.querySelector(DOM.getBtn).addEventListener('click', ctrlAddItem)
        document.addEventListener('keypress', function (e) {

            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        })
    }

    var ctrlAddItem = function () {
        var input = UICtrl.getInput();
        var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    }

    return {
        init: function () {
            setupAddEvent();
        }
    }
})(budgetController, UIController)

controller.init()