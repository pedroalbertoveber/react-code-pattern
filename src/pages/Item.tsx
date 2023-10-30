import { useItemsContext } from "@/contexts/ItemsContext"
import { Stack, Typography } from "@mui/material"
import { useParams, Link } from 'react-router-dom'

export function Item() {
  const { getItemById } = useItemsContext()
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return null
  }
 
  const { item } = getItemById.execute({ id })

  if (!item) {
    return <p>Carregando...</p>
  }

  return (
    <Stack>
      <Typography>{item.name} </Typography>
      <Typography>{item.price}</Typography>
      <Typography>
        <Link to="/">Voltar</Link>
      </Typography>
    </Stack>
  )
}