import { IClass, IClassNum } from "../pages/Final";

export function calculateFinal(input: IClassNum) {
  const sem1Final = input.sem1Grade * (1 - input.examWeight) / 2;
  const sem2Final = input.sem2Grade * (1 - input.examWeight) / 2;
  const result = (input.targetGrade - sem1Final - sem2Final) / input.examWeight;
  
  return result;
}

export function parseInput(fieldsInput: IClass[], resultsInput: string[]) {
  let errors = new Set<number>();

  for(let i = 0; i < fieldsInput.length; i++) {
    let curr = {...fieldsInput[i]};

    if(curr.sem1Grade === '' || curr.sem2Grade === '' || curr.examWeight === '' || curr.targetGrade === '') {
      errors.add(i + 1);
      continue;
    }

    let currNum: IClassNum = {
      sem1Grade: Number.MAX_SAFE_INTEGER,
      sem2Grade: Number.MAX_SAFE_INTEGER,
      examWeight: Number.MAX_SAFE_INTEGER,
      targetGrade: Number.MAX_SAFE_INTEGER
    }; 

    if(!isNaN(+curr.sem1Grade)) {
      currNum.sem1Grade = parseFloat(curr.sem1Grade);
    } else {
      errors.add(i + 1);
      continue;
    }

    if(!isNaN(+curr.sem2Grade)) {
      currNum.sem2Grade = parseFloat(curr.sem2Grade);
    } else {
      errors.add(i + 1);
      continue;
    }

    if(!isNaN(+curr.targetGrade)) {
      currNum.targetGrade = parseFloat(curr.targetGrade);
    } else {
      errors.add(i + 1);
      continue;
    }

    if(!isNaN(+curr.examWeight) && curr.examWeight.charAt(0) === '0' && curr.examWeight.charAt(1) === '.') {
      currNum.examWeight = parseFloat(curr.examWeight);
    } else if(!isNaN(+curr.examWeight) && curr.examWeight.charAt(0) === '.') {
      currNum.examWeight = parseFloat(curr.examWeight);
    } else if(!isNaN(+curr.examWeight)) {
      currNum.examWeight = parseFloat(curr.examWeight) / 100;
    } else if(curr.examWeight.charAt(curr.examWeight.length - 1) === '%' && curr.examWeight.substring(0, curr.examWeight.length - 1)) {
      currNum.examWeight = parseFloat(curr.examWeight.substring(0, curr.examWeight.length - 1)) / 100;
    } else {
      errors.add(i + 1);
      continue;
    }

    if(
      currNum.sem1Grade === Number.MAX_SAFE_INTEGER ||
      currNum.sem2Grade === Number.MAX_SAFE_INTEGER || 
      currNum.examWeight === Number.MAX_SAFE_INTEGER || 
      currNum.targetGrade === Number.MAX_SAFE_INTEGER
    ) {
      errors.add(i + 1);
      continue;
    }

    const n = calculateFinal(currNum);
    resultsInput[i] = (Math.round(n * 100) / 100).toString();

    //console.log(currResults[i]);
  }

  let result: [string[], Set<number>] = [resultsInput, errors]
  return(result);
}