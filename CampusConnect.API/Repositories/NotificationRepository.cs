using CampusConnect.API.Data;
using CampusConnect.API.DTOs;
using CampusConnect.API.Models;
using Dapper;
using System.Data;

namespace CampusConnect.API.Repositories
{
    public class NotificationRepository
        : INotificationRepository
    {
        private readonly DbContextDapper _dbContext;

        public NotificationRepository(
            DbContextDapper dbContext
        )
        {
            _dbContext = dbContext;
        }

        public async Task AddNotification(
            CreateNotificationDto dto
        )
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
    "sp_AddNotification",
    new
    {
        dto.UserId,
        dto.Message,
        dto.NotificationType,
        dto.ReferenceId
    },
    commandType:
    CommandType.StoredProcedure
);
        }

        public async Task<IEnumerable<Notification>>
        GetNotificationsByUser(
            int userId
        )
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection.QueryAsync<Notification>(
                "sp_GetNotificationsByUser",
                new
                {
                    UserId = userId
                },
                commandType:
                CommandType.StoredProcedure
            );
        }

        public async Task MarkAsRead(
            int notificationId
        )
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_MarkNotificationRead",
                new
                {
                    NotificationId =
                    notificationId
                },
                commandType:
                CommandType.StoredProcedure
            );
        }
    }
}