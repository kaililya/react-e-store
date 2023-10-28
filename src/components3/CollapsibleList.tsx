import { useState } from 'react';

export default function CollapsibleList({
  title,
  children,
  // actionButton,
  defaultVisible,
}: {
  title: string;
  children: React.ReactNode;
  // actionButton?: React.ReactNode;
  defaultVisible?: boolean;
}) {
  const [visible, setVisible] = useState(defaultVisible);

  return (
    <div className="">
      <div className={''}>
        <button
          onClick={() => setVisible((visible) => !visible)}
          className={
            '' +
            (visible ? ' light-purple' : '')
          }
        >
          {title}
        </button>
        {/* <div className="">{actionButton}</div> */}
      </div>
      {visible ? <ul className="">{children}</ul> : null}
    </div>
  );
}
