using CampusConnect.API.DTOs;

namespace CampusConnect.API.Services
{
    public interface IVideoLikeService
    {
        Task AddLike(AddVideoLikeDto dto);

        Task RemoveLike(RemoveVideoLikeDto dto);

        Task<int> GetLikeCount(int videoId);
    }
}