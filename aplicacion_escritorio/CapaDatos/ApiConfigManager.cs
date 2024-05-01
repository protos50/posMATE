using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using Newtonsoft.Json;
using System.Windows.Forms;
using CapaEntidad;

namespace CapaDatos
{
    public class ApiConfigManager
    {
        private static readonly string apiConfigPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "api-config.json");
        private static readonly ApiConfig apiConfig;

        static ApiConfigManager()
        {
            try
            {
                string json = File.ReadAllText(apiConfigPath);
                apiConfig = JsonConvert.DeserializeObject<ApiConfig>(json);
            }
            catch (FileNotFoundException ex)
            {
                // Handle the FileNotFoundException specifically
                MessageBox.Show($"Error: API configuration file not found. Expected path: {apiConfigPath}. {ex.Message}", "API Configuration Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            catch (JsonSerializationException ex)
            {
                // Handle the JsonSerializationException specifically
                MessageBox.Show($"Error: Invalid API configuration file format. Path: {apiConfigPath}. {ex.Message}", "API Configuration Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            catch (Exception ex)
            {
                // Handle any other unexpected exceptions
                MessageBox.Show($"Error: Unexpected error occurred while fetching API URL. Path: {apiConfigPath}. {ex.Message}", "API Configuration Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public static string ApiUrl => apiConfig.apiUrl;
    }
}