namespace DeskJob_Dashboard.Models
{
    public class FlashCard
    {
        public int ID { get; set; }
        public string Certificate { get; set; }
        public string Section { get; set; }
        public string Module { get; set; }
        public string Topic { get; set; }
        public string Prompt { get; set; }
        public string Answer { get; set; }
        public string PromptType { get; set; }
    }
}
