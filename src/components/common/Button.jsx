export default function Button({ variant = 'primary', className = '', children, ...props }) {
  return <button className={`common-button common-button-${variant} ${className}`.trim()} {...props}>{children}</button>
}
