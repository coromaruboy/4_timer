/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// TextBox コンポーネントのプロパティの型定義
interface TextBoxProps {
    label: string;                              // テキストボックスのラベル
    value: string;                              // テキストボックスの値
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  // テキスト変更時のコールバック関数
}

// テキストボックスのスタイルを定義するCSS
const textBoxStyle = css`
    margin: 10px;
    label {
        font-weight: bold;
    }
    input {
        margin-left: 5px;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
`;

// TextBox コンポーネント
const TextBox = ({ label, value, onChange }: TextBoxProps) => {
    return (
        <div css={textBoxStyle}>
            <label>
                {label}
                <input type="number" value={value} onChange={onChange} />
            </label>
        </div>
    );
};

export default TextBox;
