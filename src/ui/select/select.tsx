import styles from './select.module.css'

interface SelectOption {
  label: string;
  value: string;
}

export default function Select({
  options,
  label,
  name,
  defaultValue = '',
  onChange,
}: {
  options: SelectOption[];
  label: string;
  name: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {

  var urlParams = new URLSearchParams(window.location.search);
  // console.log(label);
  const label2 = label === 'Sort by' ? 'sortBy' : label.toLowerCase();
    console.log(label2);

  // console.log(label.toLowerCase().replaceAll(' ', ''));
  // console.log(urlParams.get(label.toLowerCase()));
  // console.log(label);
  // console.log(urlParams.get(`${label2}`));
  for (let i = 0; i<=options.length;i++) {
    console.log(options);
  }

  return (
    <div className={styles.main_container}>
      <h3 className={styles.title}>{label}</h3>
      <select
        onChange={onChange}
        name={name}
        className={styles.select}
        // value={urlParams.get(`${label.toLowerCase()}`) === null ? '=' : 'sdsdsdsd'}
        
      >
      {/* {name === 'sortBy' &&
      (
      <option value="-" disabled>
      {'-'}
      </option>
      )
      }  */}
      {options.map((option, key) => (
        <option key={key} value={option.value}
          selected={option.value === urlParams.get(`${label2}`) ? true : false}
          >
          {option.label}
        </option>
        ))}
      </select>
    </div>
  );
}
