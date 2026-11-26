import Link from "next/link";

export default function Item({ id, name, quantity, category, onSelect, onDelete }) {
  return (
    <li
      onClick={onSelect}
      className="flex items-center justify-between p-4 my-2 bg-slate-800 rounded-lg border-l-4 border-emerald-500 cursor-pointer hover:bg-slate-700"
    >
      <div>
        <h2 className="text-lg font-bold text-emerald-300">{name}</h2>
        <p className="text-sm text-slate-300">
          Buy {quantity} in <span className="capitalize">{category}</span>
        </p>
      </div>
      <div className="flex gap-2 ml-4 shrink-0">
        <Link
          href={`/week-10/${id}`}
          onClick={(e) => e.stopPropagation()} // don't also select the item for meal ideas
          className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          Details
        </Link>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // don't also select the item for meal ideas
            onDelete();
          }}
          className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
