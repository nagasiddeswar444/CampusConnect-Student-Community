using CampusConnect.API.Models;

namespace CampusConnect.API.Repositories
{
    public interface IAdminRepository
    {
        Task<IEnumerable<User>> GetPendingStudents();

        Task ApproveStudent(int userId);

        Task RejectStudent(int userId);

        Task<IEnumerable<Blog>> GetPendingBlogs();

        Task ApproveBlog(int blogId);

        Task RejectBlog(int blogId);

        Task<IEnumerable<Video>> GetPendingVideos();

        Task ApproveVideo(int videoId);

        Task RejectVideo(int videoId);

        Task<IEnumerable<Community>>
GetPendingCommunities();

        Task ApproveCommunity(
            int communityId
        );

        Task RejectCommunity(
            int communityId
        );



        Task<IEnumerable<Blog>> GetAllBlogs();
        Task DeleteAnyBlog(int blogId);

        Task<IEnumerable<Video>> GetAllVideos();
        Task DeleteAnyVideo(int videoId);

        Task DeleteAnyComment(int commentId);
    }
}