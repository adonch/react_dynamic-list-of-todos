import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
type Props = {
  todos: Todo[];
  setFilteredTodos: (todos: Todo[]) => void;
};
export const TodoFilter: React.FC<Props> = ({ todos, setFilteredTodos }) => {
  const [query, setQuery] = useState('');
  const [statusSelect, setStatusSelect] = useState('all');

  useEffect(() => {
    setFilteredTodos(
      todos.filter(todo => {
        const matchQuery =
          !query || todo.title.toLowerCase().includes(query.toLowerCase());
        const matchStatus =
          statusSelect === 'all' ||
          (statusSelect === 'active' && !todo.completed) ||
          (statusSelect === 'completed' && todo.completed);

        return matchQuery && matchStatus;
      }),
    );
  }, [query, statusSelect, todos]);
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={statusSelect}
            onChange={e => {
              setStatusSelect(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
