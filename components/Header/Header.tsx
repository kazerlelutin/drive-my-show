import useIsMobile from "../../hooks/useIsMobile";
import HeaderDesktop from "./HeaderDesktop/HeaderDesktop";
import HeaderMobile from "./HeaderMobile/HeaderMobile";

export default function Header() {
  const isMobile = useIsMobile();

  return isMobile ? (
    <HeaderMobile />
  ) : (
    <HeaderDesktop />
  );
}
