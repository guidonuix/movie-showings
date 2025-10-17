interface ActionButtonsProps {
  status: string;
}

const ActionButtons = (props: ActionButtonsProps) => {
  switch (props.status) {
    case "readyForGuest":
      return (
        <div className="flex gap-4">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Picked up
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Problem
          </button>
        </div>
      );
    case "pickedUp":
      return (
        <div className="flex gap-4">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Delivered
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Problem
          </button>
        </div>
      );
    case "delivered":
      return (
        <div className="flex gap-4">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Problem
          </button>
        </div>
      );
    default:
      return null;
  }
};
export default ActionButtons;
