import { Layout } from 'antd';
import styles from './styles.module.less';

const { Footer } = Layout;

export default function FooterMenu() {
  return (
    <Footer className={styles.FooterMenu}>MBS ©2021 Created by 文竹</Footer>
  );
}
