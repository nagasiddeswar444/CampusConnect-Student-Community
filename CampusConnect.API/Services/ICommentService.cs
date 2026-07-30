using CampusConnect.API.DTOs;
using CampusConnect.API.Models;

namespace CampusConnect.API.Services
{
    public interface ICommentService
    {
        Task AddComment(AddCommentDto dto);

        Task<IEnumerable<Comment>> GetCommentsByBlog(int blogId);


    }
}