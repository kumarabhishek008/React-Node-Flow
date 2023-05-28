import { FC, memo } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// type Action = {
//   label: string;
//   effect: (...args: any[]) => any;
// };

// type Position = {
//   x: number;
//   y: number;
// };

// type Props = {
//   actions: Action[];
//   isOpen: boolean;
//   position: Position;
//   onMouseLeave: () => void;
// };

export const ContextMenu = memo(
  ({ isOpen, position, anchorEle, actions = [], onMouseLeave }) =>
    isOpen ? (
      <>
        <Menu
          id="basic-menu"
          anchorEl={anchorEle}
          open={isOpen}
          onClose={onMouseLeave}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {actions.map((action) => (
            <MenuItem key={action.label} onClick={action.effect}>
              {action.label}
            </MenuItem>
          ))}
        </Menu>
      </>
    ) : // <div
    //   style={{
    //     position: "absolute",
    //     left: position.x,
    //     top: position.y,
    //     zIndex: 1000,
    //     border: "solid 1px #CCC",
    //     borderRadius: 3,
    //     backgroundColor: "white",
    //     padding: 5,
    //     display: "flex",
    //     flexDirection: "column",
    //   }}
    //   onMouseLeave={onMouseLeave}
    // >
    //   <button key={action.label} onClick={action.effect}>
    //     {action.label}
    //   </button>
    // </div>
    null
);
