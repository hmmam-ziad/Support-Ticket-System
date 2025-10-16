using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Support_Ticket_Back_end.DTOModels;
using Support_Ticket_Back_end.Models;
using Support_Ticket_Back_end.Services;

namespace Support_Ticket_Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<UserApp> _userManager;
        private readonly IConfiguration _config;
        public AccountController(UserManager<UserApp> userManager, IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Register(dtoRegister register)
        {
            if (ModelState.IsValid)
            {
                if (await _userManager.FindByNameAsync(register.UserName) != null || await _userManager.FindByEmailAsync(register.Email) != null)
                {
                    return BadRequest("Email or Username already exists");
                }
                UserApp user = new UserApp
                {
                    UserName = register.UserName,
                    Email = register.Email
                };
                IdentityResult result = await _userManager.CreateAsync(user, register.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, "User");
                    var jwtService = new JwtService(_config, _userManager);
                    var tokenResult = await jwtService.GenerateJwtTokenAsync(user);
                    return Ok(tokenResult);
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                    return BadRequest(ModelState);
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login(dtoLogin login)
        {
            if (ModelState.IsValid)
            {
                UserApp? user = await _userManager.FindByNameAsync(login.username);
                if (user != null)
                {
                    if (await _userManager.CheckPasswordAsync(user, login.password))
                    {
                        var jwtService = new JwtService(_config, _userManager);
                        var tokenResult = await jwtService.GenerateJwtTokenAsync(user);
                        return Ok(tokenResult);
                    }
                    else
                    {
                        ModelState.AddModelError("", "Invalid login attempt.");
                        return Unauthorized(ModelState);
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Invalid login attempt.");
                    return Unauthorized(ModelState);
                }
            }
            return BadRequest(ModelState);
        }
    }
}
