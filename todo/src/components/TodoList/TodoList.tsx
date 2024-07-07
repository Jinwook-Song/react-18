import { useEffect, useState } from 'react';
import AddTodo from '../AddtTodo/AddTodo';
import Todo, { TodoType } from '../Todo/Todo';
import { TodoFilter } from '../../App';
import styles from './TodoList.module.css';

interface TodoListProps {
  filter: TodoFilter;
}

const LS_TODO_KEY = 'react__todos';

export default function TodoList({ filter }: TodoListProps) {
  const [todos, setTodos] = useState<TodoType[]>(readTodosFromLocalStorage);

  const handleAdd = (todo: TodoType) => setTodos([...todos, todo]);
  const handleUpdate = (todo: TodoType) =>
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
  const handleDelete = (todo: TodoType) =>
    setTodos(todos.filter((t) => t.id !== todo.id));

  const filteredTodos = getFilteredTodos(todos, filter);

  useEffect(() => {
    localStorage.setItem(LS_TODO_KEY, JSON.stringify(todos));
  }, [todos]);

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

function readTodosFromLocalStorage(): TodoType[] {
  console.log('first');
  const todos = localStorage.getItem(LS_TODO_KEY);
  if (todos) return JSON.parse(todos);
  else return [];
}

function getFilteredTodos(todos: TodoType[], filter: TodoFilter) {
  if (filter === 'all') return todos;
  return todos.filter((todo) => todo.status === filter);
}
