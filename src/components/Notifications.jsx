import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../store/notificationsSlice';

const Notifications = () => {
  const notifications = useSelector((state) => state.notifications.notifications);
  const dispatch = useDispatch();

  const handleMarkAsRead = (index) => {
    dispatch(removeNotification(index));
  };

  return (
    <div className="bg-white shadow-md p-2 sm:p-4 rounded-lg max-w-sm w-full mx-auto my-4 md:max-w-none md:w-full md:mx-0">
      <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4">Avisos e Lembretes</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm sm:text-base">Nenhum lembrete pendente.</p>
      ) : (
        <div className="space-y-2">
          {notifications.map((note, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 bg-blue-100 rounded-md"
            >
              <span className="text-sm sm:text-base mb-2 sm:mb-0">{note}</span>
              <button
                onClick={() => handleMarkAsRead(index)}
                className="bg-red-500 text-white px-2 py-1 text-xs sm:text-sm rounded-md hover:bg-red-600"
              >
                Marcar como lido
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
