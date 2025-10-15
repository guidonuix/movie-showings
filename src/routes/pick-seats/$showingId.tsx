import { createFileRoute } from '@tanstack/react-router'
import PickSeats from '../../components/PickSeats';

export const Route = createFileRoute('/pick-seats/$showingId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { showingId } = Route.useParams();
  return <PickSeats showingId={Number(showingId)} />;

}
