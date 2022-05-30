class Calculator {
    constructor(previousResultBtn, currentResultBtn){
        this.previousResultBtn = previousResultBtn;
        this.currentResultBtn = currentResultBtn;
        this.clear();
    }

    clear(){
        this.currentResult = "";
        this.previousResult = "";
        this.operation = undefined;
    }

    addNumber(number){
        if(number === "."){
            if(this.currentResult.includes(".")) return
        }
        this.currentResult = this.currentResult.toString() + number.toString();
    }

    chooseOperation(operator){
        if(this.currentResult === "" ) return;
        if(this.previousResult !== ""){
            this.count()
        }

        this.operation = operator; 
        this.previousResult = `${this.currentResult}${this.operation}`;
        this.currentResult = "";
    }

    count(){
        let coutnResult;
        const prev = parseFloat(this.previousResult);
        const curr = parseFloat(this.currentResult);

        if(isNaN(prev) || isNaN(curr)) return;

        switch(this.operation){
            case "+":
                coutnResult = prev + curr;
                break
            case "-":
                coutnResult = prev - curr;
                break
            case "×":
                coutnResult = prev * curr;
                break
            case "÷":
                coutnResult = prev / curr;
                break
            default:
                return
        }

        this.currentResult = coutnResult;
        this.operation = undefined;
        this.previousResult = "";

    }

    updateResult(){
        this.currentResultBtn.textContent = this.currentResult;
        this.previousResultBtn.textContent = this.previousResult;
    }
}

const previousResultBtn = document.querySelector("[data-previousResult]");
const currentResultBtn = document.querySelector("[data-currentResult]");

const operatorsBtns = document.querySelectorAll(".operators span");
const numbersBtns = document.querySelectorAll(".numbers span");
const equalBtn = document.querySelector("[data-equal]");

const clearBtn = document.querySelector("[data-clear]");


const calculator = new Calculator(previousResultBtn, currentResultBtn);

numbersBtns.forEach(number => {
    number.addEventListener("click", (e) =>{
        calculator.addNumber(e.target.textContent);
        calculator.updateResult();
    })
})

operatorsBtns.forEach(operation => {
    operation.addEventListener("click", () =>{
        calculator.chooseOperation(operation.textContent);
        calculator.updateResult();
    })
})

equalBtn.addEventListener("click", () =>{
    calculator.count();
    calculator.updateResult();
    calculator.clear();
})

clearBtn.addEventListener("click", () =>{
    calculator.clear();
    calculator.updateResult();
})