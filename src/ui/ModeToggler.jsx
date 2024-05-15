import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../Contexts/DarkModeContext";
import ButtonIcon from "./ButtonIcon";

export default function ModeToggler() {
  const { mode, toggleMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleMode}>
      {mode === "light" ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}
