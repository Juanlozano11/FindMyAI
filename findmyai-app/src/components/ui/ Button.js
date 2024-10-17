export const Button = ({ children, onClick, className = "Button" }) => (
  <button className={`btn ${className}`} onClick={onClick}>
    {children}
  </button>
);
