using CampusConnect.API.DTOs;
using CampusConnect.API.Models;

namespace CampusConnect.API.Repositories
{
    public interface IVideoRepository
    {
        Task CreateVideo(Video video);

        Task<IEnumerable<Video>> GetAllVideos();

        Task<IEnumerable<Video>> GetVideosByUser(int userId);

        Task UpdateVideo(UpdateVideoDto dto);

        Task DeleteVideo(DeleteVideoDto dto);

        Task<Video> GetVideoById(
    int videoId
);
    }
}