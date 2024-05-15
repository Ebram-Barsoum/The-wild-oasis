import ButtonIcon from "../../ui/ButtonIcon";
import useSignOut from "./useSignOut";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
export default function Logout() {
  const { logOut, isLoading } = useSignOut();
  return (
    <ButtonIcon onClick={() => logOut()} disabled={isLoading}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}
