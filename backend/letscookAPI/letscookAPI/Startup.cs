using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureADB2C.UI;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace letscookAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddAuthentication(AzureADB2CDefaults.BearerAuthenticationScheme)
            //    .AddAzureADB2CBearer(options => Configuration.Bind("AzureAdB2C", options));

            services.AddAuthentication()
                .AddGoogle(options =>
                {
                    //IConfigurationSection googleAuthNSection = Configuration.GetSection("Authentication:Google");
                    //options.ClientId = googleAuthNSection["167713597106-dbb99ldnfn7jq4mbe27c706pftdkqdip.apps.googleusercontent.com"];
                    //options.ClientSecret = googleAuthNSection["O31Db2BLsJRbuDL1Bj5AlzXK"];

                    options.ClientId = Configuration.GetSection("Google").GetSection("ClientId").Value;
                    options.ClientSecret = Configuration.GetSection("Google").GetSection("ClientSecret").Value;
                })
                .AddFacebook(options =>
                {
                    options.AppId = Configuration.GetSection("Facebook").GetSection("AppId").Value;
                    options.AppSecret = Configuration.GetSection("Facebook").GetSection("AppSecret").Value;
                });
            //.AddTwitter(options =>
            //{
            //    options.ConsumerKey = Configuration.GetSection("Twitter").GetSection("ConsumerKey").Value;
            //    options.ConsumerSecret = Configuration.GetSection("Twitter").GetSection("ConsumerSecret").Value;
            //});

            // https://docs.microsoft.com/fr-fr/aspnet/core/security/cors?view=aspnetcore-3.1
            // documentation used to configure CORS options
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyOrigin().AllowAnyHeader();
                        //builder.AllowAnyMethod();
                        //builder.AllowAnyOrigin();
                    });
            });
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
