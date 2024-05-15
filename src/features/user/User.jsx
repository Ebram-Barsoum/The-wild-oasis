import { useNavigate } from "react-router-dom";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";

export default function User() {
  const navigate = useNavigate();

  return (
    <ButtonIcon onClick={() => navigate("/account")}>
      <HiOutlineUser />
    </ButtonIcon>
  );
}
