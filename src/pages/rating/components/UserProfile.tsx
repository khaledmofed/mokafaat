import { userPlaceholder } from "@assets";

export const UserProfile = ({
  photo,
  fullName,
}: {
  photo: string | undefined;
  fullName: string;
}) => (
  <div
    className="user flex gap-3 items-center border-b border-gray-100 p-4 wow fadeInUp"
    data-wow-delay="0.2s"
  >
    <img
      src={photo || userPlaceholder}
      alt={fullName}
      className="user-image w-20 h-20 rounded-full object-cover object-center"
      onContextMenu={(e) => e.preventDefault()}
      draggable={false}
    />
    <h2 className="font-bold text-sm capitalize font-readex-pro">{fullName}</h2>
  </div>
);
