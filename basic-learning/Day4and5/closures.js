//closure workflow
function retirement(retirementAge) {
    var a = ' years left until retirement';
    return function (yearOfBirth) {
        var age = 2016 - yearOfBirth;
        console.log((retirementAge - age) + a); // outer parameter still working in inner function even outer function is return 
    }
}

var retirementUS = retirement(66);
retirementUS(1990);

retirement(66)(1990);