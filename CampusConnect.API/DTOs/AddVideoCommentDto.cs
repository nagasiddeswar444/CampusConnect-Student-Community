namespace CampusConnect.API.DTOs
{
    public class AddVideoCommentDto
    {
        public int VideoId { get; set; }

        public int UserId { get; set; }

        public string CommentText { get; set; }
    }
}