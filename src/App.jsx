import React, { useState } from "react";

import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

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
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 10} //10以上の時にtrue,それ以外でfalseが渡る
      />
      {incompleteTodos.length >= 10 && (
        <p style={{ color: "red" }}>10個までしか登録できないよ</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onComplete={onComplete}
        onClickDelete={onClickDelete}
      />

      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
