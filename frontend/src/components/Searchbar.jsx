import { useState } from "react";

function Searchbar() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleClose = () => {
    setOpen(false);
    setText("");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {!open && (
        <button onClick={() => setOpen(true)}>Search</button>
      )}

      {open && (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            type="text"
            placeholder="Search dresses..."
            value={text}
            autoFocus
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleClose}>✕</button>
        </div>
      )}
    </div>
  );
}

export default Searchbar;