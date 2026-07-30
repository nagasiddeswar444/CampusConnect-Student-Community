using CampusConnect.API.DTOs;
using CampusConnect.API.Models;

namespace CampusConnect.API.Repositories
{
    public interface IVideoCommentRepository
    {
        Task AddComment(
            AddVideoCommentDto dto
        );

        Task<IEnumerable<VideoComment>>
            GetCommentsByVideo(
                int videoId
            );
    }
}