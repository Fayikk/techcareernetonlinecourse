using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TechcareerWebApi.DTOs;

namespace TechcareerWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        public AuthController(IConfiguration configuration, UserManager<User> userManager)
        {
            _configuration = configuration;
            _userManager = userManager;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterDTO registerDTO)
        {
            var existingUser = await _userManager.FindByEmailAsync(registerDTO.Email);
            if(existingUser is not null)
            {
                return BadRequest("User already exist");
            }

            var user = new User
            {
                FullName = registerDTO.FullName,
                Email = registerDTO.Email,
                UserName = registerDTO.UserName,
            };

            var result = await _userManager.CreateAsync(user,registerDTO.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await _userManager.AddToRoleAsync(user,"Student");

            return Ok("Registered Succesfully");

        }



        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByEmailAsync(loginDTO.Email);
            if(user is null) return Unauthorized("Invalid Credentials");
            var passwordValid = await _userManager.CheckPasswordAsync(user,loginDTO.Password);
            if(!passwordValid) return Unauthorized("Invalid Credentials");
            var roles = await _userManager.GetRolesAsync(user);
            string token = GenerateToken(roles,user);
            return Ok(token);
        }




        private string GenerateToken(IList<string> roles,User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.Email,user.Email),
                new Claim("FullName",user.FullName),
            };

            foreach(var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role,role));
            }

            var jwtSettings = _configuration.GetSection("Jwt");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));

            var creds = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer:jwtSettings["Issuer"],
                audience:jwtSettings["Audience"],
                claims:claims,
                expires:DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["ExpireMinutes"])),
                signingCredentials:creds
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token).ToString();
            return tokenString;
        }
    }
}