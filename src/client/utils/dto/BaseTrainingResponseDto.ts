import { BaseExToPositionResponseDto } from "./BaseExToPositionResponseDto";

export interface BaseTrainingResponseDto {
  name: string;
  description: string | null;
  baseExToPositions: BaseExToPositionResponseDto[];
}