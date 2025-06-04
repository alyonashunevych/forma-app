import { BaseExerciseResponseDto } from "./BaseExerciseResponseDto";
import { BaseSetResponseDto } from "./BaseSetResponseDto";

export interface BaseExToPositionResponseDto {
  id: string;
  baseExercise: BaseExerciseResponseDto;
  position: number;
  baseSets: BaseSetResponseDto[];
}