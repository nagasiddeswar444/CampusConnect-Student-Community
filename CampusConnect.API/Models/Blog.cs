namespace CampusConnect.API.Models
{
    public class Blog
    {
        public int BlogId { get; set; }

        public int UserId { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public string? FullName { get; set; }
        public string Status { get; set; }

        public string? AttachmentPath { get; set; }

        public string? AttachmentName { get; set; }

        public int? CommunityId
        {
            get;
            set;
        }


    }
}