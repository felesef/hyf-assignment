class Student {
    _graduated = false;

    constructor(name, age, grade) {
        this._name = name;
        this._age = age;
        this._grade = grade;
    }
    study() {
        console.log(`${this.name} is studying`);
    }
    graduate() {
        this._graduated = true;
    }
}