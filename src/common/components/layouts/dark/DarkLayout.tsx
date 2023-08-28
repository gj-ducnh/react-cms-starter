import React from "react";
import { IProfile } from "../../../../interfaces/User";

export interface IDarkLayout {
    children: React.ReactNode; 
    profile?: IProfile 
}


const DarkLayout: React.FC<IDarkLayout> = ({children, profile}) => {
    return <div>
        <header>
            {profile?.name}
        </header>
        {children}
    </div>
}

export default DarkLayout;