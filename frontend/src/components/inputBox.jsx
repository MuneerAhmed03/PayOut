export function InputBox({label,placeholder,onChange,type}){
    return <div>
        <div className="font-bold text-md text-left py-2">{label}</div>
        <input type={type} onChange={onChange} placeholder={placeholder} className="w-full pz-2 py-1 px-2 border rounded border"/>
    </div>
}