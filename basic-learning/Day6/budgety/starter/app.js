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
        getBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'

    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DomString.getType).value,
                description: document.querySelector(DomString.getDescription).value,
                value: document.querySelector(DomString.getValue).value
            };
        },

        addListItem: function (obj, type) {

            var html, newHTLM, element;

            if (type === 'inc') {
                element = DomString.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div> ';
            }
            else if (type === 'exp') {
                element = DomString.expenseContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            //change HTML
            newHTLM = html.replace('%id%', obj.id);
            newHTLM = newHTLM.replace('%description%', obj.description);
            newHTLM = newHTLM.replace('%value%', obj.value);

            //insert html
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTLM)
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

        var input, newItem;

        input = UICtrl.getInput();
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        UICtrl.addListItem(newItem, input.type);
    }

    return {
        init: function () {
            setupAddEvent();
        }
    }
})(budgetController, UIController)

controller.init()