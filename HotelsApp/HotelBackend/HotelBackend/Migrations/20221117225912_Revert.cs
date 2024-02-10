using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class Revert : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DinningHallRatings_Hotels_HotelId",
                table: "DinningHallRatings");

            migrationBuilder.DropForeignKey(
                name: "FK_RestaurantRatings_Hotels_HotelId",
                table: "RestaurantRatings");

            migrationBuilder.DropIndex(
                name: "IX_RestaurantRatings_HotelId",
                table: "RestaurantRatings");

            migrationBuilder.DropIndex(
                name: "IX_DinningHallRatings_HotelId",
                table: "DinningHallRatings");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_RestaurantRatings_HotelId",
                table: "RestaurantRatings",
                column: "HotelId");

            migrationBuilder.CreateIndex(
                name: "IX_DinningHallRatings_HotelId",
                table: "DinningHallRatings",
                column: "HotelId");

            migrationBuilder.AddForeignKey(
                name: "FK_DinningHallRatings_Hotels_HotelId",
                table: "DinningHallRatings",
                column: "HotelId",
                principalTable: "Hotels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RestaurantRatings_Hotels_HotelId",
                table: "RestaurantRatings",
                column: "HotelId",
                principalTable: "Hotels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
