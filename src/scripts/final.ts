import { IClassNum } from "../pages/Final";

export default function calculateFinal(input: IClassNum) {
  const sem1Final = input.sem1Grade * (1 - input.examWeight) / 2;
  const sem2Final = input.sem2Grade * (1 - input.examWeight) / 2;
  const result = (input.targetGrade - sem1Final - sem2Final) / input.examWeight;
  
  return result;
}