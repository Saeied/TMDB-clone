import { FC, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface IProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const ErrorComponent: FC<IProps> = ({ className, children, ...props }) => {
  return (
    <h3 className={cn("text-red-600 text-3xl text-center", className)} {...props}>
      {children}
    </h3>
  );
};

export default ErrorComponent;