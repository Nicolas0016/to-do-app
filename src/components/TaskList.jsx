import { useContext, } from 'react';
import { AppContext } from '../context/listTask'; // Importa el contexto correcto
import { FaTrash } from 'react-icons/fa';

const TaskList = () => {
  const { lists, addCard, removeCard, addTask, removeTask } = useContext(AppContext); // Usa AppContext para las tarjetas

  return (
    <>
      {lists.map((list) => (
        <div key={list.id} className="list">
          <header className='header-list'>
            <h3>{list.title}</h3><FaTrash className="delete-icon" onClick={() => removeTask(list.id)}/>
          </header>
          <ul className='container-card'>
            {list.cards.map((card, index) => (
              <li key={index} className="card">
                <span>{card}</span>
                <FaTrash
                  className="delete-icon"
                  onClick={() => removeCard(list.id, index)}
                />
              </li>
            ))}
            <li className="card">
              <input
                type="text"
                placeholder="Añadir nueva tarjeta"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addCard(list.id, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </li>
          </ul>
        </div>
      ))}
      <input
        type="text"
        placeholder="Añadir nueva tarjeta"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTask(e.target.value); // Corregido: Debería ser addCard en lugar de addTable
            e.target.value = '';
          }
        }}
      />
      <p>
        {
        }
      </p>
    </>
  );
};

export default TaskList;
