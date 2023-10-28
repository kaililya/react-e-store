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
  return (
    <div className={styles.main_container}>
      <h3 className={styles.title}>{label}</h3>
      <select
        onChange={onChange}
        name={name}
        defaultValue={defaultValue}
        className={styles.select}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option, key) => (
          <option key={key} value={option.value}>
            {option.label}
          </option>
        ))}
        {/* <div className={styles.arrow}></div> */}
      </select>
    </div>
  );
}
