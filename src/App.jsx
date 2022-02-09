import React, { useState } from "react";

import "./styles.css";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([
    "aaa",
    "bbbb",
    "testttttttttttttttttttttttt",
    "1111",
    "sssssssss",
    "",
    "222"
  ]);
  const [completeTodos, setCompleteTodos] = useState(["ccc"]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return; //todoTextが空なら追加しない。
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onComplete = (todo, index) => {
    const newInCompleteTodos = [...incompleteTodos];
    const newCompleteTodos = [...completeTodos, todo]; //todo = incompleteTodos[index]

    newInCompleteTodos.splice(index, 1);

    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newInCompleteTodos);
  };

  const onClickDelete = (index) => {
    console.log(index);
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    // newTodos.splice(index, 2);
    //たまたま自分のコードのバグで気づいたsplineの仕様
    //第一引数に文字列が入ると0番目の要素を指定した事になり、そこから第二引数分要素を削除する
    //文字列が数字("2222"等)なら、int型と判断する。
    //まぁそもそもそんな使い方するなって話ではあるけど、エラー吐かずに動いちゃうのは驚き。
    console.log(newTodos);
    setIncompleteTodos(newTodos);
  };

  const onClickBack = (index) => {
    const newInCompleteTodos = [...incompleteTodos, completeTodos[index]];
    const newCompleteTodos = [...completeTodos];

    newCompleteTodos.splice(index, 1);

    setIncompleteTodos(newInCompleteTodos);
    setCompleteTodos(newCompleteTodos);
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
          {incompleteTodos.map((todo, index) => {
            //1個目の引数で配列の実体,2つ目でindex番号
            // reactでループ処理をする際の注意点
            //ループ内で返却している一番上のタグにkeyというものを設定して
            //あげなきゃだめ
            //仮想DOMは変更前と変更後で差分だけ抽出して差分だけ反映させるため
            //目印が必要これしないとkeyを設定してくれと怒られる。consoleで。
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onComplete(todo, index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
                {/* 下記だと読み込まれたタイミングで関数が実行されてしまう！引数を渡す時は↑！新しく関数を生成するイメージ。 */}
                {/* <button onClick={onClickDelete(index)}>削除</button> */}
              </div>
            );
          })}
        </ul>
      </div>

      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
