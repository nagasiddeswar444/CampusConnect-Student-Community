using CampusConnect.API.DTOs;

namespace CampusConnect.API.Repositories
{
    public interface ILikeRepository
    {
        Task AddLike(AddLikeDto dto);

        Task RemoveLike(RemoveLikeDto dto);

        Task<int> GetLikeCount(int blogId);
    }
}