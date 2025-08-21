import React, { useState } from "react";

type Item = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: Item[];
};

export const SimpleAccordion: React.FC<AccordionProps> = ({ items }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      {items.map((it, idx) => (
        <div key={idx} className="card mb-4">
          <div className="p-4" onClick={() => setOpen(open === idx ? null : idx)} style={{cursor:"pointer"}}>
            <strong>{it.question}</strong>
          </div>
          {open === idx && <div className="p-4 text-muted-foreground">{it.answer}</div>}
        </div>
      ))}
    </div>
  );
};