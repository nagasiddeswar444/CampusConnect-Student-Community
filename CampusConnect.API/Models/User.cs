namespace CampusConnect.API.Models
{
    public class User
    {
        public int UserId { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string PasswordHash { get; set; }
        public string? PasswordSetupToken { get; set; }

        public string Department { get; set; }

        public int? YearOfStudy { get; set; }

        public string Role { get; set; }

        public int RoleId { get; set; }

        public string RoleName { get; set; } = string.Empty;

        public string Status { get; set; }

        
    }
}