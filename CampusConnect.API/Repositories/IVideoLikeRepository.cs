using CampusConnect.API.DTOs;

namespace CampusConnect.API.Repositories
{
    public interface IVideoLikeRepository
    {
        Task AddLike(AddVideoLikeDto dto);

        Task RemoveLike(RemoveVideoLikeDto dto);

        Task<int> GetLikeCount(int videoId);
    }
}