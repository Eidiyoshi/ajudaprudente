const inputClass = "w-full mt-1 px-3 py-2 rounded-md border border-zinc-600 bg-zinc-800 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";
    const labelClass = "block text-sm font-medium text-zinc-300";
    const errorClass = "text-red-400 text-xs mt-1";


export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

export function divLayout(fieldName: string, labelText: string, type: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, error: string | undefined) {
    return <div>
        <label htmlFor={fieldName} className={labelClass}>{labelText}</label>
        <input id={fieldName} name={fieldName} type={type} value={value} onChange={onChange} className={inputClass} placeholder={`Ex: ${labelText}`}/>
        {error && <span className={errorClass}>{error}</span>}
    </div>
}