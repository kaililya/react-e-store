import React from 'react';
import styles from './about-page.module.css'

function AboutPage() {
  return (
    <section className={styles.main_container}>
    {/* <button>
      <span></span>
      <span></span>
    </button> */}
      <h2 className={styles.title}>Frequently asked</h2>
      <ul className={styles.accordion}>
        <li className={styles.accordion_item}>
          <input className={styles.accordion_trigger} type="checkbox" name="accordion" id="1" />
            <label className={styles.accordion_label} htmlFor="1">How does Nayzak work?</label>
            <div className={styles.accordion_content}>
              <p className={styles.accordion_text}>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum fuga.</p>
            </div>
        </li>
        <li className={styles.accordion_item}>
          <input className={styles.accordion_trigger} type="checkbox" name="accordion" id="2" />
            <label className={styles.accordion_label} htmlFor="2">Which payment methods are accepted?</label>
            <div className={styles.accordion_content}>
              <p className={styles.accordion_text}>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum fuga.</p>
            </div>
        </li>
        <li className={styles.accordion_item}>
          <input className={styles.accordion_trigger} type="checkbox" name="accordion" id="3" />
            <label className={styles.accordion_label} htmlFor="3">How to get familiar with Figma?</label>
            <div className={styles.accordion_content}>
              <p className={styles.accordion_text}>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum fuga.</p>
            </div>
        </li>
        <li className={styles.accordion_item}>
          <input className={styles.accordion_trigger} type="checkbox" name="accordion" id="4" />
            <label className={styles.accordion_label} htmlFor="4">Can I get a refund?</label>
            <div className={styles.accordion_content}>
              <p className={styles.accordion_text}>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum fuga.</p>
            </div>
        </li>
        <li className={styles.accordion_item}>
          <input className={styles.accordion_trigger} type="checkbox" name="accordion" id="5" />
            <label className={styles.accordion_label} htmlFor="5">Where is my order?</label>
            <div className={styles.accordion_content}>
              <p className={styles.accordion_text}>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum fuga.</p>
            </div>
        </li>
        <li className={styles.accordion_item}>
          <input className={styles.accordion_trigger} type="checkbox" name="accordion" id="6" />
            <label className={styles.accordion_label} htmlFor="6">I have a problem</label>
            <div className={styles.accordion_content}>
              <p className={styles.accordion_text}>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum fuga.</p>
            </div>
        </li>
      </ul>
    </section>
  )
}

export default AboutPage