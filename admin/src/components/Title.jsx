import React from "react";
import { cn } from "./ui/cn";

const Title = ({children,className}) => {
  return <div>
    <h2 className={cn("text-2xl font-semibold",className)}>{children}</h2>
    </div>;
};

export default Title;
