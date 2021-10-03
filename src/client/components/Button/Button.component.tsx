import classNames from 'classnames'
import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactElement
  onClick?: () => void
  className?: string
}

export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button className={classNames(styles.button, className)} onClick={onClick}>
      {children}
    </button>
  )
}

Button.displayName = 'Button'