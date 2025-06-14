// components/ui/custom-button.tsx

import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

interface CustomButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ icon, isLoading, children, disabled, ...props }, ref) => {
    return (
      <Button ref={ref} disabled={isLoading || disabled} {...props}>
        {isLoading ? (
          <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </>
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
          </>
        )}
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export { CustomButton };
