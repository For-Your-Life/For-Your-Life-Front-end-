import styles from './footer.module.scss';
const Footer = () => {
  const now = new Date();
  const year = now.getFullYear();
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <span>개인정보처리방침</span>
        <span>사이트맵</span>
        <span>자료출처</span>
      </div>
      <div className={styles.bottom}>
        <div className={styles.logo}>For Your Life</div>
        <div className={styles.copyright}>
          <div className={styles.span}>
            Copyrightⓒ{year} All rights reserved.
          </div>
          <div className={styles.span}>
            (주)지인플러스&nbsp;&nbsp;&nbsp;주소 : 부산광역시 부산진구 전포대로
            216번길 7, 2층 (전포동, 경남빌딩)&nbsp;&nbsp;&nbsp;대표이사 :
            정민하&nbsp;&nbsp;&nbsp;사업자등록번호 : 329-81-00685
          </div>
          <div className={styles.span}>E-mail : geon0529@gmail.com</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
