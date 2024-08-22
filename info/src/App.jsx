// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useReducer, useRef, createContext ,useEffect} from "react";
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Home from './pages/Home';
import Notfound from './pages/Notfound';
import New from './pages/New';



function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id)
          ? action.data
          : item
      );
    case "DELETE":
      return state.filter(
        (item) => String(item.id) !== String(action.id)
      );
    default:
      return state;
  }
}

export const BlogData = createContext();
export const BlogCRUD = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, [], () => {
    const localData = localStorage.getItem('blogData');
    return localData ? JSON.parse(localData) : [];
  });
  const idRef = useRef(data.length + 1);

  useEffect(() => {
    localStorage.setItem('blogData', JSON.stringify(data));
  }, [data]);

  // 새로운 일기 추가
  const onCreate = (createdDate,title ,content,category) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        title,
        content,
        category,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate,title,  content, category) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        title,
        content,
        category
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };


  return (
   <BlogData.Provider value={data}>
      <BlogCRUD.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="*" element={<Notfound />} />
          <Route path="/new" element={<New />} />
          </Routes>
          </BlogCRUD.Provider>
        </BlogData.Provider>
  );
}

export default App;