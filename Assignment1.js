var john = {
    fullName: "John Smith",
    bills:[124,48,268,180,42],
    calcTips: function(){
        this.tips=[];
        this.finalValue=[];

        for (var i=0; i<this.bills.length; i++){
            var percentage;
            var bill = this.bills[i];

            if(bill<50){
                percentage=0.2;
            }
            else if (bill>=50 && bill< 200){
                percentage=0.15;
            }
            else{
                percentage=0.1;
            }
            this.tips[i] = bill*percentage;
            this.finalValue = bill + this.tips[i];
        }

    }
}
var mark = {
    fullName: "Mark Smith",
    bills:[77,475,110,45],
    calcTips: function(){
        this.tips=[];
        this.finalValue=[];

        for (var i=0; i<this.bills.length; i++){
            var percentage;
            var bill = this.bills[i];

            if(bill<50){
                percentage=0.2;
            }
            else if (bill>=50 && bill< 200){
                percentage=0.1;
            }
            else{
                percentage=0.25;
            }
            this.tips[i] = bill*percentage;
            this.finalValue = bill + this.tips[i];
        }

    }
}

function calcAverageTips(tips){
    var sum = 0;

    for (var i=0; i<tips.length;i++){
        sum +=tips[i]
    }
    var aveSum = sum/tips.length;
    return aveSum;
}

john.calcTips()
john.average = calcAverageTips(john.tips)
console.log(john)