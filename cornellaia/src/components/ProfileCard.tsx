interface ProfileCardProps {
  imageSrc: string;
  name: string;
  role?: string;
  altText?: string;
}

export default function ProfileCard({
  imageSrc,
  name,
  role,
  altText,
}: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
        <img
          src={imageSrc}
          alt={altText || `${name}'s profile photo`}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold mb-1">{name}</h3>
      {role && <p className="text-gray-600 text-sm">{role}</p>}
    </div>
  );
}
