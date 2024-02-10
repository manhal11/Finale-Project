using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedRatings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DinningHallRatings_Hotels_HotelId",
                table: "DinningHallRatings");

            migrationBuilder.DropForeignKey(
                name: "FK_DinningHallRatings_Users_UserId",
                table: "DinningHallRatings");

            migrationBuilder.DropForeignKey(
                name: "FK_RestaurantRatings_Hotels_HotelId",
                table: "RestaurantRatings");

            migrationBuilder.DropForeignKey(
                name: "FK_RestaurantRatings_Users_UserId",
                table: "RestaurantRatings");

            migrationBuilder.DropIndex(
                name: "IX_RestaurantRatings_HotelId",
                table: "RestaurantRatings");

            migrationBuilder.DropIndex(
                name: "IX_RestaurantRatings_UserId",
                table: "RestaurantRatings");

            migrationBuilder.DropIndex(
                name: "IX_DinningHallRatings_HotelId",
                table: "DinningHallRatings");

            migrationBuilder.DropIndex(
                name: "IX_DinningHallRatings_UserId",
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
                name: "IX_RestaurantRatings_UserId",
                table: "RestaurantRatings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DinningHallRatings_HotelId",
                table: "DinningHallRatings",
                column: "HotelId");

            migrationBuilder.CreateIndex(
                name: "IX_DinningHallRatings_UserId",
                table: "DinningHallRatings",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_DinningHallRatings_Hotels_HotelId",
                table: "DinningHallRatings",
                column: "HotelId",
                principalTable: "Hotels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DinningHallRatings_Users_UserId",
                table: "DinningHallRatings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RestaurantRatings_Hotels_HotelId",
                table: "RestaurantRatings",
                column: "HotelId",
                principalTable: "Hotels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RestaurantRatings_Users_UserId",
                table: "RestaurantRatings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
