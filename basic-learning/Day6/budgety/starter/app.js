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

    var calcTotal = function (type) {
        var sum = 0;
        data.allItem[type].forEach(function (cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    }

    var data = {
        allItem: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0,
        percentage: -1
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

        calcBudget: function () {

            calcTotal('inc');
            calcTotal('exp');

            data.budget = data.totals.inc - data.totals.exp;

            if (data.totals.inc) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
            }
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
        expenseContainer: '.expenses__list',
        totalBudgetValue: '.budget__value',
        totalIncValue: '.budget__income--value',
        totalExpValue: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DomString.getType).value,
                description: document.querySelector(DomString.getDescription).value,
                value: parseFloat(document.querySelector(DomString.getValue).value)
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

        clearField: function () {
            var field, fieldarr;

            field = document.querySelectorAll(DomString.getDescription + ',' + DomString.getValue);
            fieldarr = Array.prototype.slice.call(field);

            fieldarr.forEach((cur) => {
                cur.value = '';
            });

            fieldarr[0].focus();
        },

        displayBudget: function (obj) {

            document.querySelector(DomString.totalBudgetValue).textContent = obj.budget;
            document.querySelector(DomString.totalIncValue).textContent = obj.totalInc;
            document.querySelector(DomString.totalExpValue).textContent = obj.totalExp;

            if (obj.percentage > 0) {
                document.querySelector(DomString.percentageLabel).textContent = obj.percentage + '%';
            }
            else {
                document.querySelector(DomString.percentageLabel).textContent = '---';
            }
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

    var updateBudget = function () {
        budgetCtrl.calcBudget();

        var budget = budgetCtrl.getBudget();

        UICtrl.displayBudget(budget);
    }

    var ctrlAddItem = function () {

        var input, newItem;

        input = UICtrl.getInput();
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            UICtrl.addListItem(newItem, input.type);

            UICtrl.clearField();

            updateBudget();
        }
    }

    return {
        init: function () {
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
            setupAddEvent();
        }
    }
})(budgetController, UIController)

controller.init()