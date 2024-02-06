import { createContext, useState, useEffect } from 'react';

// Creamos el contexto
export const AppContext = createContext();

// Creamos el proveedor del contexto
export const AppProvider = ({ children }) => {
  // Obtener los datos de localStorage al inicio
  const initialData = localStorage.getItem('table');
  const initialLists = initialData ? JSON.parse(initialData) : [];
  
  const [lists, setLists] = useState(initialLists);

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  useEffect(() => {
    localStorage.setItem('table', JSON.stringify(lists));
  }, [lists]);

  const addCard = (listId, content) => {
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          cards: [
            ...list.cards,
            {
              id: generateUniqueId(), // Generamos un nuevo id único para la tarjeta
              content: content
            }
          ],
        };
      }
      return list;
    });
    setLists(updatedLists);
  };

  const addTask = (nameTask) => {
    const newTask = {
      id: generateUniqueId(),
      title: nameTask,
      cards: [],
    };
    setLists([...lists, newTask]);
  };

  const removeCard = (listId, cardId) => {
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          cards: list.cards.filter((card) => card.id !== cardId),
        };
      }
      return list;
    });
    setLists(updatedLists);
  };

  const removeTask = (listId) => {
    const updatedList = lists.filter((list) => list.id !== listId);
    setLists(updatedList);
  };

  const moveCard = (sourceListId, newSourceCards, destinationListId = null, newDestinationCards = null) => {
    if (destinationListId) {
      const updatedLists = lists.map((list) => {
        if (list.id === sourceListId) {
          return { ...list, cards: newSourceCards };
        }
        if (list.id === destinationListId) {
          return { ...list, cards: newDestinationCards };
        }
        return list;
      });
      setLists(updatedLists);
    } else {
      const updatedLists = lists.map((list) => {
        if (list.id === sourceListId) {
          return { ...list, cards: newSourceCards };
        }
        return list;
      });
      setLists(updatedLists);
    }
  };

  return (
    <AppContext.Provider value={{ lists, setLists, addCard, removeCard, addTask, removeTask, moveCard }}>
      {children}
    </AppContext.Provider>
  );
};
