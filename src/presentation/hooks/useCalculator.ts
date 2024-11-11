import { useRef, useState } from "react"

enum Operators {
    add,
    subtract,
    multiply,
    divide
}




export const useCalculator = () => {


   const [ number, setNumber ] = useState("0");
   const [ prevNumber, setPrevNumbers ] = useState("0");

const lastOperator =  useRef<Operators>();



   const cleanResult = () => {
    setNumber('0');
    setPrevNumbers('0')
   }


   const deleteOperation = () => {
    let currentSign = '';

    let temporalNumber = number;

    if(number.includes('-')){
        currentSign = '-'
        temporalNumber = number.substring(1)
    }

    if(temporalNumber.length > 1){
      return setNumber(currentSign + temporalNumber.slice(0, -1))
    }
    setNumber('0')
   }

   const toggleSign = () => {
    if(number.includes('-')){
        return setNumber( number.replace('-', ''))
    }
    setNumber( '-' + number )
   }

   const buildNumber = (numberString: string ) => {

    if(number.includes('.') && numberString === '.')return;


    if(number.startsWith('0') || number.startsWith('-0')){
        //punto decimal
        if(numberString === '.')
            return setNumber(number + numberString)
    

    //evaluar si es otro cero y no hay punto
    if( numberString === '0' && number.includes('.')){
        return setNumber(number + numberString);
    }


    //evaluar si es diferente de cero, no hay punto decimal y es el primer numero
    if( numberString !== '0' && !number.includes('.')){
        return setNumber( numberString)
    }

    //Evitar 0000
    if(numberString === '0' && number.includes('.')){
        return ;
    }

    return setNumber( number + numberString)

   }


    setNumber( number + numberString );

}


const setLastNumber = () => {

    if(number.endsWith('.')){
        setPrevNumbers( number.slice(0, -1))
    } else {
        setPrevNumbers( number )
    }
    setNumber('0');
}

const divideOperations = () => {
    setLastNumber();
    lastOperator.current =  Operators.divide;
}
const multiplyOperations = () => {
    setLastNumber();
    lastOperator.current =  Operators.multiply;
}
const subtractOperations = () => {
    setLastNumber();
    lastOperator.current =  Operators.subtract;
}
const addOperations = () => {
    setLastNumber();
    lastOperator.current =  Operators.add;
}


const calculateResult = () => {

    const num1 = Number( number);
    const num2 = Number( prevNumber );

    switch (lastOperator.current) {
        case Operators.add:
            setNumber(`${num1 + num2}`)
            break;
        case Operators.subtract:
            setNumber(`${num2 - num1}`)
            break;
        case Operators.divide:
            setNumber(`${num2 / num1}`)
            break;
        case Operators.multiply:
            setNumber(`${num1 * num2}`)
            break;
        
        default:
        throw new Error('operation no salio')
    }

    setPrevNumbers('0')

}




    return {
        //properties
        number,
        prevNumber,


        //methods
        buildNumber,
        cleanResult,
        toggleSign,
        deleteOperation,
        setLastNumber,
        divideOperations,
        multiplyOperations,
        subtractOperations,
        addOperations,
        calculateResult

    }
}