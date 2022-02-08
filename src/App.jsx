import React, { useState } from "react";

import "./styles.css";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState(["aaa", "bbb"]);
  const [completeTodos, setCompleteTodos] = useState(["ccc"]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return; //todoTextが空なら追加しない。
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="todoを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo) => {
            // reactでループ処理をする際の注意点
            //ループ内で返却している一番上のタグにkeyというものを設定して
            //あげなきゃだめ
            //仮想DOMは変更前と変更後で差分だけ抽出して差分だけ反映させるため
            //目印が必要これしないとkeyを設定してくれと怒られる。consoleで。
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button>完了</button>
                <button>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
