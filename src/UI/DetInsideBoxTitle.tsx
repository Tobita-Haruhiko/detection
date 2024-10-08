import { Box } from "@mui/material"

interface Props {
  title: string;
  children?: React.ReactNode;
  onClick?: () => void;
}


export const DetInsideBoxTitle: React.FC<Props> = ({title, children}) => {
  return(
    <Box sx={{display: "flex", justifyContent: "space-between"}}>
      <h1>{title}</h1>
      {children}
    </Box>
  )
}