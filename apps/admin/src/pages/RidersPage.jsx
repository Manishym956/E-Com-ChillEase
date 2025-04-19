// apps/admin/src/pages/RidersPage.jsx
import { FiMail, FiPhone } from 'react-icons/fi';
import { useRiders } from '../hooks/useRiders';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

const RidersPage = () => {
  const { riders, loading, error } = useRiders();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Riders</h1>

      {riders.length === 0 ? (
        <EmptyState
          title="No riders available"
          message="There are no riders registered in the system."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {riders.map((rider) => (
            <div key={rider._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12">
                    {rider.picture ? (
                      <img
                        className="h-12 w-12 rounded-full"
                        src={rider.picture}
                        alt={rider.name}
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                        <span className="text-lg font-medium">
                          {rider.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-gray-900">{rider.name}</h2>
                    <p className="text-sm text-gray-500">Rider</p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <FiMail className="mr-2" />
                  {rider.email}
                </div>
                {rider.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <FiPhone className="mr-2" />
                    {rider.phone}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RidersPage;