namespace CampusConnect.API.DTOs
{
    public class CreateCommunityDto
    {
        public int CreatedBy { get; set; }

        public string CommunityName { get; set; }

        public string Description { get; set; }
    }
}