export default function Card({ as: Component = 'div', className = '', children, ...props }) {
  return <Component className={`common-card ${className}`.trim()} {...props}>{children}</Component>
}
