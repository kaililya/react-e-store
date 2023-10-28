import React from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import styles from './breadcrumbs.module.css'

const Breadcrumbs = ({customInlineStyle}:any) => {
  const breadcrumbs = useBreadcrumbs();
  // @ts-ignore
  // console.log(decodeURI(breadcrumb.props.children));
  return (
    <div className={styles.main_container} style={customInlineStyle}>
      {breadcrumbs.map(({ breadcrumb, match }, index) => (
        // @ts-ignorets
        <div className="" key={match}>
          {/* @ts-ignore */}
          <Link className={styles.link} to={match || ""}>{decodeURI(breadcrumb.props.children)}</Link>
          {index < breadcrumbs.length - 1 && "  /"}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;