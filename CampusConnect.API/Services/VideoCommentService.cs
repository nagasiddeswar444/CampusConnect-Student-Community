using CampusConnect.API.DTOs;
using CampusConnect.API.Models;
using CampusConnect.API.Repositories;

namespace CampusConnect.API.Services
{
    public class VideoCommentService
        : IVideoCommentService
    {
        private readonly
            IVideoCommentRepository
            _repository;

        public VideoCommentService(
            IVideoCommentRepository repository)
        {
            _repository = repository;
        }

        public async Task AddComment(
            AddVideoCommentDto dto)
        {
            await _repository
                .AddComment(dto);
        }

        public async Task<IEnumerable<VideoComment>>
            GetCommentsByVideo(
                int videoId)
        {
            return await _repository
                .GetCommentsByVideo(
                    videoId
                );
        }
    }
}