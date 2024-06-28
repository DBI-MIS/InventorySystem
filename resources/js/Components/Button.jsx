export default function Button({ text, tableId, onScroll }) {
    return (
      <button onClick={() => onScroll(tableId)}>
         {...props}
        {text}  
      </button>
    );
  }