// apps/admin/src/components/StatusBadge.jsx
const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'Paid':
          return 'bg-yellow-100 text-yellow-800';
        case 'Shipped':
          return 'bg-blue-100 text-blue-800';
        case 'Delivered':
          return 'bg-green-100 text-green-800';
        case 'Undelivered':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };
  
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
          status
        )}`}
      >
        {status}
      </span>
    );
  };
  
  export default StatusBadge;