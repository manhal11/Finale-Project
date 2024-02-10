namespace HotelBackend.Models
{
    public class ErrorMessageResponse
    {
        public string Message { get; set; }
        public ErrorMessageResponse(string message) { 
            this.Message = message;
        }
    }
}
