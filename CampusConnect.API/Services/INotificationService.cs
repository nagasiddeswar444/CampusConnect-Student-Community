using CampusConnect.API.DTOs;
using CampusConnect.API.Models;

namespace CampusConnect.API.Services
{
    public interface INotificationService
    {
        Task AddNotification(
            CreateNotificationDto dto
        );

        Task<IEnumerable<Notification>>
        GetNotificationsByUser(
            int userId
        );

        Task MarkAsRead(
            int notificationId
        );
    }
}