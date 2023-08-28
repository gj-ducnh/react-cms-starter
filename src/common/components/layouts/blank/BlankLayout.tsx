import { IProfile } from "../../../../interfaces/User";


export interface IBlankLayoutInterface {
    children: React.ReactNode;
    profile?: IProfile 
}

const BlankLayout: React.FC<IBlankLayoutInterface> = ({children}) => {
    return <>{children}</>
}

export default BlankLayout;