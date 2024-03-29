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
        this.percentage = -1;
    }

    Expense.prototype.calcPercentage = function (totalIncome) {

        if (totalIncome > 0) {
            this.percentage = Math.round((this.value) / totalIncome * 100);
        } else {
            this.percentage = -1;
        }
    }

    Expense.prototype.getPercentage = function () {
        return this.percentage;
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

        calculatePercentage: function () {
            data.allItem.exp.forEach(function (cur) {
                cur.calcPercentage(data.totals.inc);
            })
        },

        getPercentage: function () {
            var allPercent = data.allItem.exp.map(function (cur) {
                return cur.getPercentage();
            })
            return allPercent;
        },
        deleteItem: function (type, id) {
            var ids, index;

            ids = data.allItem[type].map(function (cur) {
                return cur.id;
            })

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItem[type].splice(index, 1);
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
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensePercentLabel: '.item__percentage',
        dateLabel: '.budget__title--month',
    }

    var formatNumber = function (num, type) {
        var numSplit, int, dec;

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        l = int.length;
        for (var i = 1; 3 * i < l; i++) {
            int = int.substring(0, l - 3 * i) + ',' + int.substring(l - 3 * i);
        }

        dec = numSplit[1];
        return (type === 'inc' ? '+' : '-') + int + '.' + dec;
    };

    var nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        
        getInput: function () {
            return {
                type: document.querySelector(DomString.getType).value,
                description: document.querySelector(DomString.getDescription).value,
                value: parseFloat(document.querySelector(DomString.getValue).value)
            };
        },

        addListItem: function (obj, type) {

            var html, newHTML, element;

            if (type === 'inc') {
                element = DomString.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div> ';
            }
            else if (type === 'exp') {
                element = DomString.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%percent%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            //change HTML
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));

            //insert html
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML)
        },

        deleteListItem: function (selectorID) {
            var element = document.getElementById(selectorID);

            element.parentNode.removeChild(element);
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
            var type;

            obj.budget >= 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DomString.totalBudgetValue).textContent = formatNumber(obj.budget, type);
            document.querySelector(DomString.totalIncValue).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DomString.totalExpValue).textContent = formatNumber(obj.totalExp, 'exp');

            if (obj.percentage > 0) {
                document.querySelector(DomString.percentageLabel).textContent = obj.percentage + '%';
            }
            else {
                document.querySelector(DomString.percentageLabel).textContent = '---';
            }
        },

        displayPercentage: function (percentage) {
            var label = document.querySelectorAll(DomString.expensePercentLabel); //Node list?

            nodeListForEach(label, function (cur, index) {
                if (percentage[index] > 0) {
                    cur.textContent = percentage[index] + '%';
                }
                else {
                    cur.textContent = '---';
                }
            })
        },

        displayMonth: function(){
            var now , year, month, months;

            now = new Date();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            year = now.getFullYear();

            document.querySelector(DomString.dateLabel).textContent = months[month]+' '+year;
            
        },

        changedType: function(){

            var fields = document.querySelectorAll(
                DomString.getType + ',' +
                DomString.getDescription + ',' +
                DomString.getValue
                )
            
                nodeListForEach(fields, function(cur){
                    cur.classList.toggle('red-focus')
                });

                document.querySelector(DomString.getBtn).classList.toggle('red')
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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOM.getType).addEventListener('change', UICtrl.changedType);
    }

    var updateBudget = function () {
        budgetCtrl.calcBudget();

        var budget = budgetCtrl.getBudget();

        UICtrl.displayBudget(budget);
    }

    var updatePercentage = function () {

        budgetCtrl.calculatePercentage();

        var percentage = budgetCtrl.getPercentage();

        UICtrl.displayPercentage(percentage);

    }

    var ctrlAddItem = function () {

        var input, newItem;

        input = UICtrl.getInput();
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            UICtrl.addListItem(newItem, input.type);

            UICtrl.clearField();

            // reupdate budget and percentages
            updateBudget();
            updatePercentage();
        }
    }

    var ctrlDeleteItem = function (e) {
        var ItemID, splitID, ID;

        ItemID = e.target.parentNode.parentNode.parentNode.parentNode.id;
        if (ItemID) {
            splitID = ItemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            budgetCtrl.deleteItem(type, ID);
            UICtrl.deleteListItem(ItemID);

            // reupdate budget and percentages
            updateBudget();
            updatePercentage();
        }


    }

    return {
        init: function () {
            UICtrl.displayMonth()
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