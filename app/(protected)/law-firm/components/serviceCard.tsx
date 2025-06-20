// components/ServiceCard.tsx

type Props = {
  title: string;
  price: string;
  description: string;
};

export default function ServiceCard({ title, price, description }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-blue-600 text-lg font-bold">{price}</span>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
    </div>
  );
}
