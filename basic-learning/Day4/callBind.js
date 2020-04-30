var Dennis = {
    name: 'Dennis',
    age: 24,
    job: 'designer',
    prensentation: function (style, timeofDate) {
        if (style === 'formal') {
            console.log(this.name+' ladis and gentleman' + timeofDate)
        }
        else if (style === 'friendly') {
            console.log('hey ya')
        }
        else {
            console.log('hi')
        }
    }
};

var Emily = {
    name: 'Emily'
}

// Dennis.prensentation.call(Emily,'formal') // call function

var bindDennis = Dennis.prensentation.bind(Emily, 'formal')
bindDennis('morning')