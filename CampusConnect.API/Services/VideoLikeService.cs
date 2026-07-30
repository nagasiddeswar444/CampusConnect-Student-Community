using CampusConnect.API.DTOs;
using CampusConnect.API.Repositories;

namespace CampusConnect.API.Services
{
    public class VideoLikeService
        : IVideoLikeService
    {
        private readonly IVideoLikeRepository
            _repository;

        public VideoLikeService(
            IVideoLikeRepository repository)
        {
            _repository = repository;
        }

        public async Task AddLike(
            AddVideoLikeDto dto)
        {
            await _repository.AddLike(dto);
        }

        public async Task RemoveLike(
            RemoveVideoLikeDto dto)
        {
            await _repository.RemoveLike(dto);
        }

        public async Task<int> GetLikeCount(
            int videoId)
        {
            return await _repository
                .GetLikeCount(videoId);
        }
    }
}