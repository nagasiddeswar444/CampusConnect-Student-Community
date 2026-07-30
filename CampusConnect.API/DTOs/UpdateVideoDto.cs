namespace CampusConnect.API.DTOs
{
    public class UpdateVideoDto
    {
        public int VideoId { get; set; }

        public int UserId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }
    }
}