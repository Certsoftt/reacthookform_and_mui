import React, { useContext } from 'react'
import { ThemeStyle } from './Theme.styles'

type ThemeProps = {
    children: React.ReactNode
}
type ThemeContextType = {
    primary:{
        main: string
        text: string
    }
    secondary:{
        main: string
        text: string
    }
}
const ThemeContext = React.createContext({} as ThemeContextType)
const Theme = ({children}:ThemeProps) => {
  return (
    <React.Fragment>
        <ThemeContext.Provider value={ThemeStyle}>
            {children}
        </ThemeContext.Provider>
    </React.Fragment>
  )
}

export const useTheme = ()=>{
    return useContext(ThemeContext)
}

export default Theme