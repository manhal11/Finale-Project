Running Instructions:
---------------------

Setting up the backend:
	Setting up the database:
		- If you want to use MSSQL with the backend, make sure you have it installed on your machine.
	
		(Follow:
			https://www.microsoft.com/en-us/sql-server/sql-server-downloads
		)
			
		- Alternatively, if you want to use another database (postgres for example) you can do it do by changing the settings in:
		./HotelBackend/HotelBackend/appsettings.json
		
		- Change the connection string in the appsettings.json with the correct credentials to be able to connect to the database.
	
	Migrate to the database:
		- Open the backend project in visual studio and open the PackageManagerConsole
		- Type: 
			> add-migration Init
			> update-database
	
	VERY IMPORTANT: check out the following files and change permissions if needed (CORS and AllowedOrigins for example),
		the app is not secure currently. 
		- ./HotelBackend/HotelBackend/appsettings.json
		- ./HotelBackend/HotelBackend/Program.cs
	
	Register a user normally (either from the REST api or from the website itself). 
	Set admin user: Change user role manually in your sql db editor (SSMS, pgAdmin etc.)
	Alternativly: manually connect to the database and run:
		UPDATE Users
		SET Role = 'Administrator'
		WHERE Id = <user_id>;
		
Running the backend:
	- Make sure the database in set up and running. 
	- Run the backend from visual studio normally, this will open a chrome tab on https://localhost:7273/.
	This is the default ui for the REST api backend (swagger). 
	- You can normally access port 7273 with the desired requests to interact with the system. 

Setting up the frontend:
	- Make sure you have node js installed on your machine. 
	(Follow https://nodejs.org/)
	- Navigate to ./HotelFrontend/hotelfrontend/ and run:
		> npm install
	- Note: if you want to customize the backend url and other settings, you can change them in: 
		./HotelFrontend/hotelfrontend/src/api/apiClient.ts

Running the frontend
	- Make sure the backend is set up and running. 
	- Navigate to ./HotelFrontend/hotelfrontend/ and run:
		> npm start