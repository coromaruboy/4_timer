/** @jsxImportSource @emotion/react */

// React ライブラリから useState と useEffect をインポート
import { useState, useEffect } from "react";
// Emotion ライブラリから css をインポート
import { css } from "@emotion/react"
// コンポーネントをインポート
import TextBox from "./components/TextBox";
import Button from "./components/Button";

// アプリ全体のスタイルを定義するCSS
const appStyle = css`
  text-align: center;
  margin-top: 50px;
`;

// エラーメッセージのスタイルを定義するCSS
const errorStyle = css`
  color: red;
  margin-top: 20px;
`;

// アプリケーションのメインコンポーネント
const App = () => {
  // ステートの定義
  const [minutes, setMinutes] = useState<string>("0");
  const [seconds, setSeconds] = useState<string>("0");
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // タイマーの処理を useEffect フックで管理
  useEffect(() => {
    let id: NodeJS.Timeout | null = null;
    // タイマーがアクティブかつ残り時間が正の値の場合
    if (isActive && totalSeconds > 0) {
      // 1秒ごとに残り時間を更新する setInterval を設定
      id = setInterval(() => {
        setTotalSeconds((seconds) => seconds - 1);
      }, 1000);
      setIntervalId(id);
    } else if (totalSeconds === 0 && isActive) {
      // 残り時間が0になり、かつタイマーがアクティブな場合、タイマーを停止する
      clearInterval(intervalId as NodeJS.Timeout);
      setIsActive(false);
    }
    // コンポーネントがアンマウントされる際にクリーンアップ
    return () => {
      if (id) clearInterval(id);
    };
  }, [isActive, totalSeconds]);

  // タイマーの開始・停止を切り替える関数
  const toggleActive = () => {
    setIsActive(!isActive);
  };

  // タイマーの開始処理
  const handleStart = () => {
    // 入力された分と秒から合計の秒数を計算
    const totalSec = parseInt(minutes) * 60 + parseInt(seconds);
    // 入力が数字であり、かつ正の値の場合
    if (!isNaN(totalSec) && totalSec >= 0) {
      setTotalSeconds(totalSec);
      setIsActive(true);
      setErrorMessage(null);
    } else {
      // 入力が無効な場合はエラーメッセージを表示
      setErrorMessage("Invalid time input!")
    }
  };

  // タイマーのリセット処理
  const handleReset = () => {
    setIsActive(false);
    setTotalSeconds(parseInt(minutes) * 60 + parseInt(seconds));
  };

  // 分数の変更時の処理
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinutes(e.target.value);
  };

  // 秒数の変更時の処理
  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeconds(e.target.value);
  };

  // アプリケーションの UI 部分
  return (
    <div css={appStyle}>
      <h1>Timer App</h1>
      {errorMessage && <div css={errorStyle}>{errorMessage}</div>}
      <TextBox label="Minutes" value={minutes} onChange={handleMinutesChange} />
      <TextBox label="Seconds" value={seconds} onChange={handleSecondsChange} />
      <Button onClick={handleStart} disabled={isActive} text="Start" />
      <Button onClick={toggleActive} disabled={!isActive && totalSeconds === 0} text={isActive ? "Pause" : "Resume"} />
      <Button onClick={handleReset} disabled={!isActive && totalSeconds === 0} text="Reset" />
      <h2>
        Time Remaining: {Math.floor(totalSeconds / 60)}:
        {totalSeconds % 60 < 10 ? `0${totalSeconds % 60}` : totalSeconds % 60}
      </h2>
    </div>
  );
};

export default App;
