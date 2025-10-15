import { createFileRoute } from '@tanstack/react-router'
import MovieDetail from '../../components/MovieDetail'

export const Route = createFileRoute('/movie/$movieId')({
  component: MovieDetailPage,
})

function MovieDetailPage() {
  const { movieId } = Route.useParams()
  return (
    <>
      <MovieDetail id={Number(movieId)} />
    </>
  )
}
