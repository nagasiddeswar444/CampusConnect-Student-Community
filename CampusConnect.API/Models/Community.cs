namespace CampusConnect.API.Models
{
    public class Community
    {
        public int CommunityId { get; set; }

       

        public int CreatedBy { get; set; }

        public string? CommunityName { get; set; }

        public string? Description { get; set; }

        public string? Status { get; set; }

        public DateTime CreatedAt { get; set; }

        public string? FullName { get; set; }
    }
}