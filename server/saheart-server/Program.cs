using Microsoft.AspNetCore.Html;
using System.Text.Json.Serialization;
using dotenv.net;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using saheart_server.Utils;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace saheart_server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            DotEnv.Load(new DotEnvOptions(envFilePaths:["env/.env"]));
            
            var builder = WebApplication.CreateBuilder(args);

            // Add CORS services
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            app.UseStaticFiles();

            app.UseCors();

            app.MapGet("/", async (HttpContext context) =>
            {
                context.Response.ContentType = "text/html";
                await context.Response.SendFileAsync("wwwroot/index.html");
            });

            foreach (string lang in HoroscopeGenerator.allLanguages)
            {
                foreach (string sign in HoroscopeGenerator.zodiacSigns)
                {
                    app.MapGet($"/{lang}/{sign}", async (HttpContext context) =>
                    {
                        var date = context.Request.Query["date"];
                        DateTime reqestDate;
                        try
                        {
                            reqestDate = DateTime.Parse(date);
                        }
                        catch (Exception ex)
                        {
                            return Results.BadRequest("Date parameter (in ISO string, like YYYY-MM-DD) is incorrect!");
                        }

                        context.Response.ContentType = "application/json";
                        HoroscopeResponse response = HoroscopeGenerator.Instance.Generate($"{sign}", reqestDate, lang);

                        return Results.Ok(response);
                    });
                }
            }

            app.MapPost("/ai_pred", async (HttpContext context) =>
            {
                var date = context.Request.Query["date"];
                DateTime requestDate;
                try
                {
                    requestDate = DateTime.Parse(date);
                }
                catch (Exception ex)
                {
                    return Results.BadRequest("Date parameter (in ISO string, like YYYY-MM-DD) is incorrect!");
                }
                AiPredictionRequest? request;
                try
                {
                    string jsonRaw;
                    using (StreamReader sr = new StreamReader(context.Request.Body))
                    {
                        jsonRaw = await sr.ReadToEndAsync();
                    }
                    Console.WriteLine($"json raw: [{jsonRaw}]");
                    request = JsonConvert.DeserializeObject<AiPredictionRequest>(jsonRaw);
                    if (request == null)
                    {
                        return Results.BadRequest("Request body is empty!");
                    }

                    Console.WriteLine($"request sign: [{request.Sign}]; request.lang: [{request.Language}]");
                    // using (StreamReader reader = new StreamReader(context.Request.Body))
                    // {
                    //     string json = await reader.ReadToEndAsync();
                    //     Console.WriteLine($"json string: [{json}]");
                    //
                    //     request = Newtonsoft.Json.JsonConvert.DeserializeObject<AiPredictionRequest>(json);
                    //
                    //     Console.WriteLine($"request sign: {request.Sign}; request.lang: {request.Language}");
                    // }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return Results.BadRequest($"Incorrect horoscope request! [{e.Message}]");
                }

                context.Response.ContentType = "application/json";
                //return Results.Ok(await AiPrediction(requestDate, request));
                return await AiPrediction(requestDate, request);
            });
            
            app.Run();
        }
        
        private static async Task<IResult> AiPrediction(DateTime requestDate, AiPredictionRequest request)
        {
            
            var resp = HoroscopeGenerator.Instance
                .GenerateAiPrediction(request.Sign, requestDate, request.Language);

            Console.WriteLine(resp);
            
            return Results.Ok(resp);
        }
    }
}
