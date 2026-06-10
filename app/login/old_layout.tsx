const inputClass = "w-full mt-1 px-3 py-2 rounded-md border border-zinc-600 bg-zinc-800 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";
const labelClass = "block text-sm font-medium text-zinc-300";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

export function formattedInput(fieldName: string, labelText: string, type: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) {
    return <div>
        <label htmlFor={fieldName} className={labelClass}>{labelText}</label>
        <input id={fieldName} name={fieldName} type={type} value={value} onChange={onChange} className={inputClass} required/>
    </div>
}

export function Selector({fieldName, labelText, value, onChange, options}: {fieldName: string; labelText: string; value: string; onChange: (value: string) => void; options: string[]}) {
    return (
        <div>
            <label htmlFor={fieldName} className={labelClass}>{labelText}</label>
            <select
                id={fieldName}
                value={value}
                onChange={ (e) => onChange(e.target.value) }
                className={inputClass}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option === 'voluntario' ? 'Voluntário' : 'Organizador'}
                    </option>
                ))}
             </select>
        </div>
    )
}