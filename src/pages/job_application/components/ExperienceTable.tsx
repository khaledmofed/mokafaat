import { ExperienceTableProps } from "@interfaces";
import ExperienceRow from "./ExperienceRow";

const ExperienceTable: React.FC<ExperienceTableProps> = ({
  experiences,
  onDeleteRow,
}) => {
  return (
    <div className="border border-gray-100 rounded-lg">
      {experiences.map((experience, index) => (
        <ExperienceRow
          key={index}
          experience={experience}
          index={index}
          onDelete={onDeleteRow}
        />
      ))}
    </div>
  );
};

export default ExperienceTable;
