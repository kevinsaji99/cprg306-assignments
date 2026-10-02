import NewItem from './new-item';  

export default function Page() {
    return (
        <main className = 'min-h-screen hg-black text-white p-8'>
            <h1 className = 'text-3xl font-bold mb-6'>New Shopping List Item
            </h1>
            <NewItem />
        </main>
    )
}