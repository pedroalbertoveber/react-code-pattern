import { useItemsContext } from "@/contexts/ItemsContext"
import { Stack, Typography } from "@mui/material"
import { useParams, Link } from 'react-router-dom'

export function Item() {
  const { getItemById } = useItemsContext()
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return null
  }
 
  const { data } = getItemById.execute({ id })

  if (!data) {
    return <p>Carregando...</p>
  }

  return (
    <Stack>
      <Typography>{data.name} </Typography>
      <Typography>{data.price}</Typography>
      <Typography>
        <Link to="/">Voltar</Link>
      </Typography>
    </Stack>
  )
}