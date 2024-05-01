using CapaDatos;
using CapaPresentacion;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;




namespace posMate
{
    internal static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            try
            {
                string apiURL_json = ApiConfigManager.ApiUrl; // instancia la clase estatica que extrae la url de la api dentro del json

                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);
                Application.Run(new login());
            }
            catch (Exception ex)
            {
                // Handle the unexpected error
                MessageBox.Show($"Error: Ocurrio un error al ejecutar el programa., {ex.Message}", "Error al iniciar PosMATE", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }


        }
    }
}
