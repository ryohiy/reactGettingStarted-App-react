import React from "react";

export const IncompleteTodos = (props) => {
  const { todos, onComplete, onClickDelete } = props;

  return (
    <>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {todos.map((todo, index) => {
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
    </>
  );
};
