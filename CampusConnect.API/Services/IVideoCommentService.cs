using CampusConnect.API.DTOs;
using CampusConnect.API.Models;

namespace CampusConnect.API.Services
{
    public interface IVideoCommentService
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