namespace CampusConnect.API.DTOs
{
    public class ProfileDto
    {
        public int UserId { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Department { get; set; }

        public int? YearOfStudy { get; set; }

        public DateTime JoinedDate { get; set; }

        public int TotalBlogs { get; set; }

        public int TotalVideos { get; set; }

        public int TotalLikes { get; set; }

        public string? ProfileImagePath { get; set; }
    }
}