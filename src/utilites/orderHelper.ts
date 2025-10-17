export const sortOrdersByStatus = (orders: any[]) => {
    const statusOrder = { problem: 0, readyForGuest: 1, new: 2, completed: 3 };
    const myOrders = orders?.sort((a, b) => (statusOrder[a.status as keyof typeof statusOrder] ?? 999) - (statusOrder[b.status as keyof typeof statusOrder] ?? 999)) || [];
  
    return myOrders;
  }
  export const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-400 group-hover:bg-green-500";
      case "readyForGuest":
        return "bg-yellow-400 group-hover:bg-yellow-500";
      case "problem":
        return "bg-red-400 group-hover:bg-red-500";
      default:
        return "bg-gray-400 group-hover:bg-gray-500";
    }
  };  