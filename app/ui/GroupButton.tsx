import { useState, useCallback } from "react";

interface ToggleButtonProps<T> {
  buttonList: T[];
  initialButton?: T;
  handleClick: (value: T) => void;
}

const BASE_TOGGLE_BUTTON_CLASSES =
  "bg-gray-200 flex items-center p-1 rounded-lg text-sm text-gray-600";
const BUTTON_CLASSES =
  "grow px-4 py-3 min-w-[130px] rounded-lg transition-colors duration-500";
const ACTIVE_CLASSES = "bg-white font-bold shadow-toggle text-black";

export function GroupButton<T>({
  buttonList,
  initialButton,
  handleClick,
}: ToggleButtonProps<T>) {
  const [currentButton, setCurrentButton] = useState(initialButton);

  const handleToggle = useCallback(
    (choosenButton: T) => {
      buttonList.forEach(button => {
        if (choosenButton === button) setCurrentButton(button);
      });
      handleClick(choosenButton);
    },
    [buttonList, handleClick],
  );

  return (
    <div className={`${BASE_TOGGLE_BUTTON_CLASSES}`}>
      {buttonList.map(button => (
        <button
          key={`${button}`}
          type="button"
          onClick={() => handleToggle(button)}
          className={`${BUTTON_CLASSES} ${
            currentButton === button && ACTIVE_CLASSES
          }`}
        >
          {button as string}
        </button>
      ))}
    </div>
  );
}
