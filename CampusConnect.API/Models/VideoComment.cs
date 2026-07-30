namespace CampusConnect.API.Models
{
    public class VideoComment
    {
        public int CommentId { get; set; }

        public int VideoId { get; set; }

        public int UserId { get; set; }

        public string CommentText { get; set; }

        public DateTime CreatedAt { get; set; }

        public string FullName { get; set; }
    }
}