using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using DeskJob_Dashboard.Models;

namespace DeskJob_Dashboard.Controllers
{
    public class FlashCardController : Controller
    {
        // GET: FlashCardController
        public async Task<IActionResult> Index()
        {
            var flashcards = new List<FlashCard>();

            // This allows the home page to load if migrations have not been run yet.
            try
            {
                // TODO: get relevant flashcards from file
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return View(flashcards);
            }

            return View(flashcards);
        }
    }
}
