import styles from './style.module.less';
import cn from 'classnames';

export default function Loading() {
  return (
    <div className={styles.bg}>
      <div className={styles.taiji}>
        <div className={cn(styles.tj_1, styles.tj_big_1)} />
        <div className={cn(styles.tj_1, styles.tj_big_2)} />
        <div className={cn(styles.tj_2, styles.tj_s1)}>
          <div className={cn(styles.tj_ss, styles.tj_w)} />
        </div>
        <div className={cn(styles.tj_2, styles.tj_s2)}>
          <div className={cn(styles.tj_ss, styles.tj_b)} />
        </div>
      </div>
    </div>
  )
};