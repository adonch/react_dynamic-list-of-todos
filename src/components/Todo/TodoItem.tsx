import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};
export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  return (
    <>
      {showInfoModal && (
        <TodoModal todo={todo} onCloseModal={() => setShowInfoModal(false)} />
      )}
      <tr data-cy="todo" className="" key={todo.id}>
        <td className="is-vcentered">{todo.id}</td>
        <td className="is-vcentered">
          {todo.completed && (
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          )}
        </td>
        <td className="is-vcentered is-expanded">
          <p
            className={todo.completed ? 'has-text-success' : 'has-text-danger'}
          >
            {todo.title}
          </p>
        </td>
        <td className="has-text-right is-vcentered">
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={() => setShowInfoModal(true)}
          >
            <span className="icon">
              <i
                className={classNames('far', {
                  'fa-eye-slash': showInfoModal,
                  'fa-eye': !showInfoModal,
                })}
              />
            </span>
          </button>
        </td>
      </tr>
    </>
  );
};
