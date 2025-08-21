import React from "react";

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({className="", children, ...props}) => (
  <div {...props} className={`card ${className}`}>{children}</div>
);
export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({className="", children, ...props}) => (
  <div {...props} className={`p-6 ${className}`}>{children}</div>
);
export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({className="", children, ...props}) => (
  <div {...props} className={`p-6 ${className}`}>{children}</div>
);
export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({className="", children, ...props}) => (
  <h3 {...props} className={`${className}`}>{children}</h3>
);