import { useState } from 'react';
import { toast } from 'react-toastify';

const useAddItem = (localStorageKey, initialState = []) => {
  const [localItems, setLocalItems] = useState(() => {
    const storedItems = localStorage.getItem(localStorageKey);
    return storedItems ? JSON.parse(storedItems) : initialState;
  });

  const addItem = (item) => {
    if (!localItems.some((el) => el.id === item.id)) {
      const newItem = { ...item };

      setLocalItems((prevItems) => {
        const updatedItems = [...prevItems, newItem];
        localStorage.setItem(localStorageKey, JSON.stringify(updatedItems));
        return updatedItems;
      });

      toast.success(`${item.name || 'Item'} added to your team!`, { autoClose: 1500 });
    } else {
      toast.warning("Already exists!", { autoClose: 1500 });
    }
  };

  return { localItems, addItem };
};

export default useAddItem;
