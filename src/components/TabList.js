import { NavLink } from 'react-router-dom';
import styles from './TabList.module.css';

function TabList({ tabs }) {
  return (
    <nav className={styles.nav}>
      <ul>
        {tabs.map(tab => (
          <li key={tab.id}>
            <NavLink to={`/${tab.id}`}>{tab.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TabList;
