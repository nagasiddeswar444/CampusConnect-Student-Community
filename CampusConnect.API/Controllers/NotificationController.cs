using CampusConnect.API.DTOs;
using CampusConnect.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CampusConnect.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController
        : ControllerBase
    {
        private readonly
        INotificationService
        _service;

        public NotificationController(
            INotificationService service
        )
        {
            _service = service;
        }

        [HttpPost("add")]
        public async Task<IActionResult>
        AddNotification(
            CreateNotificationDto dto
        )
        {
            await _service
                .AddNotification(dto);

            return Ok(
                new
                {
                    message =
                    "Notification Added"
                }
            );
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult>
        GetNotifications(
            int userId
        )
        {
            var notifications =
                await _service
                    .GetNotificationsByUser(
                        userId
                    );

            return Ok(notifications);
        }

        [HttpPut("read/{notificationId}")]
        public async Task<IActionResult>
        MarkAsRead(
            int notificationId
        )
        {
            await _service
                .MarkAsRead(
                    notificationId
                );

            return Ok();
        }
    }
}