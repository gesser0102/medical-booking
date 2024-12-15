import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../store/notificationsSlice';

const Notifications = () => {
  const notifications = useSelector((state) => state.notifications.notifications);
  const dispatch = useDispatch();

  const handleMarkAsRead = (index) => {
    dispatch(removeNotification(index));
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Avisos e Lembretes</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">Nenhum lembrete pendente.</p>
      ) : (
        notifications.map((note, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-blue-100 mb-2 rounded-md"
          >
            <span>{note}</span>
            <button
              onClick={() => handleMarkAsRead(index)}
              className="bg-red-500 text-white px-2 py-1 text-sm rounded-md hover:bg-red-600"
            >
              Marcar como lido
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
