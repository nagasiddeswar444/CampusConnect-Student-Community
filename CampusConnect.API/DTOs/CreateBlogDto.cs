namespace CampusConnect.API.DTOs
{
    public class CreateBlogDto
    {
        public int UserId { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public int? CommunityId
        {
            get;
            set;
        }

        public IFormFile? AttachmentFile { get; set; }
        public string? AttachmentPath { get; set; }

        public string? AttachmentName { get; set; }
    }
}