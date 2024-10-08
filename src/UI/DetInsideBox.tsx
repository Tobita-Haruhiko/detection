import { Box } from "@mui/material"

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}


export const DetInsideBox: React.FC<Props> = ({children}) => {
  return(
    <Box sx={{
      borderRadius: "5px",
      border: "1px gray solid",
      padding: "24px",
      width: "500px",
    }}>
      {children}
    </Box>
  )
}