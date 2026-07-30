using CampusConnect.API.DTOs;
using CampusConnect.API.Models;

namespace CampusConnect.API.Repositories
{
    public interface ICommentRepository
    {
        Task AddComment(AddCommentDto dto);

        Task<IEnumerable<Comment>> GetCommentsByBlog(int blogId);


    }
}