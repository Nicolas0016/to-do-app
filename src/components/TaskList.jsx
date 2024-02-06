import { useContext } from 'react';
import { AppContext } from '../context/listTask';
import { FaTrash } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskList = () => {
  const { lists, addCard, removeCard, addTask, removeTask, moveCard } = useContext(AppContext);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return; // No se realizó un soltar válido

    // Si la tarjeta se soltó en la misma lista y posición
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceListId = source.droppableId;
    const destinationListId = destination.droppableId;

    // Obtenemos las listas de origen y destino
    const sourceList = lists.find((list) => list.id.toString() === sourceListId);
    const destinationList = lists.find((list) => list.id.toString() === destinationListId);

    // Obtenemos las tarjetas de la lista de origen y realizamos la acción de arrastrar y soltar
    const newSourceCards = Array.from(sourceList.cards);
    const [removed] = newSourceCards.splice(source.index, 1);

    // Si la tarjeta se movió dentro de la misma lista
    if (sourceListId === destinationListId) {
      newSourceCards.splice(destination.index, 0, removed);
      moveCard(sourceListId, newSourceCards);
    } else { // Si la tarjeta se movió a otra lista
      const newDestinationCards = Array.from(destinationList.cards);
      newDestinationCards.splice(destination.index, 0, removed);
      moveCard(sourceListId, newSourceCards, destinationListId, newDestinationCards);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {lists.map((list) => (
        <div key={list.id} className="list">
          <header className='header-list'>
            <h3>{list.title}</h3>
            <FaTrash className="delete-icon" onClick={() => removeTask(list.id)} />
          </header>
          <Droppable droppableId={list.id.toString()} key={list.id}>
            {(provided) => (
              <ul className='container-card' ref={provided.innerRef} {...provided.droppableProps}>
                {list.cards.map((card, index) => (
  <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
    {(provided) => (
      <li
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="card"
      >
        <span>{card.content}</span>
        <FaTrash className="delete-icon" onClick={() => removeCard(list.id, card.id)} />
      </li>
    )}
  </Draggable>
))}

                {provided.placeholder}
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
              </ul>
            )}
          </Droppable>
        </div>
      ))}
      <input
        type="text"
        placeholder="Añadir nueva tarjeta"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTask(e.target.value);
            e.target.value = '';
          }
        }}
      />
    </DragDropContext>
  );
};

export default TaskList;
