import { Button } from "@mui/material"

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  disabled: boolean;
}


export const DetButton: React.FC<Props> = ({children, onClick, disabled}) => {
  return(
    <Button onClick={onClick} disabled={disabled}>{children}</Button>
  )
}