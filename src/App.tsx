import { useState } from "react";

function App() {
  const [com, setCom] = useState("select");
  const handler = async (com: string) => {
    const selected = await webflow.getSelectedElement();
    if (!selected) {
      await webflow.notify({
        type: "Error",
        message: "Please select an element",
      });
      return;
    }
    if (!selected.children) {
      await webflow.notify({
        type: "Error",
        message: "Please select an element which has children",
      });
      return;
    }
    const newEl = webflow.createDOM("button");
    const ex = await webflow.getStyleByName(com + "fd");

    if (!ex) {
      const style = webflow.createStyle(com + "fd");
      if (com === "default") {
        style.setProperties({
          "background-color": "red",
          "padding-top": "10px",
          "padding-bottom": "10px",
          "padding-left": "20px",
          "padding-right": "20px",
          color: "white",
        });
      } else if (com === "ghost") {
        style.setProperties({
          // "background-color": "red",
          "padding-top": "10px",
          "padding-bottom": "10px",
          "padding-left": "20px",
          "padding-right": "20px",
          "border-right-style": "solid",
          "border-left-style": "solid",
          "border-top-style": "solid",
          "border-bottom-style": "solid",
          "border-bottom-width": "1px",
          "border-top-width": "1px",
          "border-left-width": "1px",
          "border-right-width": "1px",
          color: "black",
        });
      } else if (com === "outline") {
        style.setProperties({
          // "background-color": "red",
          "padding-top": "10px",
          "padding-bottom": "10px",
          "padding-left": "20px",
          "padding-right": "20px",
          color: "black",
        });
      }

      newEl.setStyles([style]);
    }
    if (ex) {
      newEl.setStyles([ex]);
    }

    newEl.setTextContent("lehri");
    // if (com.href) newEl.setAttribute("href", com?.href);

    if (selected.children) {
      const prevChildren = selected.getChildren();
      selected.setChildren([...prevChildren, newEl]);
    }

    await selected.save();
  };

  return (
    <>
      <select
        onChange={(e) => {
          setCom(e.target.value);
          handler(com);
        }}
        name="btn"
        id=""
        value={com}
      >
        <option value="default">default</option>
        <option value="ghost">Ghost</option>
        <option value="outline">Outline</option>
        <option value="fill">Fill</option>
      </select>
    </>
  );
}

export default App;
