export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

export function divLayout(fieldName: string, labelClass: string, labelText: string, type: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void, inputClass: string, errorClass: string, error: string | undefined, optionArray?: string[] | undefined) {
    let field;

    if (type === 'textarea') {
        field = <textarea id={fieldName} name={fieldName} value={value} onChange={onChange} className={inputClass} placeholder={`Ex: ${labelText}`}/> 
    } else if (type === 'select' && optionArray) {
        field = <select id={fieldName} name={fieldName} value={value} onChange={onChange} className={inputClass}>
            {optionArray.map((option) => (
            <option key={option} value={option}>{option}</option>
            ))}
        </select>
        } else {
            field = <input id={fieldName} name={fieldName} type={type} value={value} onChange={onChange} className={inputClass} placeholder={`Ex: ${labelText}`}/>
        }
        
    return <div>
        <label htmlFor={fieldName} className={labelClass}>{labelText}</label>
        {field}
        {error && <span className={errorClass}>{error}</span>}
    </div>
}