import styles from './FooterCopyright.module.scss';
import footerDecor from './../../../assets/footer-decoration.png';

function FooterCopyright() {
  return (
    <div className={styles.copyright}>
      <span>&copy; 2023 All Rights Reserved.</span>
      <span>Terms of Service</span>
      <img className={styles.decor} src={footerDecor} alt="decor" />
    </div>
  );
}

export default FooterCopyright;
