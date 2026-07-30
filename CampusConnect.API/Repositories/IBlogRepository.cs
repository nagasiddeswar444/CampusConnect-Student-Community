using CampusConnect.API.DTOs;
using CampusConnect.API.Models;

namespace CampusConnect.API.Repositories
{
    public interface IBlogRepository
    {
        Task CreateBlog(CreateBlogDto dto);

        Task<IEnumerable<Blog>> GetAllBlogs();

        Task<IEnumerable<Blog>> GetBlogsByUser(int userId);

        Task UpdateBlog(UpdateBlogDto dto);

        Task DeleteBlog(DeleteBlogDto dto);

        Task<string> GetUserName(
    int userId
);

        Task<string> GetCommunityName(
            int communityId
        );

        Task<Blog> GetBlogById(
    int blogId
);
    }
}