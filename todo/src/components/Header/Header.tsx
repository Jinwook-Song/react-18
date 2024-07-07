import { HiMoon, HiSun } from 'react-icons/hi';
import { TodoFilter } from '../../App';
import { useDarkMode } from '../../context/DarkModeContext';
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
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <header className={styles.header}>
      <button className={styles.toggle} onClick={toggleDarkMode}>
        {isDarkMode ? <HiMoon /> : <HiSun />}
      </button>
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
