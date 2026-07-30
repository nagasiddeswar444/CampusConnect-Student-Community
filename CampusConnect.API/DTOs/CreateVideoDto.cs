using Microsoft.AspNetCore.Http;

namespace CampusConnect.API.DTOs
{
    public class CreateVideoDto
    {
        public int UserId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public IFormFile VideoFile { get; set; }

        public int? CommunityId
        {
            get;
            set;
        }

        
    }
}