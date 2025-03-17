using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace saheart_server.Utils;

public static class OpenRouterRequest
{
    public static async Task<string> MakeRequest(string message)
    {
        string apiKey = Environment.GetEnvironmentVariable("OPENROUTER_API_KEY") ?? 
                        throw new ArgumentNullException("OPENROUTER_API_KEY");
        string yourSiteName = "saheart";

        using (HttpClient client = new HttpClient())
        {
            // Prepare Headers
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            if (!string.IsNullOrEmpty(yourSiteName))
            {
                client.DefaultRequestHeaders.Add("X-Title", yourSiteName);
            }

            // Prepare Request Body (JSON)
            var requestData = new
            {
                model = "google/gemma-3-4b-it:free", 
                messages = new[]
                {
                    new
                    {
                        role = "user",
                        content = message
                    }
                }
            };

            string jsonData = JsonSerializer.Serialize(requestData);
            var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

            // Make the POST request
            try
            {
                HttpResponseMessage response = await client.PostAsync("https://openrouter.ai/api/v1/chat/completions", content);

                if (response.IsSuccessStatusCode)
                {
                    var mr = await response.Content.ReadFromJsonAsync<OpenRouterResponse>() 
                             ?? throw new ArgumentException("Unable to parse response from OpenRouter");

                    Console.WriteLine("Request successful!");
                    Console.WriteLine("Response Content:");
                    Console.WriteLine($"[{mr.choices[0].message.content}]");
                    
                    return mr.choices[0].message.content;
                    
                    //string responseContent = await response.Content.ReadAsStringAsync();
                    //Console.WriteLine($"full resp: [[{responseContent}]]");
                }
                else
                {
                    Console.WriteLine($"Request failed with status code: {response.StatusCode}");
                    string errorContent = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Error Content: {errorContent}");
                    return string.Empty;
                }
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine($"Request exception: {e.Message}");
                return string.Empty;
            }
        }
    }
}