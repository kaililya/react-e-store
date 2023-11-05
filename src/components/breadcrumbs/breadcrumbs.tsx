import React from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import styles from './breadcrumbs.module.css'

type TBreadcrumbs = {
  customInlineStyle: React.CSSProperties;
}

const Breadcrumbs = ({ customInlineStyle }:TBreadcrumbs):JSX.Element => {
  
  const breadcrumbs = useBreadcrumbs();
  return (
    <div className={styles.main_container} style={customInlineStyle}>
      {breadcrumbs.map(({ breadcrumb, match }, index) => (
        <div className="" key={index}>
          {/* @ts-ignore */}
          <Link className={styles.link} to={match || ""}>{decodeURI(breadcrumb.props.children)}</Link>
          {index < breadcrumbs.length - 1 && "  /"}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;