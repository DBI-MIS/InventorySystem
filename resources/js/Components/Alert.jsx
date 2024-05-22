import React from "react";
import { Alert} from "@material-tailwind/react";
 
export function Alerts() {
  const [open, setOpen] = React.useState(true);
 
  return (
    <>
      
      <Alert
        open={open}
        onClose={() => setOpen(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
      </Alert>
    </>
  );
}