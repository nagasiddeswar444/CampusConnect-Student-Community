using CampusConnect.API.DTOs;
using CampusConnect.API.Models;

namespace CampusConnect.API.Services
{
    public interface IBlogService
    {
        Task CreateBlog(CreateBlogDto dto);

        Task<IEnumerable<Blog>> GetAllBlogs();

        Task<IEnumerable<Blog>> GetBlogsByUser(int userId);

        Task UpdateBlog(UpdateBlogDto dto);

        Task DeleteBlog(DeleteBlogDto dto);
    }
}