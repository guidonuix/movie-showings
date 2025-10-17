import { useQuery } from "@tanstack/react-query";
import type { ItemType, MenuItemType } from "../types/types";

const Item = ({ item }: { item: ItemType }) => {

    const {data: menuData} = useQuery<MenuItemType>({
        queryKey: ['itemDetail', item.id],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_DATABASE_ROOT_URL}/menuItems/${item.id}`);
            return response.json();
        }
    });

  return (
    <div
      className="flex justify-between items-start py-2 border-b border-gray-100 last:border-b-0"
    >
      <div className="flex-1">
        <p className="font-medium text-gray-900">{menuData?.name}</p>
        {item.notes && (
          <p className="text-sm text-gray-500 mt-1 italic">
            Note: {item.notes}
          </p>
        )}
      </div>
      <p className="font-semibold text-gray-900 ml-4">
        ${item.price.toFixed(2)}
      </p>
    </div>
  );
};

export default Item;
