import { Practitioner } from '../../types/practitioners';
import PractitionerCard from './PractitionerCard';

interface PractitionersListProps {
  practitioners: Practitioner[];
}

export default function PractitionersList({ practitioners }: PractitionersListProps) {
  return (
    <div className="space-y-4">
      {practitioners.map((practitioner) => (
        <PractitionerCard key={practitioner.id} practitioner={practitioner} />
      ))}
    </div>
  );
}