import { Experience } from "@interfaces";

export interface ExperienceRowProps {
  experience: Experience;
  index: number;
  onDelete: (index: number) => void;
}
