import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";
import {useAppearance} from "../../store/appearance/hooks"
import { useEffect } from "react";
import Modal from "../../modals";
import { useModal } from "../../store/modal/hooks";

const MainLayout = () => {

  const modal = useModal();
  const appearance = useAppearance();

  useEffect(()=>{
    document.documentElement.style.setProperty("--background-primary", appearance.backgroundColor.primary)
    document.documentElement.style.setProperty("--background-secondary", appearance.backgroundColor.secondary)

    document.documentElement.style.setProperty("--color-primary", appearance.color.primary)
    document.documentElement.style.setProperty("--color-secondary", appearance.color.secondary)
    document.documentElement.style.setProperty("--color-base", appearance.color.base)
    document.documentElement.style.setProperty("--color-base-secondary", appearance.color.baseSecondary)
    
    document.documentElement.style.setProperty("--box-shadow", appearance.boxShadow)
  },[appearance])

  
  return (
    <div>
      <Navbar />
      <main>
        {modal&& <Modal/>}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout
