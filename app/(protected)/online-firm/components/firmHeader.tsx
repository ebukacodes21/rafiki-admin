// components/FirmHeader.tsx

type Props = {
  name: string;
  logo: string;
  description: string;
};

export default function FirmHeader({ name, logo, description }: Props) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-5xl mx-auto px-6 py-6 flex items-center space-x-4">
        <img
          src={logo}
          alt={`${name} Logo`}
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </header>
  );
}
