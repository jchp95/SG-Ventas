namespace Models.ModelsBdTenant
{
    public class TbProductoUbicacion
    {
        public int FidProdUbicacion { get; set; }

        // Relaciones
        public int FkidProducto { get; set; }
        public int FkidUbicacion { get; set; }
       
    }
}
