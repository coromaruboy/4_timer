/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// Button コンポーネントのプロパティの型定義
interface ButtonProps {
    onClick: () => void;  // ボタンクリック時のコールバック関数
    disabled: boolean;    // ボタンが無効化されているかどうか
    text: string;         // ボタンのテキスト内容
}

// ボタンのスタイルを定義する関数
const buttonStyle = (disabled: boolean) => css`
    margin: 10px;
    padding: 5px 10px;
    background-color: ${disabled ? "#ccc" : "#007bff"};
    color: ${disabled ? "#666" : "#fff"};
    border: none;
    border-radius: 4px;
    cursor: ${disabled ? "not-allowed" : "pointer"};
    &:hover {
        background-color: ${disabled ? "#ccc" : "#0056b3"};
    }
`;

// Button コンポーネント
const Button = ({ onClick, disabled, text }: ButtonProps) => {
    return (
        <button css={buttonStyle(disabled)} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
}

export default Button;