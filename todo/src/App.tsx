import { Fragment, useState } from 'react';
import TodoList from './components/TodoList/TodoList';
import Header from './components/Header/Header';
import './App.css';
import { TodoType } from './components/Todo/Todo';

export type TodoFilter = 'all' | TodoType['status'];
const filters: TodoFilter[] = ['all', 'active', 'completed'];

function App() {
  const [filter, setFilter] = useState<TodoFilter>('all');

  return (
    <Fragment>
      <Header
        filters={filters}
        filter={filter}
        onFilterChange={(filter) => setFilter(filter)}
      />
      <TodoList filter={filter} />
    </Fragment>
  );
}

export default App;
