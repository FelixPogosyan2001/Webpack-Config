export default class Car {
    static id = Date.now();
    constructor(model){
        this.model = model
    }
    get view(){
        return 'Model of car is' + ' ' + this.model
    }
}

console.log(Car.id)