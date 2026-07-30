using CampusConnect.API.DTOs;
using CampusConnect.API.Models;
using CampusConnect.API.Repositories;

namespace CampusConnect.API.Services
{
    public class NotificationService
        : INotificationService
    {
        private readonly
        INotificationRepository
        _repository;

        public NotificationService(
            INotificationRepository repository
        )
        {
            _repository = repository;
        }

        public async Task AddNotification(
            CreateNotificationDto dto
        )
        {
            await _repository
                .AddNotification(dto);
        }

        public async Task<IEnumerable<Notification>>
        GetNotificationsByUser(
            int userId
        )
        {
            return await _repository
                .GetNotificationsByUser(
                    userId
                );
        }

        public async Task MarkAsRead(
            int notificationId
        )
        {
            await _repository
                .MarkAsRead(
                    notificationId
                );
        }
    }
}