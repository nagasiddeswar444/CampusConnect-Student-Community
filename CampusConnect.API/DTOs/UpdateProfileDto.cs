namespace CampusConnect.API.DTOs
{
	public class UpdateProfileDto
	{
		public int UserId { get; set; }

		public string FullName { get; set; }

		public string Department { get; set; }

		public int YearOfStudy { get; set; }
	}
}