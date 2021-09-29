import React, {useState} from 'react'

function Calculator() {
    const[display, setDisplay] = useState("");
    const[memory, setMemory] = useState("");
    const[operator, setOperator] = useState("");

    const buttons = [["1", "2", "3", "+"], ["4", "5", "6", "-"], ["7", "8", "9", "*"], ["0", "00", ".", "/"]];

    const operandHandler = (e) => {
        const value = e.target.innerText;
        if (value === "." && display.includes(".")) {
            return;
        }
        if ((value === "0" || value === "00") && display === "0") {
            return;
        }
        if (value === "00" && display === "") {
            setDisplay("0");
            return;
        }
        setDisplay(`${display}${e.target.innerText}`);
    };
    
    const operatorHandler = (e) => {
        if (memory === "") {
            setMemory(display);
            setDisplay("");
            setOperator(e.target.innerText);
        } else if (display !== "") {
            const result = calculate();
            setDisplay(result.toString());
            const operatorToCheck = e.target.innerText;
            if (operatorToCheck !== "=") {
                setOperator(operatorToCheck);
                setMemory("");
            }
        }
    };

    const calculate = () => {
        switch (operator) {
            case "+":
                return Number.parseFloat(memory) + Number.parseFloat(display); 
            case "-":
                return Number.parseFloat(memory) - Number.parseFloat(display); 
            case "*":
                return Number.parseFloat(memory) * Number.parseFloat(display); 
            case "/":
                return Number.parseFloat(memory) / Number.parseFloat(display); 
            default:
                return;
        };
    };

    const clearHandler = () => {
        setDisplay("");
        setMemory("");
        setOperator("");
    }

    const deleteHandler = () => {
        if (display === "" && memory !== ""){
            setDisplay(memory.substring(0, memory.length - 1));
        }
        setDisplay(display.substring(0, display.length - 1));
    };


    const oppositeHandler = () => {
        if (display === "") {
            setDisplay("-");
        } else if (display === "-") {
            setDisplay("")
        } else {
            setDisplay((display * -1).toString());
        }
    };

    return (
        <main>
            <div className="calculator">
                <div className="inner">
                    <div className="display">
                        <p id="displayNumber">{display}</p>
                    </div>
                    <div className="buttons">
                    <div className="row">
                            <button id="ac" onClick={clearHandler}>AC</button>
                            <button id="del" onClick={deleteHandler}>DEL</button>
                            <button id="opposite" onClick={oppositeHandler}>- / +</button>
                            <button className="operator" onClick={operatorHandler}>=</button>
                        </div>
                        {buttons.map(button => {
                            return <div key={button.toString()} className="row">
                                        <button key={button[0].toString()} className="operand" onClick={operandHandler}>{button[0]}</button>
                                        <button key={button[1].toString()} className="operand" onClick={operandHandler}>{button[1]}</button>
                                        <button key={button[2].toString()} className="operand" onClick={operandHandler}>{button[2]}</button>
                                        <button key={button[3].toString()} className="operator" onClick={operatorHandler}>{button[3]}</button>
                                    </div>
                        })}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Calculator
