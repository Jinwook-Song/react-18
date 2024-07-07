import { TodoFilter } from '../../App';
import styles from './Header.module.css';

interface HeaderProps {
  filters: TodoFilter[];
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
}

export default function Header({
  filter,
  filters,
  onFilterChange,
}: HeaderProps) {
  console.log(filter);
  return (
    <header className={styles.header}>
      <ul className={styles.filters}>
        {filters.map((value, index) => (
          <li key={index}>
            <button
              className={`${styles.filter} ${
                filter === value && styles.selected
              }`}
              onClick={() => onFilterChange(value)}
            >
              {value}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}
