import { useState } from "react";

function App() {
  const [fileContent, setFileContent] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [isShowContent, setIsShowContent] = useState(false);

  function isObject(value) {
    return typeof value === "object" && !Array.isArray(value) && value !== null;
  }

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target.result;

      if (isObject(JSON.parse(inputValue))) {
        const inputValueParseObj = JSON.parse(inputValue);

        let htmlReplaceStr = contents;
        const keys = Object.keys(inputValueParseObj);
        for (const key of keys) {
          const placeholder = `{{${key}}}`;
          const regex = new RegExp(placeholder, "g");
          htmlReplaceStr = htmlReplaceStr.replace(
            regex,
            inputValueParseObj[key]
          );
        }
        setFileContent(htmlReplaceStr);
      }
    };

    reader.readAsText(file);
  };

  const downloadTxTFile = (content) => {
    const element = document.createElement("a");
    // Tạo một đối tượng Blob từ nội dung text
    const file = new Blob([content], { type: "text/plain" });
    // Tạo một URL tạm thời cho Blob
    element.href = URL.createObjectURL(file);
    element.download = "output.txt";
    // Tạo một thẻ a ẩn để tải xuống file
    document.body.appendChild(element);
    // Hành động bấm vào thẻ a ân để tải xuống file
    element.click();
    // Xóa thẻ a ẩn đấy đi
    document.body.removeChild(element);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (fileContent) {
      setIsShowContent(true);
      const textContent = fileContent;
      downloadTxTFile(textContent);
    }
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Nhập nội dụng"
        style={{
          width: "400px",
          height: "100px",
        }}
        value={inputValue}
        onChange={handleInputChange}
      />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Submit</button>
      {fileContent && isShowContent && (
        <div>
          <h2>File Content:</h2>
          <pre>{fileContent}</pre>
        </div>
      )}
    </form>
  );
}

export default App;
