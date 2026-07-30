using CampusConnect.API.DTOs;
using CampusConnect.API.Models;

namespace CampusConnect.API.Services
{
    public interface IVideoService
    {
        Task CreateVideo(CreateVideoDto dto);

        Task<IEnumerable<Video>> GetAllVideos();

        Task<IEnumerable<Video>> GetVideosByUser(int userId);

        Task UpdateVideo(UpdateVideoDto dto);

        Task DeleteVideo(DeleteVideoDto dto);
    }
}