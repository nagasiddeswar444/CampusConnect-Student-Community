using MailKit.Net.Smtp;
using MimeKit;

namespace CampusConnect.API.Services
{
    public class EmailService
    {
        public async Task SendEmail(
            string toEmail,
            string subject,
            string body
        )
        {
            var email = new MimeMessage();

            email.From.Add(
                MailboxAddress.Parse(
                    "studentprojectdemo33@gmail.com"
                )
            );

            email.To.Add(
                MailboxAddress.Parse(
                    toEmail
                )
            );

            email.Subject = subject;

            email.Body =
                new TextPart("html")
                {
                    Text = body
                };

            using var smtp =
                new SmtpClient();

            await smtp.ConnectAsync(
                "smtp.gmail.com",
                587,
                MailKit.Security.SecureSocketOptions.StartTls
            );

            await smtp.AuthenticateAsync(
                "studentprojectdemo33@gmail.com",
                "mdwyzbfoottlswig"
            );

            await smtp.SendAsync(email);

            await smtp.DisconnectAsync(true);
        }
    }
}