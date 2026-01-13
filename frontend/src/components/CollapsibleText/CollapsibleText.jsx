import { useState } from "react";
import "./CollapsibleText.css";

function CollapsibleText({ text, maxLines = 2 }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="collapsible-text">
      <p
        className={`text ${expanded ? "expanded" : ""}`}
        style={{ WebkitLineClamp: expanded ? "unset" : maxLines }}
      >
        {text}
      </p>
      <button onClick={() => setExpanded(!expanded)} className="show-more-btn">
        {expanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
}

export default CollapsibleText;
