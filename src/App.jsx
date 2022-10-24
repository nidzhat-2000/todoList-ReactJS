import React, { useState, useEffect } from 'react';
import List from './List.jsx';
import Alert from './Alert.jsx';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const handleSubmit = e => {
    e.preventDefault();
    if (!name) {
      // display alert

      // setAlert({ show: true, message: 'Please enter value', type: 'danger' });
      // console.log(alert);
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      // when edited ⤴
      setList(
        list.map(item => {
          if (item.id === editID) {
            return { ...item, title: name };
          }

          return item;
        })
      );

      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', "item's changed");
    } else {
      showAlert(true, 'success', 'new item added');
      // show alert ⬆
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', message = '') => {
    setAlert({ show, type, message });
  };

  const clearItems = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };

  const deleteItem = id => {
    showAlert(true, 'danger', 'item is deleted');
    console.log(list);
    const newList = list.filter(item => item.id !== id);
    setList(newList);
    console.log(list);
  };

  const editItem = id => {
    console.log(id);
    const editedTask = list.find(item => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(editedTask.title);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>do list</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g Coding"
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} deleteItem={deleteItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearItems}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
