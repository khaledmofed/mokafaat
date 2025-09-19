import { Experience } from "@interfaces";

export interface ExperienceTableProps {
  experiences: Experience[];
  onDeleteRow: (index: number) => void;
}
