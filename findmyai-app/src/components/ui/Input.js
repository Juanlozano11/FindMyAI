export const Input = ({ type = 'text', value, onChange, className = "" }) => (
    <input 
      type={type}
      value={value}
      onChange={onChange}
      className={`input ${className}`}
    />
  )
  