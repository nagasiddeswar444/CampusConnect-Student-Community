using Microsoft.AspNetCore.Http;

namespace CampusConnect.API.DTOs
{
    public class UploadProfilePhotoDto
    {
        public int UserId { get; set; }

        public IFormFile ProfileImage { get; set; }
    }
}