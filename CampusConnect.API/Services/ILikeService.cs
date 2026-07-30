using CampusConnect.API.DTOs;

namespace CampusConnect.API.Services
{
    public interface ILikeService
    {
        Task AddLike(AddLikeDto dto);

        Task RemoveLike(RemoveLikeDto dto);

        Task<int> GetLikeCount(int blogId);
    }
}