import styles from "./DigiGrowOrbitalScene.module.css";

export default function DigiGrowOrbitalScene() {
  return (
    <div className={styles.sceneWrap} aria-hidden="true">
      <div className={styles.backGlow} />
      <div className={styles.backGlowSecondary} />

      <div className={styles.scene}>
        <div className={styles.gridPlate} />

        <div className={`${styles.ring} ${styles.ringOuter}`}>
          <span className={`${styles.ringDot} ${styles.ringDotOne}`} />
        </div>
        <div className={`${styles.ring} ${styles.ringMiddle}`}>
          <span className={`${styles.ringDot} ${styles.ringDotTwo}`} />
        </div>
        <div className={`${styles.ring} ${styles.ringInner}`}>
          <span className={`${styles.ringDot} ${styles.ringDotThree}`} />
        </div>

        <article className={`${styles.card} ${styles.cardOne}`}>
          <p className={styles.cardEyebrow}>Search</p>
          <p className={styles.cardTitle}>SEO and local presence</p>
          <p className={styles.cardText}>
            Visibility work that helps DigiGrow clients get found before the sales call starts.
          </p>
        </article>

        <article className={`${styles.card} ${styles.cardTwo}`}>
          <p className={styles.cardEyebrow}>Campaigns</p>
          <p className={styles.cardTitle}>Paid growth with reporting</p>
          <p className={styles.cardText}>
            Offers, landing pages, and ad feedback loops that are easier to explain and improve.
          </p>
        </article>

        <article className={`${styles.card} ${styles.cardThree}`}>
          <p className={styles.cardEyebrow}>Portal</p>
          <p className={styles.cardTitle}>Client visibility built in</p>
          <p className={styles.cardText}>
            Updates, invoices, and progress stay in one DigiGrow experience instead of scattered threads.
          </p>
        </article>

        <article className={`${styles.card} ${styles.cardFour}`}>
          <p className={styles.cardEyebrow}>Mobile</p>
          <p className={styles.cardTitle}>Accessible beyond desktop</p>
          <p className={styles.cardText}>
            The DigiGrow platform can travel with the team and the client instead of living in one browser tab.
          </p>
        </article>

        <div className={`${styles.satellite} ${styles.satelliteOne}`}>AI proposals and cleaner discovery</div>
        <div className={`${styles.satellite} ${styles.satelliteTwo}`}>Strategy, execution, reporting, one rhythm</div>

        <div className={styles.core}>
          <div>
            <div className={styles.brandChip}>DG</div>
            <p className={styles.coreLabel}>DigiGrow stack</p>
            <p className={styles.coreTitle}>Digital growth system</p>
            <p className={styles.coreText}>
              Websites, campaigns, reporting, portal access, and delivery visibility layered into one business experience.
            </p>
          </div>

          <div className={styles.pulseRow}>
            <span className={styles.pulse} />
            <span className={styles.pulse} />
            <span className={styles.pulse} />
          </div>
        </div>
      </div>
    </div>
  );
}
