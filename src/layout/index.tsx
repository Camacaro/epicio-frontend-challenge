import { ReactElement } from 'react';
import { MainNavbar } from './MainNavbar';

export interface Props {
  children?: ReactElement | ReactElement[]
}

export const MainLayout = ({ children }: Props) => {

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