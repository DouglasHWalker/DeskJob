using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using DeskJob_Dashboard.Models;
using System.IO;
using System.ComponentModel;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace DeskJob_Dashboard.Controllers
{
    public class FlashCardController : Controller
    {
        // GET: FlashCardController
        public async Task<IActionResult> Index()
        {
            List<FlashCard> flashcards = new List<FlashCard>();
            try
            {
                using var reader = new StreamReader("wwwroot\\flashcards.json");
                flashcards = JsonConvert.DeserializeObject<List<FlashCard>>(reader.ReadToEnd());

                //int id = 0;
                //foreach (FlashCard flashcard in flashcards)
                //{
                //    flashcard.ID = id;
                //    id++;
                //}

                //var flashcard = new FlashCard()
                //{
                //    ID = id,
                //    Certificate = values[0],
                //    Section = values[1],
                //    Module = values[2],
                //    Topic = values[3],
                //    Prompt = values[4],
                //    Answer = values[5],
                //    PromptType = values[6],
                //};

                Shuffle(flashcards);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return View(flashcards);
            }

            return View(flashcards);
        }

        // GET: FlashCardController
        public async Task<IActionResult> Flashboard()
        {
            List<FlashCard> flashcards = new List<FlashCard>();
            try
            {
                using var reader = new StreamReader("wwwroot\\flashcards.json");
                flashcards = JsonConvert.DeserializeObject<List<FlashCard>>(reader.ReadToEnd());

                //int id = 0;
                //foreach (FlashCard flashcard in flashcards)
                //{
                //    flashcard.ID = id;
                //    id++;
                //}

                //var flashcard = new FlashCard()
                //{
                //    ID = id,
                //    Certificate = values[0],
                //    Section = values[1],
                //    Module = values[2],
                //    Topic = values[3],
                //    Prompt = values[4],
                //    Answer = values[5],
                //    PromptType = values[6],
                //};
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return View(flashcards);
            }

            return View(flashcards); // .Take(5).ToList()
        }

        //Utility Functions

        public void Shuffle(List<FlashCard> list)
        {
            Random rng = new Random();
            int n = list.Count;
            while (n > 1)
            {
                n--;
                int k = rng.Next(n + 1);
                FlashCard value = list[k];
                list[k] = list[n];
                list[n] = value;
            }
        }
    }
}
