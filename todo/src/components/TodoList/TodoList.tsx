import { useState } from 'react';
import AddTodo from '../AddtTodo/AddTodo';
import Todo, { TodoType } from '../Todo/Todo';
import { TodoFilter } from '../../App';
import styles from './TodoList.module.css';

interface TodoListProps {
  filter: TodoFilter;
}

export default function TodoList({ filter }: TodoListProps) {
  const [todos, setTodos] = useState<TodoType[]>([
    { id: '123', text: '장보기', status: 'active' },
    { id: '124', text: '공부하기', status: 'active' },
  ]);

  const handleAdd = (todo: TodoType) => setTodos([...todos, todo]);
  const handleUpdate = (todo: TodoType) =>
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
  const handleDelete = (todo: TodoType) =>
    setTodos(todos.filter((t) => t.id !== todo.id));

  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filteredTodos.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}

function getFilteredTodos(todos: TodoType[], filter: TodoFilter) {
  if (filter === 'all') return todos;
  return todos.filter((todo) => todo.status === filter);
}
