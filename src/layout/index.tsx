import { IParentProps } from '../ts/interfaces';
import { MainNavbar } from './MainNavbar';

export const MainLayout = ({ children }: IParentProps) => {

  return (
    <div className="MainLayout">
      <MainNavbar />
      <div className={"MainLayout__wrapper"}>
        <div className={"MainLayout__wrapper__contentContainer"}>
          <div className={"MainLayout__wrapper__contentContainer__content"}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}