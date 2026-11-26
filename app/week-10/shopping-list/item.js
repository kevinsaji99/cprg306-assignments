export default function Item({ name, quantity, category, onSelect }) {
  return (
    <li
      onClick={onSelect}
      className="p-4 my-2 bg-slate-800 rounded-lg border-l-4 border-emerald-500 cursor-pointer hover:bg-slate-700"
    >
      <h2 className="text-lg font-bold text-emerald-300">{name}</h2>
      <p className="text-sm text-slate-300">
        Buy {quantity} in <span className="capitalize">{category}</span>
      </p>
    </li>
  );
}