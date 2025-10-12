using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Support_Ticket_Back_end.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Support_Ticket_Back_end.Services
{
    public class JwtService
    {
        private readonly IConfiguration _config;
        private readonly UserManager<UserApp> _userManager;

        public JwtService(IConfiguration config, UserManager<UserApp> userManager)
        {
            _config = config;
            _userManager = userManager;
        }

        public async Task<object> GenerateJwtTokenAsync(UserApp user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config["JWT:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["JWT:Issuer"],
                audience: _config["JWT:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
            );

            return new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
            };
        }
    }
}
