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
        private readonly MyDatabaseContext _context;

        public FlashCardController(MyDatabaseContext context)
        {
            _context = context;
        }
        // GET: FlashCardController
        public async Task<IActionResult> Index()
        {
            var flashcards = new List<FlashCard>();

            // This allows the home page to load if migrations have not been run yet.
            try
            {
                flashcards = await _context.FlashCard.ToListAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return View(flashcards);
            }

            return View(flashcards);
        }

        // GET: FlashCardController/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var flashcard = await _context.FlashCard.FirstOrDefaultAsync(m => m.ID == id);
            if (flashcard == null)
            {
                return NotFound();
            }

            return View(flashcard);
        }

        // GET: FlashCardController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: FlashCardController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Certificate,Category,Subcategory,Front,Back,ImageUrl")] FlashCard flashcard)
        {
            if (ModelState.IsValid)
            {
                _context.Add(flashcard);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(flashcard);
        }

        // GET: FlashCardController/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var flashcard = await _context.FlashCard.FindAsync(id);
            if (flashcard == null)
            {
                return NotFound();
            }
            return View(flashcard);
        }

        // POST: FlashCardController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Certificate,Category,Subcategory,Front,Back,ImageUrl")] FlashCard flashcard)
        {
            if (id != flashcard.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(flashcard);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FlashcardExists(flashcard.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(flashcard);
        }

        // GET: FlashCardController/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var flashcard = await _context.FlashCard.FirstOrDefaultAsync(m => m.ID == id);
            if (flashcard == null)
            {
                return NotFound();
            }

            return View(flashcard);
        }

        // POST: FlashCardController/Delete/
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var flashcard = await _context.FlashCard.FindAsync(id);
            _context.FlashCard.Remove(flashcard);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        private bool FlashcardExists(int id)
        {
            return _context.FlashCard.Any(e => e.ID == id);
        }
    }
}
