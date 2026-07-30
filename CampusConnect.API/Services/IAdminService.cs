using CampusConnect.API.Models;

namespace CampusConnect.API.Services
{
    public interface IAdminService
    {

        Task<IEnumerable<Blog>> GetPendingBlogs();

        Task ApproveBlog(int blogId);

        Task RejectBlog(int blogId);

        Task<IEnumerable<Video>> GetPendingVideos();

        Task ApproveVideo(int videoId);

        Task RejectVideo(int videoId);

        Task<IEnumerable<User>> GetPendingStudents();

        Task ApproveStudent(int userId);

        Task RejectStudent(int userId);

        Task<IEnumerable<Blog>> GetAllBlogs();
        Task DeleteAnyBlog(int blogId);

        Task<IEnumerable<Video>> GetAllVideos();
        Task DeleteAnyVideo(int videoId);

        Task DeleteAnyComment(int commentId);

        Task<IEnumerable<Community>>
GetPendingCommunities();

        Task ApproveCommunity(
            int communityId
        );

        Task RejectCommunity(
            int communityId
        );
    }
}