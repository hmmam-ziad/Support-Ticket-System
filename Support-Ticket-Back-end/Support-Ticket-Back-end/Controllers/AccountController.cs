using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Support_Ticket_Back_end.DTOModels;
using Support_Ticket_Back_end.Models;

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
                UserApp user = new UserApp
                {
                    UserName = register.UserName,
                    Email = register.Email
                };
                IdentityResult result = await _userManager.CreateAsync(user, register.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, "Admin");
                    return Ok();
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
    }
}
