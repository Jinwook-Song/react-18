import { useState } from 'react';
import TodoList from './components/TodoList/TodoList';
import Header from './components/Header/Header';
import './App.css';
import { TodoType } from './components/Todo/Todo';
import { DarkModeProvider } from './context/DarkModeContext';

export type TodoFilter = 'all' | TodoType['status'];
const filters: TodoFilter[] = ['all', 'active', 'completed'];

function App() {
  const [filter, setFilter] = useState<TodoFilter>('all');

  return (
    <DarkModeProvider>
      <Header
        filters={filters}
        filter={filter}
        onFilterChange={(filter) => setFilter(filter)}
      />
      <TodoList filter={filter} />
    </DarkModeProvider>
  );
}

export default App;
