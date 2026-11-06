export default function Item({name, quantity, category}) {
  return (
    <li className="p-4 m-2 max-w-sm bg-slate-800 rounded-lg border-1-4 border-emerald-500">
        <h2 className="text-lg font-bold text-emerald-300">{name}</h2>
        <p className="text-sm text-slate-300"> Buy {quantity} in <span className="capitalize">{category}</span></p>
    </li>
  );
}