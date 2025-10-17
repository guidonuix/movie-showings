import { useQuery } from "@tanstack/react-query";
import type { TheaterType } from "../types/types";
import { useSelectedTheaterStore } from "../store/selectedTheaterStore";

const PickArea = () => {
  const { selectedTheaterId, setSelectedTheaterId } = useSelectedTheaterStore();

  const { isPending, error, data } = useQuery<TheaterType[]>({
    queryKey: ["theaters"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_DATABASE_ROOT_URL}/theaters`
      );
      return response.json();
    },
  });

  console.log("Selected Theater ID:", selectedTheaterId);

  if (isPending)
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 text-lg">Loading theaters...</span>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-red-800 font-medium">Error loading theaters</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Choose Your Theater
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((theater) => (
          <div
            key={theater.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100 overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3 group-hover:bg-green-500 transition-colors"></div>
                  <span className="text-sm text-gray-500 font-medium">
                    AVAILABLE
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {theater.name}
              </h3>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => {setSelectedTheaterId(theater.id)}}
                >
                  Select
                </button>
              </div>
            </div>

            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickArea;
