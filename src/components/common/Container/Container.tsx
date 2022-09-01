import styles from "./Container.module.scss";

type ContainerProps = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export const Container: React.FC<ContainerProps> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      {children}
    </div>
  );
};
