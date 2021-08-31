import { Layout } from 'antd';
import styles from './styles.module.less';

const { Header } = Layout;

export default function HeaderMenu() {
  return (
    <Header
      className={styles.HeaderMenu}
    />
  );
}
