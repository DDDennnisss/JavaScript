let observer_ids = 0;
let observed_ids = 0;

class Observer {
  constructor() {
    this.id = observer_ids++;
  }

  update(ob) {
    console.log('观察者' + this.id + `检测到被观察者${ob.id}变化`);
  }
}

class Observed {
  constructor() {
    this.observers = [];
    this.id = observed_ids++;
  }

  addObserver(observer) {
    this.observers.push(observer)
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(o => {
      return o.id != observer.id;
    })
  }

  notify() {
    this.observers.forEach(item => {
      item.update(this);
    })
  }
}

class Teacher extends Observer {
  constructor(name) {
    super();
    this.name = name;
  }

  update(st) {
    console.log(st.name + `提交了${this.name}作业`);
  }
}

class Student extends Observed {
  constructor(name) {
    super();
    this.name = name;
  }

  submitHomeWork() {
    this.notify()
  }
}

let teacher1 = new Teacher("数学");
let teacher2 = new Teacher("语文");
let stu1 = new Student("小玲");
let stu2 = new Student("小明");
let stu3 = new Student("小李");
stu1.addObserver(teacher1);
stu1.addObserver(teacher2);
stu2.addObserver(teacher1);
stu2.addObserver(teacher2);
stu3.addObserver(teacher1);
stu3.addObserver(teacher2);

stu1.submitHomeWork();
stu2.submitHomeWork();
stu3.submitHomeWork();


// Way 2
class Subject {
  constructor() {
    this.state = 0;
    this.observe = []
  }
  getState() {
    return this.state;
  }

  setState(value) {
    this.state = value;
    this.observer.forEach((item) => {
      item.update();
    })
  }

  addObserver(ob) {
    this.observe.push(ob);
  }
}

class observe {
  constructor(name, sub) {
    this.name = name;
    this.sub = sub;
    this.sub.addObserver(this);
  }

  update() {
    console.log(`${this.name} update, state:${this.sub.getState()}`);
  }
}