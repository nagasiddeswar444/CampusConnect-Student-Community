namespace CampusConnect.API.Models
{
    public class BlogLike
    {
        public int LikeId { get; set; }

        public int BlogId { get; set; }

        public int UserId { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}