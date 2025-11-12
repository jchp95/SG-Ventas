namespace ventas.ViewModels.Response;

public class ApiErrorResponse
{
    public bool Success { get; set; } = false;
    public string Message { get; set; } = "";
    public object? Details { get; set; }
}