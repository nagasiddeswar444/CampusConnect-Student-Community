using CampusConnect.API.DTOs;
using CampusConnect.API.Repositories;

namespace CampusConnect.API.Services
{
    public class LikeService : ILikeService
    {
        private readonly ILikeRepository _repository;

        public LikeService(ILikeRepository repository)
        {
            _repository = repository;
        }

        public async Task AddLike(AddLikeDto dto)
        {
            await _repository.AddLike(dto);
        }

        public async Task RemoveLike(RemoveLikeDto dto)
        {
            await _repository.RemoveLike(dto);
        }

        public async Task<int> GetLikeCount(int blogId)
        {
            return await _repository.GetLikeCount(blogId);
        }
    }
}