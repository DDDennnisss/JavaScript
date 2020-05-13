class Element {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }
}

class Park extends Element {
    constructor(name, year, area, numTree) {
        super(name, year);
        this.area = area;
        this.numTree = numTree;
    }

    treeDensity() {
        const density = this.numTree / this.area;
        console.log(`${this.name} has a tree density of ${density} tree per square km.`);
    }

    averageAge() {
        let currentYear = new Date().getFullYear();

        let age = currentYear - this.year;
    }
}

class Street extends Element {
    constructor(name, year, length, size = 3) {
        super(name, year)
        this.length = length;
        this.size = size;
    }

    classifyStreet() {
        const classification = new Map();
        type.set(1, 'tiny');
        type.set(2, 'small');
        type.set(3, 'normal');
        type.set(4, 'big');
        type.set(5, 'huge');
        console.log(`${this.name}, build in ${this.year}, is a ${classification.get(this.size)} street.`)
    }
}

const allParks = [new Park('Green Park', 1987, 0.2, 215),
new Park('National Park', 1894, 2.9, 3541),
new Park('Oak Park', 1953, 0.4, 949)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
new Street('Evergreen Street', 2008, 2.7, 2),
new Street('4th Street', 2015, 0.8),
new Street('Sunset Boulevard', 1982, 2.5, 5)];

function calcArr(arr) {

    let sum = arr.reduce((prev, curr, index) => prev + curr, 0);
    return [sum, sum / arr.length];
}
function reportPark(p) {
    console.log('-----------Park Report-----------')
    p.forEach(el => el.treeDensity())

    // Average Age
    const ages = p.map(el => new Date().getFullYear() - el.year)
    const [totalAge, avgAge] = calcArr(ages);
    console.log(`Our ${p.length} parks have an average of ${Math.round(avgAge)} years`);

    // More than 1000 trees
    const i = p.map(el => el.numTree).findIndex(el => el >= 1000);

    console.log(`${p[i].name} has more than 1000 trees`)
}

function reportStreets(s) {
    console.log('-----------Street Report-----------')

}

reportPark(allParks);