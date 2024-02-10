using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddedRatings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DinningHallRatings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HotelId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    DateAdded = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Cleanliness = table.Column<int>(type: "int", nullable: true),
                    TastyFood = table.Column<int>(type: "int", nullable: true),
                    RawMaterialQuality = table.Column<int>(type: "int", nullable: true),
                    CrowdnessRating = table.Column<int>(type: "int", nullable: true),
                    View = table.Column<int>(type: "int", nullable: true),
                    SelectionStatus = table.Column<int>(type: "int", nullable: true),
                    Freshness = table.Column<int>(type: "int", nullable: true),
                    NumberOfTables = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DinningHallRatings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DinningHallRatings_Hotels_HotelId",
                        column: x => x.HotelId,
                        principalTable: "Hotels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DinningHallRatings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RestaurantRatings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HotelId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    DateAdded = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Cleanliness = table.Column<int>(type: "int", nullable: true),
                    TastyFood = table.Column<int>(type: "int", nullable: true),
                    RawMaterialQuality = table.Column<int>(type: "int", nullable: true),
                    CrowdnessRating = table.Column<int>(type: "int", nullable: true),
                    View = table.Column<int>(type: "int", nullable: true),
                    SelectionStatus = table.Column<int>(type: "int", nullable: true),
                    Freshness = table.Column<int>(type: "int", nullable: true),
                    NumberOfTables = table.Column<int>(type: "int", nullable: true),
                    PriceRating = table.Column<int>(type: "int", nullable: true),
                    BarRating = table.Column<int>(type: "int", nullable: true),
                    MealCountSatisfaction = table.Column<int>(type: "int", nullable: true),
                    RichMenu = table.Column<int>(type: "int", nullable: true),
                    WaitingTimeRating = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RestaurantRatings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RestaurantRatings_Hotels_HotelId",
                        column: x => x.HotelId,
                        principalTable: "Hotels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RestaurantRatings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DinningHallRatings_HotelId",
                table: "DinningHallRatings",
                column: "HotelId");

            migrationBuilder.CreateIndex(
                name: "IX_DinningHallRatings_UserId",
                table: "DinningHallRatings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RestaurantRatings_HotelId",
                table: "RestaurantRatings",
                column: "HotelId");

            migrationBuilder.CreateIndex(
                name: "IX_RestaurantRatings_UserId",
                table: "RestaurantRatings",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DinningHallRatings");

            migrationBuilder.DropTable(
                name: "RestaurantRatings");
        }
    }
}
