import React, { useState } from 'react';
import './Final.css'

import calculateFinal from '../scripts/final';

interface IClass {
  sem1Grade: string;
  sem2Grade: string;
  examWeight: string;
  targetGrade: string;
}

type IClassKey = keyof IClass;

export interface IClassNum {
  sem1Grade: number;
  sem2Grade: number;
  examWeight: number;
  targetGrade: number;
}

export default function Final() {
  const [inputFields, setInputFields] = useState<IClass[]>([{sem1Grade: '', sem2Grade: '', examWeight: '', targetGrade: ''},]);
  const [results, setResults] = useState<string[]>(['',]);

  const handleFormChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue: string = event.target.value;

    if(event.target.name === 'examWeight') {
      inputValue = inputValue.replace(/[^0123456789%.]/g, '');
    } else {
      inputValue = inputValue.replace(/[^0123456789.]/g, '');
    }

    let data: IClass[] = [...inputFields];
    const eventName = event.target.name as IClassKey;

    data[index][eventName] = inputValue;

    //console.log(data);
    setInputFields(data);
  }

  const addField = () => {
    let newFields: IClass = {sem1Grade: '', sem2Grade: '', examWeight: '', targetGrade: ''};
    let newResults: string = '';
    
    setInputFields([...inputFields, newFields]);
    setResults([...results, newResults])
  }

  const removeField = () => {
    let newFields: IClass[] = [...inputFields];
    let newResults: string[] = [...results];

    newFields.pop();
    newResults.pop();

    setInputFields(newFields);
    setResults(newResults);
  }

  const removeThatField = (index: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let newFields: IClass[] = [...inputFields];
    let newResults: string[] = [...results];

    event.preventDefault();

    const fieldIndex = newFields.indexOf(newFields[index], 0);
    const resultIndex = newResults.indexOf(newResults[index], 0);

    newFields.splice(fieldIndex, 1);
    newResults.splice(resultIndex, 1);

    setInputFields(newFields);
    setResults(newResults);
  }

  const parseFields = () => {
    const currInputFields: IClass[] = [...inputFields];
    let currResults: string[] = [...results];
    let errors = new Set<number>();

    for(let i = 0; i < currInputFields.length; i++) {
      let curr = {...currInputFields[i]};

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
      currResults[i] = (Math.round(n * 100) / 100).toString();

      //console.log(currResults[i]);
    }

    setResults(currResults);

    errors.forEach(i => {
      alert(`Error processing period ${i}`);
    });
  }

  const submit = (event: React.FormEvent) => {
    const data: IClass[] = [...inputFields];
    const finalResults: string[] = [...results];

    event.preventDefault();

    setInputFields(data);
    setResults(finalResults);

    parseFields();

    //console.log(inputFields);
  }

  return (
    <div className='final'>
      <div className='controls'>
        <button className='controls__button' onClick={addField}>Add another period</button>
        <button className='controls__button' onClick={removeField}>Remove a period</button>
        <button className='controls__button' onClick={submit}>Calculate</button>
      </div>
      <form className='form' onSubmit={submit}>
        {inputFields.map((input, index) => {
          return (
            <div className='form__entry' key={index + 1}>
              <label className='form__label'>
                <button className='form__delete' onClick={event => removeThatField(index, event)}></button>
                <input className='form__input form__input--semester' type='text' name='sem1Grade' placeholder='Semester 1' value={input.sem1Grade} onChange={event => handleFormChange(index, event)} />
                <input className='form__input form__input--semester' type='text' name='sem2Grade' placeholder='Semester 2' value={input.sem2Grade} onChange={event => handleFormChange(index, event)} />
                <input className='form__input form__input--weight' type='text' name='examWeight' placeholder='Exam weight(%)' value={input.examWeight} onChange={event => handleFormChange(index, event)} />
                <input className='form__input form__input--target' type='text' name='targetGrade' placeholder='Target grade' value={input.targetGrade} onChange={event => handleFormChange(index, event)} />
                <b className='form__result'>{results[index]}</b>
              </label>
            </div> 
          )
        })}
      </form>
    </div>
  );
}
