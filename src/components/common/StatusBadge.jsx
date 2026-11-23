export default function StatusBadge({ variant = 'success', className = '', children }) {
  return <span className={`common-status-badge common-status-${variant} ${className}`.trim()}>{children}</span>
}
