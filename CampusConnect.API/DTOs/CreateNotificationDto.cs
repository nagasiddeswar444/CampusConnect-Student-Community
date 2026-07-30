public class CreateNotificationDto
{
    public int UserId { get; set; }

    public string Message { get; set; }

    public string? NotificationType { get; set; }

    public int? ReferenceId { get; set; }
}