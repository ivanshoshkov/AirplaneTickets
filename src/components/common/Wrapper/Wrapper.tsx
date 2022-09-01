import styles from './Wrapper.module.scss'

type WrapperProps = {
children : JSX.Element | JSX.Element[]
}

export const Wrapper:React.FC<WrapperProps> = ({children}) => {
    return(
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}